import Conference from "../models/conferenceModel.js";
import confManagement from "../models/confManagement.js";
import User from "../models/userModel.js";
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

const getPendingAuthorsByOrganizerId = async (organizerId) => {
    if (!organizerId) {
        throw new Error("Organizer ID is required");
    }

    try {
        // Obține conferințele organizatorului
        const conferences = await getConferencesByOrganizerId(organizerId);

        if (!conferences || conferences.length === 0) {
            return [];
        }

        const confIds = conferences.map((conference) => conference.id);
        console.log("Found conference IDs:", confIds);

        // Obține autorii în pending și sortează după createdAt descrescător
        const confManagementEntries = await confManagement.findAll({
            where: { confId: confIds, status: "pending" },
            attributes: ["authorId", "confId", "createdAt"], // Include createdAt pentru sortare
            order: [["createdAt", "DESC"]], // Sortare descrescătoare
        });

        if (!confManagementEntries || confManagementEntries.length === 0) {
            return [];
        }

        const authorIds = confManagementEntries.map((entry) => entry.authorId);
        console.log("Found author IDs with pending status:", authorIds);

        // Obține detalii despre autori
        const authors = await Promise.all(
            authorIds.map((authorId) =>
                User.findByPk(authorId, {
                    attributes: ["id", "firstName", "lastName"],
                })
            )
        );

        const authorsWithConference = confManagementEntries.map((entry) => {
            const author = authors.find((auth) => auth.id === entry.authorId);
            const conference = conferences.find((conf) => conf.id === entry.confId);

            return {
                author: {
                    id: author.id,
                    firstName: author.firstName,
                    lastName: author.lastName,
                },
                conference: {
                    id: conference.id,
                    name: conference.name,
                    location: conference.location,
                    date: conference.date,
                },
                createdAt: entry.createdAt, // Adaugă createdAt pentru context suplimentar
            };
        });

        console.log("Pending authors with conferences:", authorsWithConference);

        return authorsWithConference.filter(
            (item) => item.author !== null && item.conference !== null
        );
    } catch (error) {
        console.error("Error fetching pending authors by organizerId:", error.message);
        throw error;
    }
};



export {
    getConferences,
    search,
    createConference,
    updateConference,
    deleteConference,
    getConferencesByOrganizerId,
    getConferencesByName,
    getPendingAuthorsByOrganizerId
};