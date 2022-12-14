// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-express');
let router = express.Router();

//llamado al modelo
const Notas3 = require('../models/notas3');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota3/notas3AddEdit", {
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
        newNota3(req, res);
    }else{
        updateNota3(req, res);
    }
    
});

//metodo para registrar
function newNota3(req, res) {
    let nota3 = new Notas3();
    nota3.Nombres = req.body.Nombres;
    nota3.Apellidos = req.body.Apellidos;
    nota3.NotaAC = req.body.NotaAC;
    nota3.NotaAI = req.body.NotaAI;
    nota3.NotaEX = req.body.NotaEX;
    nota3.Periodo1 = req.body.Periodo1;
    nota3.NotaAC2 = req.body.NotaAC2;
    nota3.NotaAI2 = req.body.NotaAI2;
    nota3.NotaEX2 = req.body.NotaEX2;
    nota3.Periodo2 = req.body.Periodo2;
    nota3.NotaAC3 = req.body.NotaAC3;
    nota3.NotaAI3 = req.body.NotaAI3;
    nota3.NotaEX3 = req.body.NotaEX3;
    nota3.Periodo3 = req.body.Periodo3;
    nota3.Prom = req.body.Prom;
    nota3.Periodo1 = ` ${((nota3.NotaAC + nota3.NotaAI + nota3.NotaEX)/3).toFixed(2)}`;
    nota3.save((err) => {
        if (!err){
            res.redirect("notas3/listNotas3");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota3.Periodo2 = ` ${((nota3.NotaAC2 + nota3.NotaAI2 + nota3.NotaEX2)/3).toFixed(2)}`;
    nota3.save((err) => {
        if (!err){
            res.redirect("notas3/listNotas3");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota3.Periodo3 = ` ${((nota3.NotaAC3 + nota3.NotaAI3 + nota3.NotaEX3)/3).toFixed(2)}`;
    nota3.save((err) => {
        if (!err){
            res.redirect("notas3/listNotas3");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota3.Prom = ` ${((nota3.Periodo1 + nota3.Periodo2 + nota3.Periodo3)/3).toFixed(2)}`;
    nota3.save((err) => {
        if (!err){
            res.redirect("notas3/listNotas3");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//Metodo de exportacion a excel
router.get('/', function(req, res, next) {
    Notas3.find({}, function(err, nota3) {
        if (err)
          res.send(err);

        res.render('notas3/listNotas3', { title: '', nota3: nota3 });
    });
 });

 router.get('/Excelnotas3', function(req, res, next) {
    const filename   = "CalificacionesTercerGrado.csv";
    var dataArray;
    Notas3.find().lean().exec({}, function(err, nota3) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(nota3, true);
    });
 });

//metodo para actualizar
function updateNota3(req, res) {
    Notas3.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas3/listNotas3");
        } else {
            res.render("notas3/notas3AddEdit", {
                viewTitle: "Modificar Datos",
                nota3: req.body
            })
        }
    });
}

router.get('/listNotas3', (req, res) => {
    if (req.user) {
        Notas3.find((err, docs) => {
            if(!err){
                res.render("pages/nota3/listNotas3", {
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
    Notas3.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota3/notas3AddEdit", {
                viewTitle: "Modificar Datos",
                nota3: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas3.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas3/listNotas3");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 



module.exports = router;