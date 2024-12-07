import { db } from "./config.js";
import { DataTypes } from "sequelize";

const Article = db.define('Article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    conferenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'needs revision', 'rejected'),
        defaultValue: 'pending',
    },
    version: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
});

export default Article;
