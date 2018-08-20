const express = require('express');
const router = express.Router();

const db = require('../config/database');

// pega todas as relações IS_FRIEND de um nó 
router.get('/:id', (req,res,next)=>{
    let id = parseInt (req.params.id);
    let query = `MATCH (node:User)-[rel:IS_FRIEND]->() 
                 WHERE id(node) = ${id} 
                 RETURN node,rel`;
    db(query,res);
});

// pega a relação IS_FRIEND entre dois nós
router.get('/:id1/:id2', (req,res,next)=>{
    let id1 = parseInt (req.params.id1);
    let id2 = parseInt (req.params.id2);

    let query = `MATCH (node1:User)-[rel:IS_FRIEND]->(node2:User) 
                 WHERE id(node1) = ${id1} AND id(node2) = ${id2} 
                 RETURN node1,rel,node2`;
    db(query,res);
});

// Cria uma relação IS_FRIEND entre dois nós
router.post('/:id1/:id2', (req, res, next) =>{
    let id1 = parseInt (req.params.id1);
    let id2 = parseInt (req.params.id2);

    let query = `MATCH (node1:User),(node2:User) 
                 WHERE id(node1) = ${id1} AND id(node2) = ${id2} 
                 CREATE (node1)-[rel1:IS_FRIEND]->(node2), (node2)-[rel2:IS_FRIEND]->(node1)
                 RETURN rel1, rel2`;
    db(query,res);
});


// Deleta todas as relaçãoes IS_FRIENDS de um nó
router.delete('/:id', (req, res, next) =>{
    let id = parseInt(req.params.id);

    let query = `MATCH (node:User)-[rel:IS_FRIEND]-() 
                WHERE id(node) = ${id}
                DELETE rel`;
    db(query,res);
});


// Deleta a relação IS_FRIEND entre dois nós
router.delete('/:id1/:id2', (req, res, next) =>{
    let id1 = parseInt(req.params.id1);
    let id2 = parseInt(req.params.id2);

    let query = `MATCH (node:User)-[rel:IS_FRIEND]-(node2:User) 
                WHERE id(node) = ${id1} AND id(node2) = ${id2}
                DELETE rel`;
    db(query,res);
});



module.exports = router;
