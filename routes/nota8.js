// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-express');
let router = express.Router();

//llamado al modelo
const Notas8 = require('../models/notas8');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota8/notas8AddEdit", {
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
        newNota8(req, res);
    }else{
        updateNota8(req, res);
    }
    
});

//metodo para registrar
function newNota8(req, res) {
    let nota8 = new Notas8();
    nota8.Nombres = req.body.Nombres;
    nota8.Apellidos = req.body.Apellidos;
    nota8.NotaAC = req.body.NotaAC;
    nota8.NotaAI = req.body.NotaAI;
    nota8.NotaEX = req.body.NotaEX;
    nota8.Periodo1 = req.body.Periodo1;
    nota8.NotaAC2 = req.body.NotaAC2;
    nota8.NotaAI2 = req.body.NotaAI2;
    nota8.NotaEX2 = req.body.NotaEX2;
    nota8.Periodo2 = req.body.Periodo2;
    nota8.NotaAC3 = req.body.NotaAC3;
    nota8.NotaAI3 = req.body.NotaAI3;
    nota8.NotaEX3 = req.body.NotaEX3;
    nota8.Periodo3 = req.body.Periodo3;
    nota8.Prom = req.body.Prom;
    nota8.Periodo1 = ` ${((nota8.NotaAC + nota8.NotaAI + nota8.NotaEX)/3).toFixed(2)}`;
    nota8.save((err) => {
        if (!err){
            res.redirect("notas8/listNotas8");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota8.Periodo2 = ` ${((nota8.NotaAC2 + nota8.NotaAI2 + nota8.NotaEX2)/3).toFixed(2)}`;
    nota8.save((err) => {
        if (!err){
            res.redirect("notas8/listNotas8");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota8.Periodo3 = ` ${((nota8.NotaAC3 + nota8.NotaAI3 + nota8.NotaEX3)/3).toFixed(2)}`;
    nota8.save((err) => {
        if (!err){
            res.redirect("notas8/listNotas8");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota8.Prom = ` ${((nota8.Periodo1 + nota8.Periodo2 + nota8.Periodo3)/3).toFixed(2)}`;
    nota8.save((err) => {
        if (!err){
            res.redirect("notas8/listNotas8");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//Metodo de exportacion a excel
router.get('/', function(req, res, next) {
    Notas8.find({}, function(err, nota8) {
        if (err)
          res.send(err);

        res.render('notas8/listNotas8', { title: '', nota8: nota8 });
    });
 });

 router.get('/Excelnotas8', function(req, res, next) {
    const filename   = "CalificacionesOctavoGrado.csv";
    var dataArray;
    Notas8.find().lean().exec({}, function(err, nota8) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(nota8, true);
    });
 });

//metodo para actualizar
function updateNota8(req, res) {
    Notas8.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas8/listNotas8");
        } else {
            res.render("pages/notas8/notas8AddEdit", {
                viewTitle: "Modificar Datos",
                nota8: req.body
            })
        }
    });
}

router.get('/listNotas8', (req, res) => {
    if (req.user) {
        Notas8.find((err, docs) => {
            if(!err){
                res.render("pages/nota8/listNotas8", {
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
    Notas8.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota8/notas8AddEdit", {
                viewTitle: "Modificar Datos",
                nota8: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas8.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas8/listNotas8");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

//Promediar
router.post('/listNotas8', function(req, res){
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
      res.render('notas8', viewData2);



})


module.exports = router;