const express = require("express");
const app = express();
const path = require("path");
const uploadImage = require("./src/middlewares/uploadImage");
const User = require("./src/models/User");
const Course = require("./src/models/Course");
const bcrypt = require("bcrypt");
const db = require("./src/models/db");
const jwt = require("jsonwebtoken");
const secretKey = "c751f6a3c3e4912caa6c2fb4d3c223723d9e8374";
const cors = require("cors");

//http://localhost:5000/uploads/users/1701712016176_Captura de tela 2023-12-03 174445.png
//http://localhost:5000/files/users/1701712016176_Captura de tela 2023-12-03 174445.png
//para ocultar o diretorio da imagem na url

app.use("/files", express.static(path.resolve(__dirname, "uploads")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");

  app.use(cors({ origin: "*" }));
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/list-image", async (req, res) => {
  try {
    const courses = await Course.findAll();
    const images = courses.map((course) => course.image);
    return res.json({
      erro: false,
      images,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Nenhuma imagem encontrada!",
    });
  }
});

app.post("/upload-image", uploadImage.single("image"), async (req, res) => {
  if (req.file) {
    try {
      return res.status(200).json({
        erro: false,
        mensagem: "Uploado realizado com sucesso!",
        nomeArquivo: req.file.filename,
      });
    } catch (erro) {
      console.error();
      return res.status(400).json({
        erro: true,
        mensagem: "Falha ao realizar o upload, necessário uma imagem jpg ou png!",
      });
    }
  }
  return res.status(400).json({
    erro: true,
    mensagem: "Falha ao realizar o upload!",
  });
});
app.get("/", async (req, res) => {
  res.send("Página inicial - MIND");
});
app.post("/course", async (req, res) => {
  try {
    const { name, teacher, category, description, active } = req.body;
    if (!name || !teacher || !category || !description || typeof active !== "boolean") {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Todos os campos são obrigatórios (name, teacher, category, description, active).",
      });
    }
    await Course.create(req.body);
    return res.status(200).json({
      erro: false,
      mensagem: "Curso cadastrado!",
    });
  } catch {
    return res.status(500).json({
      erro: true,
      mensagem: "Erro: Curso não cadastrado!",
    });
  }
});
app.get("/course", async (req, res) => {
  try {
    const attributes = { exclude: ["createdAt", "updatedAt"] };
    const courses = await Course.findAll({ attributes });
    return res.json({
      erro: false,
      courses,
    });
  } catch (erro) {
    return res.status(500).json({
      erro: true,
      mensagem: "Erro: Falha ao buscar cursos",
    });
  }
});
app.delete("/course/:id", async (req, res) => {
  const courseId = req.params.id;
  try {
    const courseDelete = await Course.findByPk(courseId);
    if (!courseDelete) {
      return res.status(404).json({
        mensagem: "Id_curso não encontrado!",
      });
    }
    await courseDelete.destroy();
    return res.status(200).json({
      mensagem: "Curso excluído com sucesso!",
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro: Falha ao excluir o curso!",
    });
  }
});
app.put("/course/:id", async (req, res) => {
  const upCourse = req.params.id;
  try {
    const updateById = await Course.update(req.body, { where: { id: upCourse } });
    return res.status(200).json({
      mensagem: "Update do curso realizado com sucesso!",
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro: Falha ao editar curso",
    });
  }
});
app.post("/users", async (req, res) => {
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
});
app.get("/users", async (req, res) => {
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
});
app.delete("/users/:id", async (req, res) => {
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
});
app.post("/login", async (req, res) => {
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
});

app.listen(5000, function () {
  console.log("Servidor inicado na porta 5000: http://localhost:5000");
});
