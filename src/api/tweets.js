import express from "express";
import axios from "axios";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

app.get("/api/tweets", async (req, res) => {
  return res.send({ message: "API is working" });
  })
// Endpoint para obtener tweets
app.post("/api/tweets", async (req, res) => {
  return res.send({ message: "API is working EN POST" });
  // const { username } = req.body;
    // const accessToken = process.env.TWITTER_ACCESS_TOKEN;

    // if (!username) {
    //     return res.status(400).json({ error: "Username is required" });
    // }

    // try {
    //     const response = await axios.get(
    //         "https://api.twitter.com/2/tweets/search/recent",
    //         {
    //             params: { query: `from:${username}` },
    //             headers: { Authorization: `Bearer ${accessToken}` },
    //         }
    //     );
    //     res.json(response.data);
    // } catch (error) {
    //     // Manejar específicamente el error 429
    //     if (error.response && error.response.status === 429) {
    //         // Si el error es 429, puedes devolver un mensaje más adecuado
    //         return res
    //             .status(429)
    //             .json({ error: "Too many requests. Please try again later." });
    //     }

    //     // En caso de otros errores, se maneja normalmente con el código 500
    //     console.error(error);
    //     res.status(500).json({ error: error.message });
    // }
});
// Configuración para entorno live (comenta esta sección si usas serverless)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

// Exportación para serverless (descomenta esta línea para usar con serverless)
export default serverless(app);
