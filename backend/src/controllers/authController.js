import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existente = await prisma.user.findUnique({ where: { email } });
    if (existente) return res.status(400).json({ error: "Email já cadastrado" });

    const senhaHashed = await bcrypt.hash(senha, 10);

    const usuario = await prisma.user.create({
      data: { nome, email, senha: senhaHashed },
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso", usuario });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", detalhes: err.message });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) return res.status(400).json({ error: "Email ou senha incorretos" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(400).json({ error: "Email ou senha incorretos" });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login realizado com sucesso", token });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", detalhes: err.message });
  }
};
