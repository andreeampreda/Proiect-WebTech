import { DataTypes } from 'sequelize';
import sequelize from './config.js'; 

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'), 
        defaultValue: 'pending',  
        allowNull: false,
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'Users',  
            key: 'id',
        },
    },
    reviewer1Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',  
            key: 'id',
        },
    },
    reviewer2Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',  
            key: 'id',
        },
    },
});

export default Article;
