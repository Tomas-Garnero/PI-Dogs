const { Router } = require('express');

const { Race } = require("../db.js");
const { getAllDogs, getDetailsDogs } = require("../Controllers/Race.js");

const router = Router();

router.get("/", async (req, res) => {
    const {name} = req.query;

    try {
        const allDogs = await getAllDogs();

        if (name) {
            let dogName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLocaleLowerCase()));
            dogName.length 
                ? res.status(200).send(dogName) 
                : res.status(404).send({msg: "La raza especificada no se encuentra!!"});
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
            dogId.length 
                ? res.status(200).send(dogId) 
                : res.status(404).send({msg: "El ID especificado no existe!!"});
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
            name,
            height,
            weight,
            life_span: life_span,
            image: image ? image : "https://i.pinimg.com/originals/5e/f4/19/5ef419dd37c578ccf4a09a0be10e2977.jpg"
        });
        
        await newRaceDog.addTemperament(temperament);

        res.status(201).send(newRaceDog);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/delete/:id", async (req, res) => {
    if (!req.params.id) return res.status(400).send({ err: "Bad Request"});

    try {
        const raceDel = await Race.destroy({where:{id: req.params.id}});

        if (!raceDel) return res.status(404).send({ err: "Not Found"});

        return res.status(200).send({msg: "Dogs was eliminated"});

    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put("/update/:id", async (req, res) => {
    if (!req.params.id) return res.status(400).send({ err: "Bad Request"});

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

    if (!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !minLife || !maxLife || !image || !temperament) return res.status(400).send({ err: "Bad Request"});

    let height = minHeight + " - " + maxHeight;
    let weight = minWeight + " - " + maxWeight;
    let life_span = minLife + " - " + maxLife;

    let dogObj = {
        name, 
        height, 
        weight, 
        life_span, 
        image
    }

    try {
        const dogForUpdate = await Race.findOne({where: {id: req.params.id}});
        if (!dogForUpdate) return req.status(400).send({ err: "Not Found"});
        await dogForUpdate.update(dogObj);
        await dogForUpdate.setTemperaments(temperament);

        return res.send(dogForUpdate);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;

