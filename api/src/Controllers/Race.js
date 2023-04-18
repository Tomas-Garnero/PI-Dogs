const axios = require("axios");

const { Race, Temperament } = require("../db.js");

const {API_KEY} = process.env;


const getApiInfo = async () => {
    try {
        let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?breeds?limit=10&page=0&api_key=${API_KEY}`);
        // 
        let apiInfo = await apiUrl.data.map(dog => {
            const {id, name, image, temperament} = dog;
            let weightMin_Max = [];

            dog.weight.metric.split("-")?.forEach(element => {
                weightMin_Max.push(parseInt(element.trim()));
            });

            if (weightMin_Max[1] === weightMin_Max[0]) {
                weightMin_Max.shift(weightMin_Max);
            }

            return {
                id,
                name,
                weight: weightMin_Max,
                image: image.url,
                temperament,
            };
        });

        return apiInfo;

    } catch (error) {
        console.log(error);
    }
};

const getDBInfo = async () => {
    try {
        let dogDB = await Race.findAll({
            include: {
                // Incluime el modelo temperament
                model: Temperament,
                // Y de este modelo traeme los siguientes atributos
                attributes: ["name"],
                // Mediante los atributos
                through: {
                    attributes: []
                }
            }
        });

        let dogInfo = await dogDB.map(dog => {
            const {id, name, image, createdAtDb } = dog;
            let weightMin_Max = [];

            dog.weight.split("-")?.forEach(element => {
                weightMin_Max.push(parseInt(element.trim()));
            });
            if (!weightMin_Max[1]) {
                weightMin_Max.push(weightMin_Max[0]);
            }

            return {
                id,
                name,
                weight: weightMin_Max,
                image,
                temperament: dog.Temperaments?.reduce((prev, curr) => {
                    prev += curr.name + ", ";
                    return prev;
                }, ""),
                createdAtDb
            };
        });

        return dogInfo;

    } catch (error) {
        console.log(error);
    }
};

const getAllDogs = async () => {
    try {
        let apiInfo = await getApiInfo();
        let dbInfo = await getDBInfo();
        let allInfo = apiInfo.concat(dbInfo);

        return allInfo;

    } catch (error) {
        console.log(error);
    }
};

const getDetailsApiInfo = async () => {
    try {
        let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?limit=5&page=0?api_key=${API_KEY}`);

        let apiInfo = await apiUrl.data.map(dog => {
            const { id, name, image, temperament } = dog;

            let weightMin_Max = [];

            dog.weight.metric.split("-")?.forEach(element => {
                weightMin_Max.push(parseInt(element.trim()));
            });

            if (weightMin_Max[1] === weightMin_Max[0]) {
                weightMin_Max.shift(weightMin_Max);
            }

            let heightMin_Max = [];

            dog.height.metric.split("-")?.forEach(element => {
                heightMin_Max.push(parseInt(element.trim()));
            });

            if (heightMin_Max[1] === heightMin_Max[0]) {
                heightMin_Max.shift(heightMin_Max);
            }

            let life = [];

            dog.life_span.split("-")?.forEach((element) => {
            life.push(parseInt(element.trim()));
            });

            if (life[1] === life[0]) {
                life.shift(life);
            }

            return {
                id,
                name,
                height: heightMin_Max,
                weight: weightMin_Max,
                life_span: life,
                image: image.url,
                temperament
            };
        });

        return apiInfo;

    } catch (error) {
        console.log(error);
    }
};

const getDetailsDBInfo = async () => {
    try {
        let dogDB = await Race.findAll({
            include: {
                // Incluime el modelo temperament
                model: Temperament,
                // Y de este modelo traeme los siguientes atributos
                attributes: ["name"],
                // Mediante los atributos
                through: {
                    attributes: []
                }
            }
        });

        let dogInfo = await dogDB.map(dog => {
            const { id, name, image, createdAtDb } = dog;
            let weightMin_Max = [];

            dog.weight.split("-")?.forEach(element => {
                weightMin_Max.push(parseInt(element.trim()));
            });

            if (weightMin_Max[1] === weightMin_Max[0]) {
                weightMin_Max.shift(weightMin_Max);
            }

            let heightMin_Max = [];

            dog.height.split("-")?.forEach(element => {
                heightMin_Max.push(parseInt(element.trim()));
            });

            if (heightMin_Max[1] === heightMin_Max[0]) {
                heightMin_Max.shift(heightMin_Max);
            }

            let life = [];

            dog.life_span.split("-")?.forEach((element) => {
            life.push(parseInt(element.trim()));
            });

            if (life[1] === life[0]) {
                life.shift(life);
            }

            return {
                id,
                name,
                height: heightMin_Max,
                weight: weightMin_Max,
                life_span: life,
                image,
                temperament: dog.Temperaments?.reduce((prev, curr) => {
                    prev += curr.name + ", ";
                    return prev;
                }, ""),
                createdAtDb
            };
        });

        return dogInfo;

    } catch (error) {
        console.log(error);
    }
};

const getDetailsDogs = async () => {
    try {
        let apiInfo = await getDetailsApiInfo();
        let dbInfo = await getDetailsDBInfo();
        let allInfo = apiInfo.concat(dbInfo);

        return allInfo;

    } catch (error) {
        console.log(error);
    }
};


module.exports = { getAllDogs, getDetailsDogs };
