// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Estudiantes5 = require('../models/estudiantes5'); //modificar

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante5/estudiantes5AddEdit", { //modificar
            viewTitle: "Nuevo Estudiante 5°"
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
    newEstudiante5(req, res);
    else
    updateEstudiante5(req, res);
});

//metodo para registrar
function newEstudiante5(req, res) { //MODIFICAR
    var estudiante5 = new Estudiantes5(); //MODIFICAR
    estudiante5.Nombres = req.body.Nombres; //MODIFICAR
    estudiante5.Apellidos = req.body.Apellidos; //MODIFICAR
    estudiante5.Grado = req.body.Grado; //MODIFICAR
    estudiante5.Seccion = req.body.Seccion; //MODIFICAR
    estudiante5.save((err) => { //MODIFICAR
        if(!err){
            res.redirect("estudiantes5/listEstudiantes5"); //MODIFICAR
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEstudiante5(req, res) {  //MODIFICAR
    Estudiantes5.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("estudiantes5/listEstudiantes5"); //modificar
        } else {
            res.render("pages/estudiantes5/estudiantes5AddEdit", { //modificar
                viewTitle: "Editar Estudiante", 
                estudiante5: req.body
            })
        }
    });
}

router.get('/listEstudiantes5', (req, res) => {  //modifcar
    if (req.user) {
        Estudiantes5.find((err, docs) => { //MODIFICAR
            if(!err){
                res.render("pages/estudiante5/listEstudiantes5", { //modifcar
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
    Estudiantes5.findById(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.render("pages/estudiante5/estudiantes5AddEdit", { //modifcar
                viewTitle: "Editar Estudiante 5°",
                estudiante5: docs //MODIFICAR
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes5.findByIdAndRemove(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.redirect("/estudiantes5/listEstudiantes5"); //modificar
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;