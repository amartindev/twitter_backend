import express from "express";
import axios from "axios";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para obtener tweets
app.post("/api/tweets", async (req, res) => {
  const { username } = req.body;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN; // Leer del archivo .env

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await axios.get(
      "https://api.twitter.com/2/tweets/search/recent",
      {
        params: { query: `from:${username}` },
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


export default serverless(app);
