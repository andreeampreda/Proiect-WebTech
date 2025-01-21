import Review from "../models/reviewModel.js";
import Article from "../models/articolModel.js"; 




const getReviewsForArticle = async (articleId) => {
    return await Review.findAll({ where: { articleId } });
};


const updateReview= async (reviewId, updatedData) => {
    const updatedReview = await Review.update(updatedData, {
        where: { id: reviewId },
        returning: true,
        plain: true
    });
    
    return updatedReview[1]; 
}

const deleteReview= async (reviewId) => {
    const deletedCount = await Review.destroy({
        where: { id: reviewId }
    });
    return deletedCount > 0;
}


const search=async(status)=>{
    return await Review.findOne({where:{status}})
};

const createReview = async({articleId, reviewerId, comment, status})=>{
    try {
        const newReview = await Review.create({
            articleId, 
            reviewerId, 
            comment, 
            status
        });
        return newReview;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllReviews = async()=>{
    return await Review.findAll();
};


const getReviewStatus=async(reviewId)=>{

    const review = await Review.findOne({
        where: { id: reviewId }, 
        attributes: ['status'], 
      });

    if (review) {
        return review.status;
    }
    return null;
}

const getPendingArticlesForReviewer = async (reviewerId) => {
  try {
    // Găsește toate recenziile cu status "pending" pentru reviewer
    const reviewEntries = await Review.findAll({
      where: { reviewerId, status: "pending" },
      attributes: ["id", "articleId", "status"], // Atributele necesare din Review
    });

    if (!reviewEntries || reviewEntries.length === 0) {
      console.log(`No pending reviews found for reviewer with id ${reviewerId}`);
      return []; // Dacă nu există recenzii în pending
    }

    // Extrage ID-urile unice ale articolelor
    const articleIds = [...new Set(reviewEntries.map((entry) => entry.articleId))];
    console.log(`Articles for reviewer ${reviewerId}:`, articleIds);

    // Găsește detalii despre articole
    const articles = await Promise.all(
      articleIds.map((articleId) =>
        Article.findByPk(articleId, {
          attributes: ["id", "title", "description", "content"], // Atributele dorite din Article
        })
      )
    );

    // Filtrează valorile null (articole inexistente)
    const filteredArticles = articles.filter((article) => article !== null);
    console.log(`Final articles for reviewer ${reviewerId}:`, filteredArticles);

    // Mapează recenziile la detaliile articolelor
    const reviewsWithArticles = reviewEntries.map((review) => {
      const article = filteredArticles.find((art) => art.id === review.articleId);
      return {
        reviewId: review.id,
        articleId: review.articleId,

        articleTitle: article ? article.title : "Unknown",
        articleDescription: article ? article.description : "Unknown",
        articleContent: article ? article.content : "Unknown",
        status: review.status,
      };
    });

    console.log("Mapped reviews with articles:", reviewsWithArticles);

    return reviewsWithArticles;
  } catch (error) {
    console.error(`Error fetching pending articles for reviewer ${reviewerId}:`, error.message);
    throw new Error(`Failed to fetch pending articles for reviewer ${reviewerId}: ${error.message}`);
  }
};

  

  
export{
    getReviewsForArticle,
    updateReview,
    deleteReview,
    search,
    createReview, 
    getAllReviews,
    getReviewStatus,
    getPendingArticlesForReviewer,
 
};