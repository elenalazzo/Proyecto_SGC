// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
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
    nota1.Prom = req.body.Prom;
    nota1.Prom = ` ${((nota1.NotaAC + nota1.NotaAI + nota1.NotaEX)/3).toFixed(2)}`;
    nota1.save((err) => {
        if (!err){
            res.redirect("notas1/listNotas1");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
    
}

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

//Promediar
router.post('/listNotas1', function(req, res){
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
      res.render('notas1', viewData2);



})


module.exports = router;