// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Estudiantes9 = require('../models/estudiantes9'); //modificar

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante9/estudiantes9AddEdit", { //modificar
            viewTitle: "Nuevo Estudiante 9°"
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
    newEstudiante9(req, res);
    else
    updateEstudiante9(req, res);
});

//metodo para registrar
function newEstudiante9(req, res) { //MODIFICAR
    var estudiante9 = new Estudiantes9(); //MODIFICAR
    estudiante9.Nombres = req.body.Nombres;
    estudiante9.Apellidos = req.body.Apellidos;
    estudiante9.Grado = req.body.Grado;
    estudiante9.Seccion = req.body.Seccion;
    estudiante9.save((err) => {
        if(!err){
            res.redirect("estudiantes9/listEstudiantes9"); //MODIFICAR
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEstudiante9(req, res) {  //MODIFICAR
    Estudiantes9.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {  //MODIFICAR
        if(!err){
            res.redirect("estudiantes9/listEstudiantes9"); //modificar
        } else {
            res.render("pages/estudiantes9/estudiantes9AddEdit", { //modificar
                viewTitle: "Editar Estudiante", 
                estudiante: req.body
            })
        }
    });
}

router.get('/listEstudiantes9', (req, res) => {  //modifcar
    if (req.user) {
        Estudiantes9.find((err, docs) => {
            if(!err){
                res.render("pages/estudiante9/listEstudiantes9", { //modifcar
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
    Estudiantes9.findById(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.render("pages/estudiante9/estudiantes9AddEdit", { //modifcar
                viewTitle: "Editar Estudiante 9°",
                estudiante9: docs
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes9.findByIdAndRemove(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.redirect("/estudiantes9/listEstudiantes9"); //modificar
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;