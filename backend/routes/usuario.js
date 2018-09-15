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

});

//Retorna o número de solicitações de amizade feitas a um usuário
router.get('/get_friend_solicitations_recieved/:id',(req,res,next)=>{
  let id = parseInt(req.params.id);
  let query = `MATCH (node:User)<-[asked:ASKED_AS_FRIEND]-(node2:User)   
               WHERE id(node) = ${id} 
               RETURN  COUNT(asked) as friends`;
  db(query,res); 
});

// Retorna o número de solicitações de amizade enviadas por um usuário
router.get('/get_friend_solicitations_sent/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)-[asked:ASKED_AS_FRIEND]->(node2:User)   
                 WHERE id(node) = ${id} 
                 RETURN  COUNT(asked) as friends`;
    db(query,res); 
  });

//Retorna o número de solicitações de depoimentos feitas a um usuário
router.get('/get_depo_solicitations/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)<-[waiting:WAITING_CONFIRMATION]-(depo:Depo)   
                 WHERE id(node) = ${id} 
                 RETURN  COUNT(waiting) as depos`;
    db(query,res); 
});

//Retorna o número de convites de participação de grupo feitas a um usuário
router.get('/get_group_invitations/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)<-[inv:INVITED]-(group:Group)   
                 WHERE id(node) = ${id} 
                 RETURN  COUNT(inv) as invites`;
    db(query,res); 
});

//Retorna o número de amigos de um usuário
router.get('/get_friend_number/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)-[rel:IS_FRIEND]-(node2:User) 
                 WHERE id(node) = ${id} 
                 RETURN COUNT (rel) as friends`;
    db(query,res);
})

//Retorna o número de depoimentos de um usuário
router.get('/get_depo_number/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)-[rel:HAS_DEPO]->(depo:Depo) 
                 WHERE id(node) = ${id} 
                 RETURN COUNT (rel) as depos`;
    db(query,res);
});

//Retorna o número depoimentos escritos por um usuário
router.get('/get_written_depo_number/:id', (req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)-[rel:WROTE]-:(depo:Depo) 
                 WHERE id(node) = ${id} 
                RETURN COUNT (rel) as depos`
});

//Retorna o número de grupos que um usuário faz parte
router.get('/get_group_number/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)-[rel:IS_MEMBER | :CREATED]->(group:Group) 
                 WHERE id(node) = ${id} 
                 RETURN COUNT (rel) as groups`;
    db(query,res);
});

//Retorna o número de grupos que um usuário criou
router.get('/get_created_group_number/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)-[rel:CREATED]->(group:Group) 
                 WHERE id(node) = ${id} 
                 RETURN COUNT (rel) as created`;
    db(query,res);
});

//Retorna o número de grupos que um usuário pediu para participar
router.get('/get_asked_group_number/:id',(req,res,next)=>{
    let id = parseInt(req.params.id);
    let query = `MATCH (node:User)-[rel:ASKED_MEMBERSHIP]->(group:Group) 
                 WHERE id(node) = ${id} 
                 RETURN COUNT (rel) as asked`;
    db(query,res);
});

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
