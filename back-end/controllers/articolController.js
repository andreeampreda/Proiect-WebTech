import * as articleService from '../services/articolServices.js';

const getArticles= async (req,res)=>{
    try{
        const articles= await articleService.getArticles();
        res.send({articles});
    }catch(error){
        res.status(500).send({ message: "Error fetching articles", error: error.message });
    }
};

const searchByConference=async(req,res)=>{
    try{
        const {id} = req.params;
        const identifiedArt=await articleService.searchByConference(id);

        if (identifiedArt && identifiedArt.length > 0) {
            res.send({ articles: identifiedArt });
        }
        else
            res.status(400).send("0 articles found :(");
    }       
    catch(error){
        res.status(500).send({ message: "Error fetching articles", error: error.message });
    }
};

const createArticle=(req,res)=>{
    try{
        const {title,description,conferenceId,authorId,status,version}=req.body;
        if(!title || !conferenceId || !authorId){
            return res.status(400).send(" Titlul, conferinta si autorul sunt necesare!");
        }

        const newArticle=articleService.createArticle({title,description,conferenceId,authorId,status,version});
        res.status(201).send("Articolul s-a creat cu succes!");
    }catch(error){
        res.status(500).send("Error creating article");
    
    }
};

const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;  
        const updatedData = req.body;  
        if (!id || !updatedData) {
            return res.status(400).send({ message: "ID-ul și datele actualizate sunt necesare" });
        }
    
        const updatedArticle = await articleService.updateArticle(id, updatedData);
        
        if (updatedArticle) {
            res.send({ message: "Articol actualizat cu succes", article: updatedArticle });
        } else {
            res.status(404).send({ message: "Articolul nu a fost găsit" });
        }
    } catch (error) {
        res.status(500).send({ message: "Eroare la actualizarea articolului", error: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;  
        if (!id) {
            return res.status(400).send({ message: "ID-ul articolului este necesar" });
        }
  
        const isDeleted = await articleService.deleteArticle(id);
      
        if (isDeleted) {
            res.send({ message: "Articol șters cu succes" });
        } else {
            res.status(404).send({ message: "Articolul nu a fost găsit" });
        }
    } catch (error) {
      res.status(500).send({ message: "Eroare la ștergerea articolului", error: error.message });
    }
};

export {
    getArticles,
    searchByConference,
    createArticle,
    updateArticle,
    deleteArticle
};