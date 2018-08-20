const express = require('express');
const router = express.Router();

const db = require('../config/database');

//Método que busca todos os nós do tipo usuário
router.get('/', (req, res,next)=>{
    let query = `MATCH (node:User) RETURN node`
    db(query,res)
}); 

//método que retorna um usuário de acordo com o id
router.get('/:id' , (req,res,next) =>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User) 
                 WHERE id(node) = ${id} 
                 RETURN node`;
    db(query,res);
});

//Método para inserir um usuário
router.post('/', (req,res,next) =>{
    let nome = req.body.nome;
    let email = req.body.email;
    let foto = req.body.foto;
    let profissao = req.body.profissao;
    let local  = req.body.local;

    let query = `CREATE ( node:User {nome:"${nome}",email:"${email}", foto:"${foto}", profissao:"${profissao}", local:"${local}" })
                 RETURN node`;
    db(query, res);
});

// Altera um nó do tipo usuário
router.put('/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let nome = req.body.nome;
    let email = req.body.email;
    let foto = req.body.foto;
    let profissao = req.body.profissao;
    let local  = req.body.local;

    let query = `MATCH (node:User) WHERE id(node) = ${id} 
                 SET node.nome = "${nome}", node.email = "${email}", node.foto = "${foto}", node.profissao = "${profissao}", node.local="${local}" 
                 RETURN node`;
    
    db(query,res);

});

//Método que deleta um usuário 
router.delete('/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (n:User)
                WHERE id(n) = ${id}
                DELETE n`;
    db(query,res);
})


module.exports = router;
