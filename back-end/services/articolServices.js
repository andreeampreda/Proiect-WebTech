import Article from "../models/articolModel.js";

const getArticles= async()=>{
    return await Article.findAll();
};

const searchByConference=async(conferenceId)=>{
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

const updateArticle= async (articleId, updatedData) => {
    const updatedArticle = await Article.update(updatedData, {
        where: { id: articleId },
        returning: true,
        plain: true
    });
    
    return updatedArticle[1]; 
}

const deleteArticle= async (articleId) => {
    const deletedCount = await Article.destroy({
        where: { id: articleId }
    });
    return deletedCount > 0;
}


export {
    getArticles,
    searchByConference,
    createArticle, 
    updateArticle,
    deleteArticle
};