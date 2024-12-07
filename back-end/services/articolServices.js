import Article from "../models/articolModel.js";

const getArticles= async()=>{
    return await Article.findAll();
};

const search=async( conferenceId)=>{
    return await Article.findAll({where : { conferenceId }});
};

const createArticle= async({title,description,conferenceId,authorId,status,version})=>{
    try{
        const newArticle= await Article.create({
            title,
            description,
            conferenceId,
            authorId,
            status,
            version
        });
        return newArticle;
    }catch(error){
        throw new Error(error.message);
    }
}

export {
    getArticles,
    search,
    createArticle
};