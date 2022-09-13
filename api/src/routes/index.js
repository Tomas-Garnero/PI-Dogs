const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dog = require("./Race.js");
const temperament = require("./Temperaments.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dog);
router.use("/temperaments", temperament)


module.exports = router;

