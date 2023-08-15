import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// criando usuario
export default {
  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        return res.json({ error: "Usuario com esse Email já existe" });
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },
  //Monstrando todos os usuarios do sistema .
  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.json({ error });
    }
  },
  // Procurando por apenas um USUARIO .
  async findUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) return res.json({ error: "Não existe esse usuario." });
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },
  // Atualizando as informaçoes de um usuario.
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      let user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user)
        return res.json({
          error: "Não é possivel encontrar esse usuario para deletar",
        });
      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },

  //Deletando um usuario
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) return res.json({ error: "Não existe esse usuario." });

      await prisma.user.delete({ where: { id: Number(id) } });
      return res.json({message:"Usuario foi deletado com sucesso!"});
    } catch (error) {
      return res.json({ error });
    }
  },
};
