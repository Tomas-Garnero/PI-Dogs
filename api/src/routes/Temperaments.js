const { Router } = require('express');

const { Temperament } = require("../db.js");
const { getTemperaments } = require("../Controllers/Temperaments.js");

const router = Router();

router.get("/", async (req, res) => {
    try {
        await getTemperaments();

        const allTemperaments = await Temperament.findAll();
        // const filteredTemperaments = await allTemperaments.map(obj => obj.name);

        if (allTemperaments) {
            res.status(200).send(allTemperaments)
        } else {
            res.status(404).send({msg: "Temperamento no encontrado"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


module.exports = router;