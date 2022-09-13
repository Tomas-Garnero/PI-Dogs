const {API_KEY} = process.env;
const axios = require("axios");
const { Race, Temperaments } = require("../db.js");

const getApiInfo = async () => {
    try {
        let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

        let apiInfo = await apiUrl.data.map(dog => {

            let weightMin_Max = [];

            dog.weight.metric.split("-")?.forEach(element => {
                weightMin_Max.push(parseInt(element.trim()));
            });

            if (weightMin_Max[1] === weightMin_Max[0]) {
                weightMin_Max.shift(weightMin_Max);
            }
            // console.log(weigthMin_Max)
            
            return {
                id: dog.id,
                name: dog.name,
                weight: weightMin_Max,
                image: dog.image.url,
                temperament: dog.temperament
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
                // Incluime el modelo temperaments
                model: Temperaments,
                // Y de este modelo traeme los siguientes atributos
                attributes: ["name"],
                // Mediante los atributos
                through: {
                    attributes: []
                }
            }
        });
        console.log(dogDB)

        let dogInfo = await dogDB.map(dog => {

            let weightMin_Max = [];
            dog.weight.split("-")?.forEach(element => {
                weightMin_Max.push(parseInt(element.trim()));
            });
            if (!weightMin_Max[1]) {
                weightMin_Max.push(weightMin_Max[0]);
            }

            return {
                id: dog.id,
                name: dog.name,
                weight: weightMin_Max,
                image: dog.image,
                temperament: dog.Temperaments?.reduce((prev, curr) => {
                    prev += curr.name + ",";
                    return prev;
                }, ""),
                createdAtDb: dog.createdAtDb
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
        let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

        let apiInfo = await apiUrl.data.map(dog => {

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
            // console.log("Altura:", heightMin_Max)

            let life = [];

            dog.life_span.split("-")?.forEach((element) => {
            life.push(parseInt(element.trim()));
            });

            if (life[1] === life[0]) {
                life.shift(life);
            }
            // console.log("Vida:", life)

            return {
                id: dog.id,
                name: dog.name,
                height: heightMin_Max,
                weight: weightMin_Max,
                life_span: life,
                image: dog.image.url,
                temperament: dog.temperament
            };
        });
        // console.log(apiInfo)
        return apiInfo;

    } catch (error) {
        console.log(error);
    }
};

const getDetailsDBInfo = async () => {
    try {
        let dogDB = await Race.findAll({
            include: {
                // Incluime el modelo temperaments
                model: Temperaments,
                // Y de este modelo traeme los siguientes atributos
                attributes: ["name"],
                // Mediante los atributos
                through: {
                    attributes: []
                }
            }
        });

        let dogInfo = await dogDB.map(dog => {

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
                id: dog.id,
                name: dog.name,
                height: heightMin_Max,
                weight: weightMin_Max,
                life_span: life,
                image: dog.image,
                temperament: dog.Temperaments?.reduce((prev, curr) => {
                    prev += curr.name + ",";
                    return prev;
                }, ""),
                createdAtDb: dog.createdAtDb,
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


module.exports = {
    getAllDogs,
    getDetailsDogs
};