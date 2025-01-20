import { db } from "./config.js";
import { DataTypes } from "sequelize";


const Review = db.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
         onDelete: "CASCADE",
    },
    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
    },
});

export default Review;
