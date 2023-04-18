const { DataTypes } = require('sequelize');  // Guardamos en DataTypes los tipos de datos que requerimos de sequelize

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Models are defined with sequelize.define('name', {attributes}, {options})
  // Defino el modelo

  sequelize.define('Race', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,  
      allowNull: false,  // Ensures that a column cannot have a NULL value
      unique: true,  // Ensures that all values in a column are different. Can have many per table
      primaryKey: true,  // A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table. Only one per table
    },

    name: {
      type: DataTypes.STRING,  // A variable length string. Default length 255
      allowNull: false
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    life_span: {
      type: DataTypes.STRING,
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "../assets/DogImg.jpg"
    },

    createdAtDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false,  // don't add the timestamp attributes (updatedAt, createdAt)
  });
};
