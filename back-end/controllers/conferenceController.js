import * as confService from "../services/conferenceServices.js";

const getAllConferences = async (req, res) => {
    try {
        const conferences = await confService.getConferences();
        res.send({ conferences });
    } catch (error) {
        res.status(500).send({ message: "Error fetching controllers", error: error.message });
    }
};

const getConferencesByNameHandler = async (req, res) => {
    try {
        const confName = req.params.name;
        console.log("Request received for conference:", confName); 
        const conferences = await confService.getConferencesByName(confName);
        if (conferences.length === 0) {
            return res.status(404).send({ message: "No conferences found with that name" });
        }
        res.send(conferences);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving conferences", error: error.message });
    }
};


const search = async (req,res)=>{
    try{
        const identifiedConf = await confService.search(req.query.name);

        if (identifiedConf) {
            res.send({ conference : identifiedConf });
        } else {
            res.status(400).send("Nu s-a gasit conferinta");
        }
    }catch(error){
        res.status(500).send({ message: "Error searching for conference", error: error.message });
    }

};

const createConference= async(req,res)=>{
    try{
        const {name,location,date,organizerId}=req.body;
        if(!name || !location || !organizerId){
            return res.status(400).send(" Numele, locatia si organizatorul sunt necesare!");
        }

        const newConference= await confService.createConference({name,location,date,organizerId});
        res.status(201).send("Conferinta s-a creat cu succes!");
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const updateConference = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!id || !updatedData) {
            return res.status(400)
            .send({ message: "ID-ul și datele actualizate sunt necesare" });
        }

        const updatedConference = await confService.updateConference(id, updatedData);
        if (updatedConference) {
            res.send({ message: "Conferinta actualizata cu succes", conference: updatedConference});
        } else {
            res.status(404).send({ message: "Conferinta nu a fost găsit" });
        }
    } catch (error) {
        res.status(500).send({ message: "Eroare la actualizarea conferintei", error: error.message });
    }
};

const deleteConference= async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "ID-ul este necesar" });
        }

        const isDeleted = await confService.deleteConference(id);
        if (isDeleted) {
            res.send({ message: "Conferinta ștearsa cu succes" });
        } else {
            res.status(404).send({ message: "Conferinta nu a fost găsita" });
        }
    } catch (error) {
        res.status(500).send({ message: "Eroare la ștergerea conferintei", error: error.message });
    }
};

const getConferencesByOrganizer = async (req, res) => {
    try {
        const { organizerId } = req.params;

        if (!organizerId) {
            return res.status(400).send({ message: "Organizer ID is required" });
        }

        const conferences = await confService.getConferencesByOrganizerId(organizerId);

        if (conferences && conferences.length > 0) {
            res.status(200).send({ conferences });
        } else {
            res.status(404).send({ message: "No conferences found for this organizer" });
        }
    } catch (error) {
        console.error("Error fetching conferences:", error); 
        res.status(500).send({
            message: "Error fetching conferences by organizer",
            error: error.message 
        });
    }
};

export { 
    getAllConferences,
    search,
    getConferencesByOrganizer,
    createConference,
    updateConference, 
    deleteConference,
    getConferencesByNameHandler
};
