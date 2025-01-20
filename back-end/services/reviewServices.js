import Review from "../models/reviewModel.js";


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


  

  
export{
    getReviewsForArticle,
    updateReview,
    deleteReview,
    search,
    createReview, 
    getAllReviews,
 
};