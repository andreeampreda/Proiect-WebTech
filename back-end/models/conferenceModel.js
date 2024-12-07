import { DataTypes } from 'sequelize';
import { db } from "./config.js"; 

const Conference = db.define('Conference', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


export default Conference;
