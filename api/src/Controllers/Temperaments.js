const axios = require("axios");

const { Temperament } = require("../db.js");

const {API_KEY} = process.env;

const getTemperaments = async () => {
    try {
        let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

        let apiInfo = await apiUrl.data.map(temp => {
            return temp.temperament;
        }).join().split(",");

        let temps = [];
        apiInfo.map(t => {
            if (!temps.includes(t.trim()) && t) {
                temps.push(t.trim());
            }
        });

        temps.map(async (d) => {
            await Temperament.findOrCreate({
                where: {
                    name: d
                }
            });
        });

    } catch (error) {
        console.log(error);
    }
};


module.exports = { getTemperaments };