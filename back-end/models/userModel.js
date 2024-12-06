import { db } from "./config.js"; 
import { DataTypes } from "sequelize";

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('organizer', 'reviewer', 'author'),
        allowNull: false,
        defaultValue: 'author'
    }
});

export default User;
