import { db } from "./config.js"; 
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

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
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('organizer', 'reviewer', 'author'),
        allowNull: false,
        defaultValue: 'author'
    }
},{
    hooks:{
        beforeCreate: async (user) => {
            console.log('Before Create Hook: User Password:', user.password);
            if(user.password){
                const salt=await bcrypt.genSalt(10);
                user.password=await bcrypt.hash(user.password,salt);
                console.log('Hashed Password:', user.password);
            }
        }
    }
});

export default User;
