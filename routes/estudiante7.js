// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Estudiantes7 = require('../models/estudiantes7'); //modificar

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante7/estudiantes7AddEdit", { //modificar
            viewTitle: "Nuevo Estudiante 7°"
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
    newEstudiante7(req, res);
    else
    updateEstudiante7(req, res);
});

//metodo para registrar
function newEstudiante7(req, res) {  //MODIFICAR
    var estudiante7 = new Estudiantes7(); //MODIFICAR
    estudiante7.Nombres = req.body.Nombres;
    estudiante7.Apellidos = req.body.Apellidos;
    estudiante7.Grado = req.body.Grado;
    estudiante7.Seccion = req.body.Seccion;
    estudiante7.save((err) => {
        if(!err){
            res.redirect("estudiantes7/listEstudiantes7"); //MODIFICAR
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEstudiante7(req, res) {  //MODIFICAR
    Estudiantes7.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {  //MODIFICAR
        if(!err){
            res.redirect("estudiantes7/listEstudiantes7"); //modificar
        } else {
            res.render("pages/estudiantes7/estudiantes7AddEdit", { //modificar
                viewTitle: "Editar Estudiante", 
                estudiante7: req.body
            })
        }
    });
}

router.get('/listEstudiantes7', (req, res) => {  //modifcar
    if (req.user) {
        Estudiantes7.find((err, docs) => {  //MODIFICAR
            if(!err){
                res.render("pages/estudiante7/listEstudiantes7", { //modifcar
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
    Estudiantes7.findById(req.params.id, (err, docs) => { //MODIFICAR
        if(!err){
            res.render("pages/estudiante7/estudiantes7AddEdit", { //modifcar
                viewTitle: "Editar Estudiante 7°",
                estudiante7: docs  //MODIFICAR
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes7.findByIdAndRemove(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.redirect("/estudiantes7/listEstudiantes7"); //modificar
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;