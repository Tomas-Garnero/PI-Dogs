const { Router } = require('express');
const router = Router();
const { Race } = require("../db.js");
const { getAllDogs, getDetailsDogs } = require("../Controllers/Race.js");


router.get("/", async (req, res) => {
    const {name} = req.query;

    try {
        const allDogs = await getAllDogs();

        if (name) {
            let dogName = allDogs.filter(d => d.name.toLowerCase().includes(name.toLocaleLowerCase()));
            dogName.length ?
            res.status(200).send(dogName) : res.status(404).send("La raza especificada no se encuentra !!");
        } else {
            res.status(200).send(allDogs);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        allDogsDetails = await getDetailsDogs();

        if (id) {
            let dogId = await allDogsDetails.filter(dog => dog.id == id);
            dogId.length ?
            res.status(200).send(dogId) : res.status(404).send("El ID especificado no existe !!");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLife,
            maxLife,
            image,
            temperament
        } = req.body;
        
        let height = minHeight + " - " + maxHeight;
        let weight = minWeight + " - " + maxWeight;
        let life_span = minLife + " - " + maxLife;

        const newRaceDog = await Race.create({
            name: name,
            height: height,
            weight: weight,
            life_span: life_span,
            image: image ? image : "https://i.pinimg.com/originals/5e/f4/19/5ef419dd37c578ccf4a09a0be10e2977.jpg"
        });
        
        await newRaceDog.addTemperaments(temperament);
        // await newRaceDog.addTemperaments(temperament);

        res.status(201).send(newRaceDog);
        // res.json(newRaceDog);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


module.exports = router;