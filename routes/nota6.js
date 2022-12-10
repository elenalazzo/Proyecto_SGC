// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-express');
let router = express.Router();

//llamado al modelo
const Notas6 = require('../models/notas6');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/nota6/notas6AddEdit", {
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
        newNota6(req, res);
    }else{
        updateNota6(req, res);
    }
    
});

//metodo para registrar
function newNota6(req, res) {
    let nota6 = new Notas6();
    nota6.Nombres = req.body.Nombres;
    nota6.Apellidos = req.body.Apellidos;
    nota6.NotaAC = req.body.NotaAC;
    nota6.NotaAI = req.body.NotaAI;
    nota6.NotaEX = req.body.NotaEX;
    nota6.Periodo1 = req.body.Periodo1;
    nota6.NotaAC2 = req.body.NotaAC2;
    nota6.NotaAI2 = req.body.NotaAI2;
    nota6.NotaEX2 = req.body.NotaEX2;
    nota6.Periodo2 = req.body.Periodo2;
    nota6.NotaAC3 = req.body.NotaAC3;
    nota6.NotaAI3 = req.body.NotaAI3;
    nota6.NotaEX3 = req.body.NotaEX3;
    nota6.Periodo3 = req.body.Periodo3;
    nota6.Prom = req.body.Prom;
    nota6.Periodo1 = ` ${((nota6.NotaAC + nota6.NotaAI + nota6.NotaEX)/3).toFixed(2)}`;
    nota6.save((err) => {
        if (!err){
            res.redirect("notas6/listNotas6");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota6.Periodo2 = ` ${((nota6.NotaAC2 + nota6.NotaAI2 + nota6.NotaEX2)/3).toFixed(2)}`;
    nota6.save((err) => {
        if (!err){
            res.redirect("notas6/listNotas6");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota6.Periodo3 = ` ${((nota6.NotaAC3 + nota6.NotaAI3 + nota6.NotaEX3)/3).toFixed(2)}`;
    nota6.save((err) => {
        if (!err){
            res.redirect("notas6/listNotas6");
        }
        else {
            console.log("Se ha producido un error");
        }
    });

    nota6.Prom = ` ${((nota6.Periodo1 + nota6.Periodo2 + nota6.Periodo3)/3).toFixed(2)}`;
    nota6.save((err) => {
        if (!err){
            res.redirect("notas6/listNotas6");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//Metodo de exportacion a excel
router.get('/', function(req, res, next) {
    Notas6.find({}, function(err, nota6) {
        if (err)
          res.send(err);

        res.render('notas6/listNotas6', { title: '', nota6: nota6 });
    });
 });

 router.get('/Excelnotas6', function(req, res, next) {
    const filename   = "CalificacionesSextoGrado.csv";
    var dataArray;
    Notas6.find().lean().exec({}, function(err, nota6) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(nota6, true);
    });
 });

//metodo para actualizar
function updateNota6(req, res) {
    Notas6.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("notas6/listNotas6");
        } else {
            res.render("pages/notas6/notas6AddEdit", {
                viewTitle: "Modificar Datos",
                nota6: req.body
            })
        }
    });
}

router.get('/listNotas6', (req, res) => {
    if (req.user) {
        Notas6.find((err, docs) => {
            if(!err){
                res.render("pages/nota6/listNotas6", {
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
    Notas6.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/nota6/notas6AddEdit", {
                viewTitle: "Modificar Datos",
                nota6: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Notas6.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/notas6/listNotas6");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

//Promediar
router.post('/listNotas6', function(req, res){
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
      res.render('notas6', viewData2);



})


module.exports = router;