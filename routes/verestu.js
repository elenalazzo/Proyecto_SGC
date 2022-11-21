let express = require('express');
let router = express.Router();
const methods = require('../methods');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('verestu', { title: "Student's Grade Calculator" });
});

//Funcion para visualizar notas
/** @function
 * @name VerNotas */
router.get('/', function(req, res) {
  if (req.user) {
    res.render('verestu', {
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