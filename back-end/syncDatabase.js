import sequelize from './models/config.js';
import User from './models/userModel.js';
import Conference from './models/conferenceModel.js';
import Article from './models/articolModel.js';

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log("Database synchronized!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

syncDatabase();
