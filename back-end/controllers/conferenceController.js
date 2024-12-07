import * as confService from "../services/conferenceServices.js";

const getAllConferences = async (req, res) => {
    try {
        const conferences = await confService.getConferences();
        res.send({ conferences });
    } catch (error) {
        res.status(500).send({ message: "Error fetching controllers", error: error.message });
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

export { 
    getAllConferences,
    search,
    createConference 
};
