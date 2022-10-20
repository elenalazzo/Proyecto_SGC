// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

//llamado al modelo
const Estudiantes2 = require('../models/estudiantes2'); //modificar

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante2/estudiantes2AddEdit", { //modificar
            viewTitle: "Nuevo Estudiante 2"
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
        newEstudiante2(req, res);
    }else{
        updateEstudiante2(req, res);
    }
    
});

//metodo para registrar
function newEstudiante2(req, res) {
    let estudiante2 = new Estudiantes2(); //MODIFICAR
    estudiante2.Nombres = req.body.Nombres;
    estudiante2.Apellidos = req.body.Apellidos;
    estudiante2.Grado = req.body.Grado;
    estudiante2.Seccion = req.body.Seccion;
    estudiante2.save((err) => {
        if(!err){
            res.redirect("estudiantes2/listEstudiantes2"); //MODIFICAR
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEstudiante2(req, res) {  //MODIFICAR
    Estudiantes2.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("estudiantes2/listEstudiantes2"); //modificar
        } else {
            res.render("pages/estudiantes2/estudiantes2AddEdit", { //modificar
                viewTitle: "Editar Estudiante ", 
                estudiante2: req.body   //MODIFICAR
            })
        }
    });
}

router.get('/listEstudiantes2', (req, res) => {  //modifcar
    if (req.user) {
        Estudiantes2.find((err, docs) => {    //MODIFICAR
            if(!err){
                res.render("pages/estudiante2/listEstudiantes2", { //modifcar
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
    Estudiantes2.findById(req.params.id, (err, docs) => {   //MODIFICAR
        if(!err){
            res.render("pages/estudiante2/estudiantes2AddEdit", { //modifcar
                viewTitle: "Editar Estudiante 2°",
                estudiante2: docs     //MODIFICAR
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Estudiantes2.findByIdAndRemove(req.params.id, (err, docs) => { //MODIFICAR
        if(!err){
            res.redirect("/estudiantes2/listEstudiantes2"); //modificar
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;