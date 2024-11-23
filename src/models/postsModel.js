import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Cria uma conexão com o banco de dados, utilizando a string de conexão obtida da variável de ambiente `STRING_CONEXAO`. O resultado da conexão é armazenado na variável `conexao`.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getAllPosts() {
    // Seleciona o banco de dados chamado "imersao-instabytes" na conexão estabelecida.
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts" dentro do banco de dados.
    const colecao = db.collection("posts");
    // Executa uma consulta para encontrar todos os documentos da coleção "posts" e retorna os resultados como um array.
    return colecao.find().toArray();
}

export async function postCreatead(newPost) {
   
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(newPost)
}

export async function updatePost(id, newPost) {
   
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: newPost})
}