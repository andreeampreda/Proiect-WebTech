import confManagement from "../models/confManagement.js";
import User from '../models/userModel.js'; 
import { Op } from "sequelize";

const createConfManagement = async ({confId, authorId, status}) => {
    try {

        console.log("Creating new conference with confId:", confId, "and authorId:", authorId);

        const newConference = await confManagement.create({
          confId,
          authorId,
          status
        });

        console.log("New conference created:", newConference);

        return newConference;
      } catch (error) {
        throw new Error(`Error creating conference: ${error.message}`);
      }
};


const getAllConfManagements = async () => {
  try {
    const allConfManagements = await confManagement.findAll();
    return allConfManagements;
  } catch (error) {
    throw new Error(`Error fetching ConferenceManagement entries: ${error.message}`);
  }
};

const getConfManagementById = async (confId) => {
  try {
    const confManagementEntry = await confManagement.findByPk(confId);
    if (!confManagementEntry) {
      throw new Error("ConferenceManagement entry not found");
    }
    return confManagementEntry;
  } catch (error) {
    throw new Error(`Error fetching ConferenceManagement entry: ${error.message}`);
  }
};

const updateConfManagement = async (confId, data) => {
  try {
    const confManagementEntry = await confManagement.findByPk(confId);
    if (!confManagementEntry) {
      throw new Error("ConferenceManagement entry not found");
    }
    await confManagementEntry.update(data);
    return confManagementEntry;
  } catch (error) {
    throw new Error(`Error updating ConferenceManagement entry: ${error.message}`);
  }
};

const deleteConfManagement = async (confId) => {
  try {
    const confManagementEntry = await confManagement.findByPk(confId);
    if (!confManagementEntry) {
      throw new Error("ConferenceManagement entry not found");
    }
    await confManagementEntry.destroy();
    return { message: "ConferenceManagement entry deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting ConferenceManagement entry: ${error.message}`);
  }
};

const getStatusByAuthorId = async (authorId) => {
    try {
      const statusEntries = await confManagement.findAll({
        where: { authorId },
      });
      return statusEntries;
    } catch (error) {
      throw new Error(`Error fetching status for authorId ${authorId}: ${error.message}`);
    }
};

const getPendingAuthorsByConference = async (confId) => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Obține înregistrările confManagement
    const confManagementEntries = await confManagement.findAll({
      where: {
        confId,
        status: "pending",
        createdAt: { [Op.gt]: oneDayAgo },
      },
      attributes: ["authorId"], // Preia doar authorId
    });

    if (!confManagementEntries || confManagementEntries.length === 0) {
      console.log("No pending authors found for conference:", confId);
      return []; // Dacă nu sunt autori în pending
    }

    // Extrage authorId din înregistrări
    const authorIds = confManagementEntries.map((entry) => entry.authorId);
    console.log("Found authorIds:", authorIds);

    // Găsește autorii după authorId
    const authors = await Promise.all(
      authorIds.map(async (authorId) => {
        const author = await User.findByPk(authorId, {
          attributes: ["id", "firstName", "lastName"],
        });
        if (!author) {
          console.warn(`Author with id ${authorId} not found.`);
        }
        return author;
      })
    );

    console.log("Fetched authors:", authors);

    // Filtrează autorii invalizi și creează structura finală
    const pendingAuthors = authors
      .filter((author) => author !== null && author !== undefined) // Filtrează valorile invalide
      .map((author) => ({
        authorId: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
      }));

    return pendingAuthors;
  } catch (error) {
    console.error(`Error fetching pending authors for conference ${confId}:`, error.message);
    throw new Error(`Error fetching pending authors for conference ${confId}: ${error.message}`);
  }
};




export {
  createConfManagement,
  getAllConfManagements,
  getConfManagementById,
  updateConfManagement,
  deleteConfManagement,
  getStatusByAuthorId ,
  getPendingAuthorsByConference,
};
