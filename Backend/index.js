var connectToMongo = require("./db");
var express = require("express");
var cors = require("cors");

var app = express();

connectToMongo();
const port = 5000;
// respond with "hello world" when a GET request is made to the homepage
// app.get("/", function (req, res) {
//   res.send("hello world");
// });
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
