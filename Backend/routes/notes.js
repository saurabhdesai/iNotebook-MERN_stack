const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/getallnotes", fetchuser, async (req, res) => {
  const usernotes = await Notes.find({ user: req.user.id });
  res.json(usernotes);
});
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "title should be atleast 3 characters").isLength({ min: 3 }),
    body(
      "description",
      "description length should contains atleast 3 characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tags } = req.body;
      const note = new Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });
      const savednote = note.save();
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("somthing went wrong");
    }
  }
);
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tags } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tags) {
      newNote.tags = tags;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).send("Not Found");
    }
    if (req.user.id !== note.user.toString()) {
      res.status(400).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  }
);
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).send("Not Found");
    }
    if (req.user.id !== note.user.toString()) {
      res.status(400).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Deleted successfully" });
  }
);
module.exports = router;
