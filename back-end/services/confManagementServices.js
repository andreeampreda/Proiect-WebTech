import confManagement from "../models/confManagement.js";
import Conference from "../models/conferenceModel.js";

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

const getConferencesByAuthorId = async (authorId) => {
  try {

    const confManagementEntries = await confManagement.findAll({
      where: { authorId },
      attributes: ['confId'], 
    });

    if (!confManagementEntries || confManagementEntries.length === 0) {
      return []; 
    }

    const confIds = confManagementEntries.map((entry) => entry.confId);

    console.log('Found confIds:', confIds);

    const conferences = await Promise.all(
      confIds.map((confId) =>
        Conference.findByPk(confId, {
          attributes: ['id', 'name'], 
        })
      )
    );

    console.log('Fetched conferences:', conferences);

    return conferences.filter((conference) => conference !== null);
  } catch (error) {
    console.error('Error fetching conferences by authorId:', error);
    throw new Error('Failed to fetch conferences.');
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

export {
  createConfManagement,
  getAllConfManagements,
  getConfManagementById,
  updateConfManagement,
  deleteConfManagement,
  getStatusByAuthorId,
  getConferencesByAuthorId
};
