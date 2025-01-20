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
        const { conferenceId } = req.params;
        
        const identifiedArt=await articleService.searchByConference(conferenceId);

        if (identifiedArt && identifiedArt.length > 0) {
            res.send({ identifiedArt });
        }
        else
            res.status(400).send("0 articles found :(");
    }       
    catch(error){
        res.status(500).send({ message: "Error fetching articles", error: error.message });
    }
};

const searchByAuthor=async(req,res)=>{
    try {
        const { authorId } = req.params;

        const identifiedArt = await articleService.searchByAuthor(authorId);

        if (identifiedArt && identifiedArt.length > 0) {
            res.send({ identifiedArt });
        } else {    
            res.status(400).send("0 articles found :(");            
        }
    } catch (error) {
        res.status(500).send({ message: "Error fetching articles", error: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params; 

        const identifiedArt = await articleService.getById(id);

        if (identifiedArt) { 
            res.send({ article: identifiedArt }); 
        } else {    
            res.status(404).send({ message: "Article not found :(" });            
        }
    } catch (error) {
        res.status(500).send({ message: "Error fetching article by ID", error: error.message });
    }
};

const createArticle = async (req, res) => {
    try {
      const { title, description, content, conferenceId, authorId, status, version } = req.body;

      if (!title || !conferenceId || !authorId) {
        return res.status(400).send("Titlul, conferința și autorul sunt necesare!");
      }

      const newArticle = await articleService.createArticle({
        title,
        description,
        content,
        conferenceId,
        authorId,
        status,
        version,
      });
      
      res.status(201).json(newArticle);
    } catch (error) {
      console.error("Error creating article:", error.message);
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

const getAuthorReviews = async (req, res) => {
    const { authorId } = req.params;
    console.log('controller: ',authorId);
    try {
      const reviews = await articleService.getReviewsByAuthorId(authorId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  

export {
    getArticles,
    getById,
    searchByConference,
    searchByAuthor,
    createArticle,
    updateArticle,
    deleteArticle,
    getAuthorReviews
};