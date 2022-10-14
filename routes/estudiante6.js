// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Estudiantes6 = require('../models/estudiantes6'); //modificar

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante6/estudiantes6AddEdit", { //modificar
            viewTitle: "Nuevo Estudiante"
        });
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    newEstudiante6(req, res);
    else
    updateEstudiante6(req, res);
});

//metodo para registrar
function newEstudiante6(req, res) {   //MODIFICAR
    var estudiante6 = new Estudiantes6();
    estudiante6.Nombres = req.body.Nombres;
    estudiante6.Apellidos = req.body.Apellidos;
    estudiante6.Grado = req.body.Grado;
    estudiante6.Seccion = req.body.Seccion;
    estudiante6.save((err) => {
        if(!err){
            res.redirect("estudiantes6/listEstudiantes6"); //MODIFICAR
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar 
function updateEstudiante6(req, res) {  //MODIFICAR
    Estudiantes6.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => { //MODIFICAR
        if(!err){
            res.redirect("estudiantes6/listEstudiantes6"); //modificar
        } else {
            res.render("estudiantes6/estudiantes6AddEdit", { //modificar
                viewTitle: "Editar Estudiante", 
                estudiante6: req.body
            })
        }
    });
}

router.get('/listEstudiantes6', (req, res) => {  //modifcar
    if (req.user) {
        Estudiantes6.find((err, docs) => { //MODIFICAR
            if(!err){
                res.render("pages/estudiante6/listEstudiantes6", { //modifcar
                    viewTitle: "Lista de Estudiantes",
                    list: docs
                });
            } else {
                console.log("Error al listar los estudiantes" + err);
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
    Estudiantes6.findById(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.render("pages/estudiante6/estudiantes6AddEdit", { //modifcar
                viewTitle: "Editar Estudiante",
                estudiante6: docs   //MODIFICAR
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes6.findByIdAndRemove(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.redirect("/estudiantes6/listEstudiantes6"); //modificar
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;