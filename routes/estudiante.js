// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-express');
let router = express.Router();

//llamado al modelo
const Estudiantes = require('../models/estudiantes');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/estudiante/estudiantesAddEdit", {
            viewTitle: "Nuevo Estudiante 1°"
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
        newEstudiante(req, res);
    }else{
        updateEstudiante(req, res);
    }
    
});

//Funcion para Actualizar Estudiantes
/** @function
 * @name ActualizarEstudiantes */
function newEstudiante(req, res) {
    let estudiante = new Estudiantes();
    estudiante.Nombres = req.body.Nombres;
    estudiante.Apellidos = req.body.Apellidos;
    estudiante.Grado = req.body.Grado;
    estudiante.Seccion = req.body.Seccion;
    estudiante.save((err) => {
        if(!err){
            res.redirect("estudiantes/listEstudiantes");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//Funcion para agregar estudiantes
/** @function
 * @name AgregarEstudiantes */
function updateEstudiante(req, res) {
    Estudiantes.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect("estudiantes/listEstudiantes");
        } else {
            res.render("pages/estudiantes/estudiantesAddEdit", {
                viewTitle: "Editar Estudiante",
                estudiante: req.body
            })
        }
    });
}

router.get('/listEstudiantes', (req, res) => {
    if (req.user) {
        Estudiantes.find((err, docs) => {
            if(!err){
                res.render("pages/estudiante/listEstudiantes", {
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
            res.render("pages/estudiante/estudiantesAddEdit", {
                viewTitle: "Editar Estudiante 1°",
                estudiante: docs
            });
        }
    })
})

//Metodo de exportacion a excel
router.get('/', function(req, res, next) {
    Estudiantes.find({}, function(err, estudiante) {
        if (err)
          res.send(err);

        res.render('/estudiante/listEstudiantes', { title: '', estudiante: estudiante });
    });
 });

 router.get('/Excelestudiantes', function(req, res, next) {
    const filename   = "EstudiantesPrimerGrado.csv";
    var dataArray;
    Estudiantes.find().lean().exec({}, function(err, estudiante) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(estudiante, true);
    });
 });


router.get('/delete/:id', (req, res) => {
    Estudiantes.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/estudiantes/listEstudiantes");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
}) 

module.exports = router;