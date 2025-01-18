import confManagement from "../models/confManagement.js";

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

export {
  createConfManagement,
  getAllConfManagements,
  getConfManagementById,
  updateConfManagement,
  deleteConfManagement,
  getStatusByAuthorId 
};
