const uploadImage = require("../middlewares/uploadImage");
const Course = require("../models/Course");

module.exports = {
  async createCourse(req, res) {
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
  },

  async getCourses(req, res) {
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
  },

  async deleteCourse(req, res) {
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
  },

  async editCourse(req, res) {
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
  },

  async uploadImage(req, res) {
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
  },
};
