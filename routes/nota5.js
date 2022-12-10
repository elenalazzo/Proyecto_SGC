// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-express');
let router = express.Router();

//llamado al modelo
const Notas5 = require('../models/notas5');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota5/notas5AddEdit", {
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
        newNota5(req, res);
    }else{
        updateNota5(req, res);
    }
    
});

//metodo para registrar
function newNota5(req, res) {
    let nota5 = new Notas5();
    nota5.Nombres = req.body.Nombres;
    nota5.Apellidos = req.body.Apellidos;
    nota5.NotaAC = req.body.NotaAC;
    nota5.NotaAI = req.body.NotaAI;
    nota5.NotaEX = req.body.NotaEX;
    nota5.Periodo1 = req.body.Periodo1;
    nota5.NotaAC2 = req.body.NotaAC2;
    nota5.NotaAI2 = req.body.NotaAI2;
    nota5.NotaEX2 = req.body.NotaEX2;
    nota5.Periodo2 = req.body.Periodo2;
    nota5.NotaAC3 = req.body.NotaAC3;
    nota5.NotaAI3 = req.body.NotaAI3;
    nota5.NotaEX3 = req.body.NotaEX3;
    nota5.Periodo3 = req.body.Periodo3;
    nota5.Prom = req.body.Prom;
    nota5.Periodo1 = ` ${((nota5.NotaAC + nota5.NotaAI + nota5.NotaEX)/3).toFixed(2)}`;
    nota5.save((err) => {
        if (!err){
            res.redirect("notas5/listNotas5");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota5.Periodo2 = ` ${((nota5.NotaAC2 + nota5.NotaAI2 + nota5.NotaEX2)/3).toFixed(2)}`;
    nota5.save((err) => {
        if (!err){
            res.redirect("notas5/listNotas5");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota5.Periodo3 = ` ${((nota5.NotaAC3 + nota5.NotaAI3 + nota5.NotaEX3)/3).toFixed(2)}`;
    nota5.save((err) => {
        if (!err){
            res.redirect("notas5/listNotas5");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota5.Prom = ` ${((nota5.Periodo1 + nota5.Periodo2 + nota5.Periodo3)/3).toFixed(2)}`;
    nota5.save((err) => {
        if (!err){
            res.redirect("notas5/listNotas5");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}
//Metodo de exportacion a excel
router.get('/', function(req, res, next) {
    Notas5.find({}, function(err, nota5) {
        if (err)
          res.send(err);

        res.render('notas5/listNotas5', { title: '', nota5: nota5 });
    });
 });

 router.get('/Excelnotas5', function(req, res, next) {
    const filename   = "CalificacionesQuintoGrado.csv";
    var dataArray;
    Notas5.find().lean().exec({}, function(err, nota5) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(nota5, true);
    });
 });
//metodo para actualizar
function updateNota5(req, res) {
    Notas5.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas5/listNotas5");
        } else {
            res.render("pages/notas5/notas5AddEdit", {
                viewTitle: "Modificar Datos",
                nota5: req.body
            })
        }
    });
}

router.get('/listNotas5', (req, res) => {
    if (req.user) {
        Notas5.find((err, docs) => {
            if(!err){
                res.render("pages/nota5/listNotas5", {
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
    Notas5.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota5/notas5AddEdit", {
                viewTitle: "Modificar Datos",
                nota5: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas5.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas5/listNotas5");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

//Promediar
router.post('/listNotas5', function(req, res){
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
      res.render('notas5', viewData2);



})


module.exports = router;