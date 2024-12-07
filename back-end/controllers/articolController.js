import * as articleService from '../services/articolServices.js';

const getArticles= async (req,res)=>{
    try{
        const articles= await articleService.getArticles();
        res.send({articles});
    }catch(error){
        res.status(500).send({ message: "Error fetching articles", error: error.message });
    }
};

const search=async(req,res)=>{
    try{
        const identifiedArt=await articleService.search(req.query.conferenceId);

        if(identifiedArt)
            res.send({identifiedArt});
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

export {
    getArticles,
    search,
    createArticle
};