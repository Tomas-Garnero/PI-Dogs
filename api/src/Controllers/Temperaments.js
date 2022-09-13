const {API_KEY} = process.env;
const axios = require("axios");
const { Temperaments } = require("../db.js");

const getTemperaments = async () => {
    try {
        let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

        let apiInfo = await apiUrl.data.map(temp => {
            return temp.temperament;
        }).join().split(",");
        // console.log(apiInfo)

        let temps = [];
        apiInfo.map(t => {
            if (!temps.includes(t.trim()) && t) {
                temps.push(t.trim());
            }
        });
        // console.log(temps)

        temps.map(async (d) => {
            await Temperaments.findOrCreate({
                where: {
                    name: d
                }
            });
        });

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getTemperaments
};