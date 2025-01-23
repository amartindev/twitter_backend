import express from "express";
import axios from "axios";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // URL local
      "https://tudominio.netlify.app" // URL desplegada en Netlify
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Middleware para manejar solicitudes OPTIONS
app.options("*", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true"
  });
  res.status(200).end(); // IMPORTANTE: Asegúrate de devolver un estado 200
});

// Middleware para parsear JSON
app.use(express.json());

app.post("/api/tweets", async (req, res) => {
  const { username } = req.body;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await axios.get(
      "https://api.twitter.com/2/tweets/search/recent",
      {
        params: { query: `from:${username}` },
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default serverless(app);
