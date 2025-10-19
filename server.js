const express = require("express");
const app = express();

// store the last prediction result
let lastPrediction = "No Hand";
let lastConfidence = 0;

// serve files from the "public" folder
app.use(express.static("public"));
app.use(express.json());

// endpoint Scratch will read
app.get("/prediction", (req, res) => {
  res.type("text").send(lastPrediction);
});

// optional endpoint for confidence level
app.get("/confidence", (req, res) => {
  res.type("text").send(String(lastConfidence));
});

// endpoint to receive updates from browser
app.post("/update", (req, res) => {
  const { label, confidence } = req.body || {};
  if (typeof label === "string") lastPrediction = label;
  if (typeof confidence === "number") lastConfidence = confidence;
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bridge running on port " + PORT));
