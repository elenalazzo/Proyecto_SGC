// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Estudiantes3 = require('../models/estudiantes3'); //modificar

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante3/estudiantes3AddEdit", { //modificar
            viewTitle: "Nuevo Estudiante 3°"
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
    newEstudiante3(req, res);
    else
    updateEstudiante3(req, res);
});

//metodo para registrar
function newEstudiante3(req, res) { //MODIFICAR
    var estudiante3 = new Estudiantes3(); //MODIFICAR
    estudiante3.Nombres = req.body.Nombres; //MODIFICAR
    estudiante3.Apellidos = req.body.Apellidos; //MODIFICAR
    estudiante3.Grado = req.body.Grado; //MODIFICAR
    estudiante3.Seccion = req.body.Seccion; //MODIFICAR
    estudiante3.save((err) => {
        if(!err){
            res.redirect("estudiantes3/listEstudiantes3"); //MODIFICAR
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEstudiante3(req, res) {  //MODIFICAR
    Estudiantes3.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => { //MODIFICAR
        if(!err){
            res.redirect("estudiantes3/listEstudiantes3"); //modificar
        } else {
            res.render("pages/estudiantes3/estudiantes3AddEdit", { //modificar
                viewTitle: "Editar Estudiante", 
                estudiante3: req.body  //MODIFICAR
            })
        }
    });
}

router.get('/listEstudiantes3', (req, res) => {  //modifcar
    if (req.user) {
        Estudiantes3.find((err, docs) => {  //MODIFICAR
            if(!err){
                res.render("pages/estudiante3/listEstudiantes3", { //modifcar
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
    Estudiantes.findById(req.params.id, (err, docs) => {
        if(!err){
            res.render("pages/estudiante3/estudiantes3AddEdit", { //modifcar
                viewTitle: "Editar Estudiante 3°",
                estudiante3: docs   //MODIFICAR
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes3.findByIdAndRemove(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.redirect("/estudiantes3/listEstudiantes3"); //modificar
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;