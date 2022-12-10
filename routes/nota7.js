// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-express');
let router = express.Router();

//llamado al modelo
const Notas7 = require('../models/notas7');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota7/notas7AddEdit", {
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
        newNota7(req, res);
    }else{
        updateNota7(req, res);
    }
    
});

//metodo para registrar
function newNota7(req, res) {
    let nota7 = new Notas7();
    nota7.Nombres = req.body.Nombres;
    nota7.Apellidos = req.body.Apellidos;
    nota7.NotaAC = req.body.NotaAC;
    nota7.NotaAI = req.body.NotaAI;
    nota7.NotaEX = req.body.NotaEX;
    nota7.Periodo1 = req.body.Periodo1;
    nota7.NotaAC2 = req.body.NotaAC2;
    nota7.NotaAI2 = req.body.NotaAI2;
    nota7.NotaEX2 = req.body.NotaEX2;
    nota7.Periodo2 = req.body.Periodo2;
    nota7.NotaAC3 = req.body.NotaAC3;
    nota7.NotaAI3 = req.body.NotaAI3;
    nota7.NotaEX3 = req.body.NotaEX3;
    nota7.Periodo3 = req.body.Periodo3;
    nota7.Prom = req.body.Prom;
    nota7.Periodo1 = ` ${((nota7.NotaAC + nota7.NotaAI + nota7.NotaEX)/3).toFixed(2)}`;
    nota7.save((err) => {
        if (!err){
            res.redirect("notas7/listNotas7");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota7.Periodo2 = ` ${((nota7.NotaAC2 + nota7.NotaAI2 + nota7.NotaEX2)/3).toFixed(2)}`;
    nota7.save((err) => {
        if (!err){
            res.redirect("notas7/listNotas7");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota7.Periodo3 = ` ${((nota7.NotaAC3 + nota7.NotaAI3 + nota7.NotaEX3)/3).toFixed(2)}`;
    nota7.save((err) => {
        if (!err){
            res.redirect("notas7/listNotas7");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota7.Prom = ` ${((nota7.Periodo1 + nota7.Periodo2 + nota7.Periodo3)/3).toFixed(2)}`;
    nota7.save((err) => {
        if (!err){
            res.redirect("notas7/listNotas7");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//Metodo de exportacion a excel
router.get('/', function(req, res, next) {
    Notas7.find({}, function(err, nota7) {
        if (err)
          res.send(err);

        res.render('notas7/listNotas7', { title: '', nota7: nota7 });
    });
 });

 router.get('/Excelnotas7', function(req, res, next) {
    const filename   = "CalificacionesSeptimoGrado.csv";
    var dataArray;
    Notas7.find().lean().exec({}, function(err, nota7) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(nota7, true);
    });
 });

//metodo para actualizar
function updateNota7(req, res) {
    Notas7.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas7/listNotas7");
        } else {
            res.render("pages/notas7/notas7AddEdit", {
                viewTitle: "Modificar Datos",
                nota7: req.body
            })
        }
    });
}

router.get('/listNotas7', (req, res) => {
    if (req.user) {
        Notas7.find((err, docs) => {
            if(!err){
                res.render("pages/nota7/listNotas7", {
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
    Notas7.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota7/notas7AddEdit", {
                viewTitle: "Modificar Datos",
                nota7: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas7.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas7/listNotas7");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

//Promediar
router.post('/listNotas7', function(req, res){
  let NotaAC = parseFloat(req.body.NotaAC) || 0;
  let NotaAI = parseFloat(req.body.NotaAI) || 0;
  let NotaEX = parseFloat(req.body.NotaEX) || 0;
  let Prom = '';
  Prom = ` ${((NotaAC + NotaAI + NotaEX)/3)}`;


    let viewData2 = {
        NotaAC,
        NotaAI,
        NotaEX,
        Prom
      }
      res.render('notas7', viewData2);



})


module.exports = router;