// relacionamento de 1 para muitos
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createPost(req, res) {
    const { content } = req.body;
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.json({ message: "Usuario inexistente" });
      }

      const post = await prisma.post.create({
        data: {
          content,
          userId: user.id,
        },
        include: {
          author: true
        }
      });
      return res.json(post);
    } catch (error) {
        return res.json({message:error.message})
    }
  },


  async FindAllPosts(req, res){
    try{
        const post = await prisma.post.findMany({
           // select:{
               //  content: false,
                
           // }
        })
        return res.json(post)
    }catch(error){
        return res.json({message:"Deu algum error"})
    }
  },
  async updatePost(req,res){
    const {id} = req.params
    const  {content} = req.body
    try{
      const post = await prisma.post.findUnique({where: {id:Number(id)}})
      if(!post){
         return ({message:"Não existe esse usuario para atualizar!"})
      }
      await prisma.post.update({
        where:{id: Number(id)},
        data:{
          content
        }
      })
      return res.json({message:"Post atualizado!."})
    }catch(error){
      return res.json({error})

    }
  }
};
