import Conference from "../models/conferenceModel.js";
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

export {
    getConferences,
    search,
    createConference
};