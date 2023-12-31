const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
 
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lifespan:{
      type: DataTypes.STRING,
      allowNull: true
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};