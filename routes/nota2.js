// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-express');
let router = express.Router();

//llamado al modelo
const Notas2 = require('../models/notas2');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota2/notas2AddEdit", {
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
        newNota2(req, res);
    }else{
        updateNota2(req, res);
    }
    
});


//metodo para registrar
function newNota2(req, res) {
    let nota2 = new Notas2();
    nota2.Nombres = req.body.Nombres;
    nota2.Apellidos = req.body.Apellidos;
    nota2.NotaAC = req.body.NotaAC;
    nota2.NotaAI = req.body.NotaAI;
    nota2.NotaEX = req.body.NotaEX;
    nota2.Periodo1 = req.body.Periodo1;
    nota2.NotaAC2 = req.body.NotaAC2;
    nota2.NotaAI2 = req.body.NotaAI2;
    nota2.NotaEX2 = req.body.NotaEX2;
    nota2.Periodo2 = req.body.Periodo2;
    nota2.NotaAC3 = req.body.NotaAC3;
    nota2.NotaAI3 = req.body.NotaAI3;
    nota2.NotaEX3 = req.body.NotaEX3;
    nota2.Periodo3 = req.body.Periodo3;
    nota2.Prom = req.body.Prom;
    nota2.Periodo1 = ` ${((nota2.NotaAC + nota2.NotaAI + nota2.NotaEX)/3).toFixed(2)}`;
    nota2.save((err) => {
        if (!err){
            res.redirect("notas2/listNotas2");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota2.Periodo2 = ` ${((nota2.NotaAC2 + nota2.NotaAI2 + nota2.NotaEX2)/3).toFixed(2)}`;
    nota2.save((err) => {
        if (!err){
            res.redirect("notas2/listNotas2");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota2.Periodo3 = ` ${((nota2.NotaAC3 + nota2.NotaAI3 + nota2.NotaEX3)/3).toFixed(2)}`;
    nota2.save((err) => {
        if (!err){
            res.redirect("notas2/listNotas2");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota2.Prom = ` ${((nota2.Periodo1 + nota2.Periodo2 + nota2.Periodo3)/3).toFixed(2)}`;
    nota2.save((err) => {
        if (!err){
            res.redirect("notas1/listNotas1");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//Metodo de exportacion a excel
router.get('/', function(req, res, next) {
    Notas2.find({}, function(err, nota2) {
        if (err)
          res.send(err);

        res.render('notas2/listNotas2', { title: '', nota2: nota2 });
    });
 });

 router.get('/Excelnotas2', function(req, res, next) {
    const filename   = "CalificacionesSegundoGrado.csv";
    var dataArray;
    Notas2.find().lean().exec({}, function(err, nota2) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(nota2, true);
    });
 });

//metodo para actualizar
function updateNota2(req, res) {
    Notas2.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas2/listNotas2");
        } else {
            res.render("notas2/notas2AddEdit", {
                viewTitle: "Modificar Datos",
                nota2: req.body
            })
        }
    });
}

router.get('/listNotas2', (req, res) => {
    if (req.user) {
        Notas2.find((err, docs) => {
            if(!err){
                res.render("pages/nota2/listNotas2", {
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
    Notas2.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota2/notas2AddEdit", {
                viewTitle: "Modificar Datos",
                nota2: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas2.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas2/listNotas2");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 




module.exports = router;