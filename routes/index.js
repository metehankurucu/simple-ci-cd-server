const express = require("express");
const router = express.Router();

const testRepo = require("../repositories/test");

router.get("/", async (req, res, next) => {
  res.send("Deployment Server Running");
});

router.post("/deploy", async (req, res, next) => {
  try {
    const {
      repository: { name },
    } = req.body;
    //Deploy operations for test repo
    //for example check only name
    if (name === testRepo.name) {
      await testRepo.deploy();
    }
    res.json({ result: true, message: `${name} deployed` });
  } catch (error) {
    res.json({
      result: false,
      error: error.message,
    });
  }
});

module.exports = router;
