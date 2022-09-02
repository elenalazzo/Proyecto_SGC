var express = require('express');
var router = express.Router();
const methods = require('../methods');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('vernota', { title: "Student's Grade Calculator" });
});

// registro de rutas
router.get('/', function(req, res) {
  if (req.user) {
    res.render('vernota', {
      userName: req.user.fullName 
    });
  } else {
    res.render(loginPage, {
      message: "Por favor, inicie sesion para continuar",
      messageClass: "alert-danger"
    });
  }
});


module.exports = router;