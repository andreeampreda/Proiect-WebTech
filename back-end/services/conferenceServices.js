import Conference from "../models/conferenceModel.js";
import Article from "../models/articolModel.js";
import Review from "../models/reviewModel.js";
import { Op } from 'sequelize';

const getConferences= async()=>{
    return await Conference.findAll();
};

const search = async (name) => {
    const words=name.split(" ");

    const searchConditions = words.map(word => ({
        name: {
            [Op.like]: `%${word}%`  
        }
    }));

    return await Conference.findAll({
        where: {
            [Op.and]: searchConditions 
        }
    });
};

const getConferencesByOrganizerId = async (organizerId) => {
    return await Conference.findAll({
        where: {
            organizerId: organizerId
        }
    });
};

const getConferencesByReviewer = async (reviewerId) => {
   
    const articles=await Review.findAll({
        where: { reviewerId },
        attributes: ['articleId'], 
    });

    let conferencesIds=[];

    console.log("articole:",articles);
    for(let article of articles){

        console.log(article.dataValues.articleId);

        const articleId=article.dataValues.articleId;

        const articleData = await Article.findOne({
            where: { id: articleId }, 
            attributes: ['conferenceId'],
        });
        
        if (articleData) {
            conferencesIds.push(articleData.conferenceId); 
        }     
    }

    const uniqueIds = conferencesIds.filter((value, index, self) => self.indexOf(value) === index);

    console.log(conferencesIds);

    let conferences=[];

    console.log("id uri:",conferencesIds);

    for(let conferenceId of uniqueIds){
        const conferenceData=await Conference.findOne({
            where: { id: conferenceId }, 
        })

        console.log("conferinta:",conferenceData);
        if(conferenceData){
            conferences.push(conferenceData);
        }
    }

    return conferences;
};

const getConferencesByName= async (confName) => {
    return await Conference.findAll({
        where: {
            name: confName
        }
    });
};

const createConference= async({name,location,date,organizerId})=>{
    try{
        const newConference= await Conference.create({
            name,
            location,
            date,
            organizerId
        });
        return newConference;
    }catch(error){
        throw new Error(error.message);
    }
}

const updateConference= async (conferenceId, updatedData) => {
    const updatedConference= await Conference.update(updatedData, {
        where: { id: conferenceId },
        returning: true,
        plain: true
    });
    
    return updatedConference[1]; 
}

const deleteConference= async (conferenceId) => {
    const deletedCount = await Conference.destroy({
        where: { id: conferenceId }
    });
    return deletedCount > 0;
}

export {
    getConferences,
    search,
    createConference,
    updateConference,
    deleteConference,
    getConferencesByOrganizerId,
    getConferencesByName,
    getConferencesByReviewer
};