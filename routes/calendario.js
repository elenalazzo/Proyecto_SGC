var express = require('express');
const mongoose = require('mongoose');
const Calendarios = require('../models/calendarios');
var router = express.Router();


//llamado al modelo
const Calendario = require('../models/calendarios');

router.get('/', function(req, res) {
  if (req.user) {
    res.render("pages/calendario/calendario", {
        viewTitle: "CALENDARIO"
    });
  } else {
    res.render('../views/pages/login', {
      message: "Inicie sesión para continuar",
      messageClass: "alert-danger"
    });
  }
  
  });

router.post('/',(req,res)=>{

  if(req.body._id == '')
    calendario(req, res)
  
});

//metodo para registrar
function calendario(req, res) {
    var calen = new Calendario();
    calen.taskText = req.body.taskText;
    calen.save((err) => {
        if(!err){
            res.redirect("/calendario/calendario");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}


router.get('/calendario', (req, res) => {
  if (req.user) {
      Calendarios.find((err, docs) => {
          if(!err){
              res.render("pages/calendario/calendario", {
                viewTitle: "CALENDARIO",
                  list: docs
              });
          } else {
              console.log("Error al guardar" + err);
          } 
      })
    } else {
      res.render('../views/pages/login', {
        message: "Inicie sesión para continuar",
        messageClass: "alert-danger"
      });
    }
});


router.get('/:id', (req, res) => {
  Calendarios.findById(req.params.id, (err, docs) => {
      if(!err){
          res.render("pages/calendario/calendario", {
            viewTitle: "CALEN",
              calen: docs
          });
      }
  })
});

router.get('/delete/:id', (req, res) => {
  Calendarios.findByIdAndRemove(req.params.id, (err, docs) => {
      if(!err){
          res.redirect("/calendario/calendario");
      } else {
          console.log("No se ha podido eliminar el registro", err);
      } 
  })
}) 


module.exports = router;
