import Review from "../models/reviewModel.js";


const getReviewsForArticle = async (articleId) => {
    return await Review.findAll({ where: { articleId } });
};

const updateReview= async (reviewId, updatedData) => {
    const [updatedReview] = await db('reviews').where('id', reviewId).update(updatedData).returning('*');
    return updatedReview;
}

const deleteReview= async (reviewId) => {
    const deletedCount = await db('reviews').where('id', reviewId).del();
    return deletedCount > 0;
}


const search=async(status)=>{

    return await Review.findOne({where:{status}})
};

export{
    getReviewsForArticle,
    updateReview,
    deleteReview,
    search

};