import confManagement from "../models/confManagement.js";
import Conference from "../models/conferenceModel.js";
import User from "../models/userModel.js";


const createConfManagement = async ({confId, authorId, status}) => {
    try {

        console.log("Creating new conference with confId:", confId, "and authorId:", authorId);

        const newConference = await confManagement.create({
          confId,
          authorId,
          status
        });

        return newConference;
      } catch (error) {
        throw new Error(`Error creating conference: ${error.message}`);
      }
};

const getReviewersByConfId = async (confId) => {
  try {
    const reviewerEntries = await confManagement.findAll({
      where: {
        confId,
        status: "reviewer",
      },
    });

    console.log(`Found reviewers for confId ${confId}:`, reviewerEntries);

    return reviewerEntries;
  } catch (error) {
    console.error(`Error fetching reviewers for confId ${confId}:`, error);
    throw new Error(`Failed to fetch reviewers for confId ${confId}.`);
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
          attributes: ['id', 'name', 'location', 'date', 'organizerId'], 
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

const getAuthorsByConferenceId = async (confId) => {
  try {
    // Găsește toate intrările din confManagement pentru conferința specificată
    const confManagementEntries = await confManagement.findAll({
      where: { confId },
      attributes: ['authorId', 'status'],
    });

    if (!confManagementEntries || confManagementEntries.length === 0) {
      console.log(`No authors found for conference with id ${confId}`);
      return []; // Dacă nu există autori pentru conferință
    }

    // Extrage ID-urile unice ale autorilor
    const authorIds = [...new Set(confManagementEntries.map((entry) => entry.authorId))];
    console.log(`Authors for conference ${confId}:`, authorIds);

    // Găsește detalii despre autori
    const authors = await Promise.all(
      authorIds.map((authorId) =>
        User.findByPk(authorId, {
          attributes: ['id', 'firstName', 'lastName',], // Adaptează atributele dorite
        })
      )
    );

    // Filtrează valorile null
    const filteredAuthors = authors.filter((author) => author !== null);
    console.log(`Final authors for conference ${confId}:`, filteredAuthors);

    return filteredAuthors;
  } catch (error) {
    console.error(`Error fetching authors for conference ${confId}:`, error.message);
    throw new Error(`Error fetching authors for conference ${confId}: ${error.message}`);
  }
};

const updateStatus = async (authorId, conferenceId, status) => {
  if (!authorId || !conferenceId || !status) {
    throw new Error("Missing required fields.");
  }

  const updated = await confManagement.update(
    { status },
    {
      where: {
        authorId,
        confId: conferenceId,
      },
    }
  );

  return updated;
};




export {
  createConfManagement,
  getAllConfManagements,
  getConfManagementById,
  updateConfManagement,
  deleteConfManagement,
  getStatusByAuthorId,
  getConferencesByAuthorId, 
  getReviewersByConfId,
  getAuthorsByConferenceId,
  updateStatus
};
