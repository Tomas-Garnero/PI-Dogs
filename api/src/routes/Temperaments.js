const { Router } = require('express');
const router = Router();
const { Temperaments } = require("../db.js");
const { getTemperaments } = require("../Controllers/Temperaments.js");

router.get("/", async (req, res) => {
    try {
        await getTemperaments();

        const allTemperaments = await Temperaments.findAll();
        // const filteredTemperaments = await allTemperaments.map(obj => obj.name);

        if (allTemperaments) {
            res.status(200).send(allTemperaments)
        } else {
            res.status(404).send("Temperamento no encontrado")
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


module.exports = router;