const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Telegram
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get("/", (req, res) => {
  res.send("SIM900A Telegram Server OK");
});

app.post("/send", async (req, res) => {
  try {
    const message = req.body.message || "TEST SIM900A";

    const url =
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` +
      `?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
