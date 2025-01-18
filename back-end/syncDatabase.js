import { db } from './models/config.js';
import User from './models/userModel.js';
import Conference from './models/conferenceModel.js';
import Article from './models/articolModel.js';
import Review from './models/reviewModel.js';
import confManagement from './models/confManagement.js';

User.hasMany(Conference, { foreignKey: 'organizerId' });
Conference.belongsTo(User, { foreignKey: 'organizerId' });

Conference.hasMany(Article, { foreignKey: 'conferenceId' });
Article.belongsTo(Conference, { foreignKey: 'conferenceId' });

User.hasMany(Article, { foreignKey: 'authorId' });
Article.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Review, { foreignKey: 'reviewerId' });
Review.belongsTo(User, { foreignKey: 'reviewerId' });

Article.hasMany(Review, { foreignKey: 'articleId' });
Review.belongsTo(Article, { foreignKey: 'articleId' });

Conference.hasMany(confManagement, { foreignKey: 'confId' });
confManagement.belongsTo(Conference, { foreignKey: 'id' });

User.hasMany(confManagement, { foreignKey: 'authorId' });
confManagement.belongsTo(User, { foreignKey: 'authorId' });

const syncDatabase = async () => {
    try {
        await db.sync({ alter: true }); 
        console.log("Database synchronized!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

syncDatabase();
