// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

//llamado al modelo
const Notas4 = require('../models/notas4');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota4/notas4AddEdit", {
            viewTitle: "Nuevo promedio"
        });
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }
});

router.post('/', (req, res) => {
    if(req.body._id == ''){
        newNota4(req, res);
    }else{
        updateNota4(req, res);
    }
    
});

//metodo para registrar
function newNota4(req, res) {
    let nota4 = new Notas4();
    nota4.Nombres = req.body.Nombres;
    nota4.Apellidos = req.body.Apellidos;
    nota4.NotaAC = req.body.NotaAC;
    nota4.NotaAI = req.body.NotaAI;
    nota4.NotaEX = req.body.NotaEX;
    nota4.Periodo1 = req.body.Periodo1;
    nota4.NotaAC2 = req.body.NotaAC2;
    nota4.NotaAI2 = req.body.NotaAI2;
    nota4.NotaEX2 = req.body.NotaEX2;
    nota4.Periodo2 = req.body.Periodo2;
    nota4.NotaAC3 = req.body.NotaAC3;
    nota4.NotaAI3 = req.body.NotaAI3;
    nota4.NotaEX3 = req.body.NotaEX3;
    nota4.Periodo3 = req.body.Periodo3;
    nota4.Prom = req.body.Prom;
    nota4.Periodo1 = ` ${((nota4.NotaAC + nota4.NotaAI + nota4.NotaEX)/3).toFixed(2)}`;
    nota4.save((err) => {
        if (!err){
            res.redirect("notas4/listNotas4");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota4.Periodo2 = ` ${((nota4.NotaAC2 + nota4.NotaAI2 + nota4.NotaEX2)/3).toFixed(2)}`;
    nota4.save((err) => {
        if (!err){
            res.redirect("notas4/listNotas4");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota4.Periodo3 = ` ${((nota4.NotaAC3 + nota4.NotaAI3 + nota4.NotaEX3)/3).toFixed(2)}`;
    nota4.save((err) => {
        if (!err){
            res.redirect("notas4/listNotas4");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota4.Prom = ` ${((nota4.Periodo1 + nota4.Periodo2 + nota4.Periodo3)/3).toFixed(2)}`;
    nota4.save((err) => {
        if (!err){
            res.redirect("notas4/listNotas4");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateNota4(req, res) {
    Notas4.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas4/listNotas4");
        } else {
            res.render("notas4/notas4AddEdit", {
                viewTitle: "Modificar Datos",
                nota4: req.body
            })
        }
    });
}

router.get('/listNotas4', (req, res) => {
    if (req.user) {
        Notas4.find((err, docs) => {
            if(!err){
                res.render("pages/nota4/listNotas4", {
                    viewTitle: "Modificar Datos",
                    list: docs
                });
            } else {
                console.log("Error al modificar" + err);
            } 
        })
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }
})

router.get('/:id', (req, res) => {
    Notas4.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota4/notas4AddEdit", {
                viewTitle: "Modificar Datos",
                nota4: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas4.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas4/listNotas4");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 


module.exports = router;