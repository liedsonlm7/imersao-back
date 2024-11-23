import fs from "fs";
import {getAllPosts, postCreatead, updatePost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiServices.js"

export async function showPosts (req, res) {
    // Chama a função `getAllPosts()` para obter todos os posts e armazena o resultado na variável `posts`.
    const posts = await getAllPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os dados dos posts no formato JSON.
    res.status(200).json(posts);
}

export async function postNewPost(req, res) {
    const newPost = req.body;
    try {
        const postCreated = await postCreatead(newPost);
        res.status(200).json(postCreated);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}


export async function uploadImagem(req, res) {
   const newPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
   };

   try {
    const postCreated = await postCreatead(newPost);
    const updatedFile = `uploads/${postCreatead.InsertedId}.png`
    fs.renameSync(req.file.path, updatedFile)
    res.status(200).json(postCreated);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer)

        const post = {
            descricao: descricao,
            imgUrl: urlImagem,
            alt: req.body.alt
        }

        const postCreated = await updatePost(id, post);
        res.status(200).json(postCreated);
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}
