import Article from "../models/articolModel.js";

const getArticles= async()=>{
    return await Article.findAll();
};

const searchByConference=async(conferenceId)=>{
    return await Article.findAll({
        where : { 
            conferenceId : conferenceId 
        }
    });
};

const searchByAuthor=async(authorId)=>{
    return await Article.findAll({
        where : { 
            authorId : authorId
        }
    });
};

const getById=async(articleId)=>{
    return await Article.findOne({
        where : { 
            id : articleId
        }
    });
};

const createArticle= async({title,description,content, conferenceId,authorId,status,version})=>{
    try{
        const newArticle= await Article.create({
            title,
            description,
            content,
            conferenceId,
            authorId,
            status,
            version
        });
        console.log("New article created:", newArticle);
        return newArticle;
    }catch(error){
        throw new Error(error.message);
    }
}

const updateArticle= async (articleId, updatedData) => {

    // find current article in order to increment its version 
    const article = await Article.findByPk(articleId);

    if (!article) {
      throw new Error(`Article with ID ${articleId} not found.`);
    }

    const incrementedVersion = article.version + 1;

    const updatedArticle = await Article.update({...updatedData, version: incrementedVersion}, {
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
    getById,
    searchByConference,
    searchByAuthor,
    createArticle, 
    updateArticle,
    deleteArticle
};