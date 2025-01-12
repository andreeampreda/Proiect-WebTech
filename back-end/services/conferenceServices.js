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

const getConferencesByOrganizerId = async (organizerId) => {
    return await Conference.findAll({
        where: {
            organizerId: organizerId
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
    getConferencesByOrganizerId
};