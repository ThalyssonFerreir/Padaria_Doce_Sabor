import express from "express";
import dotenv from "dotenv";
import authRoutes from "src/routes/authRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));




app.use(cors({
  origin: "http://localhost:5173" // Substitua pela porta do seu frontend React
}));
