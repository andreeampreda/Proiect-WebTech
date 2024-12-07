import { db } from './models/config.js';
import User from './models/userModel.js';
import Conference from './models/conferenceModel.js';
import Article from './models/articolModel.js';
import Review from './models/reviewModel.js';

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

const syncDatabase = async () => {
    try {
        await db.sync({ force: true }); 
        console.log("Database synchronized!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

syncDatabase();
