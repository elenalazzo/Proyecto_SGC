// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-express');
let router = express.Router();

//llamado al modelo
const Notas1 = require('../models/notas1');

router.get('/', (req, res, next ) => {

    if (req.user) {
        res.render("pages/nota1/notas1AddEdit", {
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
        newNota1(req, res);
    }else{
        updateNota1(req, res);
    }
    
});


//Funcion para agregar notas
/** @function
 * @name AgregarNotas */
function newNota1 (req, res) {
    
    let nota1 = new Notas1();
    nota1.Nombres = req.body.Nombres;
    nota1.Apellidos = req.body.Apellidos;
    nota1.NotaAC = req.body.NotaAC;
    nota1.NotaAI = req.body.NotaAI;
    nota1.NotaEX = req.body.NotaEX;
    nota1.Periodo1 = req.body.Periodo1;
    nota1.NotaAC2 = req.body.NotaAC2;
    nota1.NotaAI2 = req.body.NotaAI2;
    nota1.NotaEX2 = req.body.NotaEX2;
    nota1.Periodo2 = req.body.Periodo2;
    nota1.NotaAC3 = req.body.NotaAC3;
    nota1.NotaAI3 = req.body.NotaAI3;
    nota1.NotaEX3 = req.body.NotaEX3;
    nota1.Periodo3 = req.body.Periodo3;
    nota1.Prom = req.body.Prom;
    nota1.Periodo1 = ` ${((nota1.NotaAC + nota1.NotaAI + nota1.NotaEX)/3).toFixed(2)}`;
    nota1.save((err) => {
        if (!err){
            res.redirect("notas1/listNotas1");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota1.Periodo2 = ` ${((nota1.NotaAC2 + nota1.NotaAI2 + nota1.NotaEX2)/3).toFixed(2)}`;
    nota1.save((err) => {
        if (!err){
            res.redirect("notas1/listNotas1");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota1.Periodo3 = ` ${((nota1.NotaAC3 + nota1.NotaAI3 + nota1.NotaEX3)/3).toFixed(2)}`;
    nota1.save((err) => {
        if (!err){
            res.redirect("notas1/listNotas1");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota1.Prom = ` ${((nota1.Periodo1 + nota1.Periodo2 + nota1.Periodo3)/3).toFixed(2)}`;
    nota1.save((err) => {
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
    Notas1.find({}, function(err, nota1) {
        if (err)
          res.send(err);

        res.render('notas1/listNotas1', { title: '', nota1: nota1 });
    });
 });

 router.get('/Excelnotas1', function(req, res, next) {
    const filename   = "CalificacionesPrimerGrado.csv";
    var dataArray;
    Notas1.find().lean().exec({}, function(err, nota1) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(nota1, true);
    });
 });

//Funcion para actualizar notas
/** @function
 * @name ActualizarNotas*/
function updateNota1(req, res) {
    Notas1.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas1/listNotas1");
        } else {
            res.render("notas1/notas1AddEdit", {
                viewTitle: "Modificar Datos",
                nota1: req.body
            })
        }
    });
}

router.get('/listNotas1', (req, res) => {
    if (req.user) {
        Notas1.find((err, docs) => {
            if(!err){
                res.render("pages/nota1/listNotas1", {
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
    Notas1.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota1/notas1AddEdit", {
                viewTitle: "Modificar Datos",
                nota1: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas1.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas1/listNotas1");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 



module.exports = router;