const { DataTypes, Model } = require('sequelize');  // Guardamos en DataTypes los tipos de datos que requerimos de sequelize

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // Models are defined with sequelize.define('name', {attributes}, {options})
    // Defino el modelo

    sequelize.define("Temperaments", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,  // don't add the timestamp attributes (updatedAt, createdAt)
        freezeTableName: true  // disable the modification of table names (into plural)
    });
};