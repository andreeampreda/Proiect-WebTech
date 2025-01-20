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

<<<<<<< HEAD
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

=======
const getPendingArticlesForReviewer = async (reviewerId) => {
    try {
      const reviews = await Review.findAll({
        where: {
          reviewerId,
          status: "pending",
        },
        include: [
          {
            model: Article, 
            attributes: ["id", "title", "description", "content"], 
          },
        ],
      });
  
      return reviews.map((review) => ({
        reviewId: review.id,
        articleId: review.articleId,
        articleTitle: review.Article?.title,
        articleDescription: review.Article?.description,
        articleContent: review.Article?.content,
      }));
    } catch (error) {
      console.error("Error fetching pending articles for reviewer:", error);
      throw new Error("Failed to fetch pending articles.");
    }
  };
>>>>>>> d2ae886a3a618566da852e60e66c80ca6221ea92
  

  
export{
    getReviewsForArticle,
    updateReview,
    deleteReview,
    search,
    createReview, 
    getAllReviews,
<<<<<<< HEAD
    getReviewStatus
=======
    getPendingArticlesForReviewer,
 
>>>>>>> d2ae886a3a618566da852e60e66c80ca6221ea92
};