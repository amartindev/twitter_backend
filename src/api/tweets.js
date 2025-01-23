import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middleware de CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173", // Localhost
    "https://tudominio.netlify.app", // Frontend en producción
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin || "")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Si es una solicitud preflight, responde inmediatamente
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

// Middleware para manejar JSON
app.use(express.json());

// Ruta para obtener tweets
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
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

export default app; // Exportar como aplicación de Express
