const express = require('express');
const router = express.Router();
const md5 = require('md5');
const db = require('../config/database');

//Método que busca todos os nós do tipo usuário
router.get('/all/:pag', (req, res,next)=>{
    let pag = parseInt(req.params.pag);
    let pagina = pag*5;
    let query = `MATCH (node:User) RETURN node  SKIP ${pagina} LIMIT 5`
    db(query,res)
}); 

//método que retorna um usuário de acordo com o id
router.get('/:token' , (req,res,next) =>{
    let token = req.params.token;
    
    let query = `MATCH (node:User) 
                  WHERE node.token = "${token}" 
                  RETURN node`;
    db(query,res);
});

//Método para retornar um usuário com e-mail passado como parâmetro ( checar se o usuário já foi cadastrado )
router.get('/check/:email',(req,res,next)=>{
    let email = req.params.email;
    let query = `MATCH (node:User) 
                  WHERE node.email = "${email}" 
                  RETURN COUNT(node) as n`;
    db(query,res);

})
//Método para inserir um usuário
router.post('/', (req,res,next) =>{
    let nome = req.body.nome;
    let email = req.body.email;
    let token = req.body.token;
    let foto = req.body.foto;
    let profissao = req.body.profissao;
    let local  = req.body.local;

    let query = `CREATE ( node:User {token:"${token}",nome:"${nome}",email:"${email}", foto:"${foto}", profissao:"${profissao}", local:"${local}" })
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
                 SET node.token = "${token}",node.nome = "${nome}", node.email = "${email}", node.foto = "${foto}", node.profissao = "${profissao}", node.local="${local}" 
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
