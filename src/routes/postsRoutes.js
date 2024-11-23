import express from "express";
import multer from "multer";
import { showPosts, postNewPost, uploadImagem, updateNewPost } from "../controller/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento das imagens em disco
const storage = multer.diskStorage({
  // Define o diretório de destino para as imagens
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Indica que as imagens serão salvas na pasta 'uploads'
  },
  // Define o nome do arquivo
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  }
});

// Cria um objeto de upload utilizando a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware para tratar requisições JSON
  app.use(express.json());

  app.use(cors(corsOptions))

  // Rota para buscar todos os posts
  app.get("/posts", showPosts);

  // Rota para criar um novo post
  app.post("/posts", postNewPost);

  // Rota para fazer upload de uma imagem
  // - upload.single('imagem'): Configura o upload de um único arquivo com o nome 'imagem' no formulário
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", updateNewPost);
};

export default routes;