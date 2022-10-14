// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Estudiantes8 = require('../models/estudiantes8'); //modificar

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante8/estudiantes8AddEdit", { //modificar
            viewTitle: "Nuevo Estudiante 8°"
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
    newEstudiante8(req, res);
    else
    updateEstudiante8(req, res);
});

//metodo para registrar
function newEstudiante8(req, res) {  //MODIFICAR
    var estudiante8 = new Estudiantes8(); //MODIFICAR
    estudiante8.Nombres = req.body.Nombres;
    estudiante8.Apellidos = req.body.Apellidos;
    estudiante8.Grado = req.body.Grado;
    estudiante8.Seccion = req.body.Seccion;
    estudiante8.save((err) => {
        if(!err){
            res.redirect("estudiantes8/listEstudiantes8"); //MODIFICAR
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEstudiante8(req, res) {  //MODIFICAR
    Estudiantes8.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {  //MODIFICAR
        if(!err){
            res.redirect("estudiantes8/listEstudiantes8"); //modificar
        } else {
            res.render("pages/estudiantes8/estudiantes8AddEdit", { //modificar
                viewTitle: "Editar Estudiante", 
                estudiante8: req.body  //MODIFICAR
            })
        }
    });
}

router.get('/listEstudiantes8', (req, res) => {  //modifcar
    if (req.user) {
        Estudiantes8.find((err, docs) => {  //MODIFICAR
            if(!err){
                res.render("pages/estudiante8/listEstudiantes8", { //modifcar
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
    Estudiantes8.findById(req.params.id, (err, docs) => { //MODIFICAR
        if(!err){
            res.render("pages/estudiante8/estudiantes8AddEdit", { //modifcar
                viewTitle: "Editar Estudiante 8°",
                estudiante8: docs  //MODIFICAR
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes8.findByIdAndRemove(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.redirect("/estudiantes8/listEstudiantes8"); //modificar
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;