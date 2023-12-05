const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "c751f6a3c3e4912caa6c2fb4d3c223723d9e8374";

module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    try {
      const emailAlreadyExists = await User.findOne({ where: { email } });
      if (emailAlreadyExists) {
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Email já cadastrado!",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return res.json({
        erro: false,
        mensagem: "Usuário cadastrado",
      });
    } catch {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuario não cadastrado.",
      });
    }
  },
  async getAllUsers(req, res) {
    try {
      const attributes = ["id", "email"];
      const users = await User.findAll({ attributes });
      return res.json({
        erro: false,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        mensagem: "Erro ao buscar usuários",
      });
    }
  },

  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      const userDelete = await User.findByPk(userId);
      if (!userDelete) {
        return res.status(404).json({
          mensagem: "Id_user não encontrado!",
        });
      }
      await userDelete.destroy();
      return res.json({
        mensagem: "Usuário excluído com sucesso!",
      });
    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao excluir usuário!",
      });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const userLogin = await User.findOne({ where: { email } });
      if (!userLogin) {
        return res.status(401).json({
          erro: true,
          mensagem: "Credenciais inválidas",
        });
      }

      const passwordCorrect = await bcrypt.compare(password, userLogin.password);
      if (passwordCorrect) {
        const token = jwt.sign({ id: userLogin.id, name: userLogin.name, email }, secretKey, { expiresIn: 2500 });
        return res.json({
          erro: false,
          mensagem: "Login efetuado.",
          token,
        });
      }
      return res.status(401).json({
        erro: true,
        mensagem: "Credenciais inválidas",
      });
    } catch (erro) {
      return res.status(404).json({
        erro: true,
        mensagem: "error",
      });
    }
  },
};
