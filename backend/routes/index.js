var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "hello World",
  });
});

router.post("/browser-metrics", function (req, res, next) {
  console.log("receiving data ...");
  console.log("body is ", req.body);
  res.send(req.body);
});

module.exports = router;
