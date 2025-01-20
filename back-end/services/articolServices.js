import Article from "../models/articolModel.js";
import Review from "../models/reviewModel.js";



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

const getReviewsByAuthorId = async (authorId) => {
    try {
      // Găsește toate articolele scrise de autor
      const articles = await Article.findAll({
        where: { authorId },
        attributes: ['id', 'title'], // Preia `id` și `title`
      });
  
      if (!articles || articles.length === 0) {
        console.log(`No articles found for author with id ${authorId}`);
        return []; // Dacă autorul nu are articole
      }
  
      // Extrage `articleId` din articolele găsite
      const articleIds = articles.map((article) => article.id);
      console.log(`Articles written by author ${authorId}:`, articleIds);
  
      // Găsește toate recenziile asociate articolelor găsite
      const reviews = await Review.findAll({
        where: { articleId: articleIds },
        attributes: ['id', 'articleId', 'reviewerId', 'comment', 'status'], // Doar coloane valide
      });
  
      if (!reviews || reviews.length === 0) {
        console.log(`No reviews found for articles by author ${authorId}`);
        return []; // Dacă nu există recenzii pentru articolele autorului
      }
  
      console.log(`Found reviews for articles by author ${authorId}:`, reviews);
  
      // Adaugă detalii despre recenzori și articole
      const reviewsWithDetails = await Promise.all(
        reviews.map(async (review) => {
          // Găsește detalii despre articol
          const article = articles.find((art) => art.id === review.articleId);
  
          return {
            reviewId: review.id,
            articleId: review.articleId,
            articleTitle: article ? article.title : "Unknown Article",
            reviewerId: review.reviewerId,
            comment: review.comment,
            status: review.status,
          };
        })
      );
  
      console.log("Final reviews with details:", reviewsWithDetails);
  
      return reviewsWithDetails;
    } catch (error) {
      console.error(
        `Error fetching reviews for articles by author ${authorId}:`,
        error.message
      );
      throw new Error(
        `Error fetching reviews for articles by author ${authorId}: ${error.message}`
      );
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
    getReviewsByAuthorId
};