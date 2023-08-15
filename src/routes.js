import { Router } from "express";
import userController from "./controller/userController";
import postController from "./controller/postController";


const router = Router();

router.post("/user",userController.createUser); // criando um usuario
router.get("/users",userController.findAllUsers); // mostrando todos os usuarios
router.get("/user/:id",userController.findUser); // procurando por um usuario
router.put("/user/:id",userController.updateUser) // aualizando usuario 
router.delete("/user/:id",userController.deleteUser) // deletando usuario
// rota do POST
router.post("/post/user/:id",postController.createPost); //criando um post para blog
router.get("/posts",postController.FindAllPosts) // list ando todos os posts
router.put("/post/:id",postController.updatePost) // atualizando os posts


export { router }; 
