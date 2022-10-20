// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

//llamado al modelo
const Estudiantes4 = require('../models/estudiantes4'); //modificar

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante4/estudiantes4AddEdit", { //modificar
            viewTitle: "Nuevo Estudiante 4°"
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
        newEstudiante4(req, res);
    }else{
        updateEstudiante4(req, res);
    }
    
});

//metodo para registrar
function newEstudiante4(req, res) {  //MODIFICAR
    let estudiante4 = new Estudiantes4(); //MODIFICAR
    estudiante4.Nombres = req.body.Nombres; //MODIFICAR
    estudiante4.Apellidos = req.body.Apellidos; //MODIFICAR
    estudiante4.Grado = req.body.Grado; //MODIFICAR
    estudiante4.Seccion = req.body.Seccion; //MODIFICAR
    estudiante4.save((err) => { //MODIFICAR
        if(!err){
            res.redirect("estudiantes4/listEstudiantes4"); //MODIFICAR
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEstudiante4(req, res) {  //MODIFICAR
    Estudiantes4.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => { //MODIFICAR
        if(!err){
            res.redirect("estudiantes4/listEstudiantes4"); //modificar
        } else {
            res.render("pages/estudiantes4/estudiantes4AddEdit", { //modificar
                viewTitle: "Editar Estudiante", 
                estudiante4: req.body //MODIFICAR
            })
        }
    });
}

router.get('/listEstudiantes4', (req, res) => {  //modifcar
    if (req.user) {
        Estudiantes4.find((err, docs) => {  //MODIFICAR
            if(!err){
                res.render("pages/estudiante4/listEstudiantes4", { //modifcar
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
    Estudiantes4.findById(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.render("pages/estudiante4/estudiantes4AddEdit", { //modifcar
                viewTitle: "Editar Estudiante 4°",
                estudiante4: docs //MODIFICAR
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes4.findByIdAndRemove(req.params.id, (err, docs) => {  //MODIFICAR
        if(!err){
            res.redirect("/estudiantes4/listEstudiantes4"); //modificar
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;