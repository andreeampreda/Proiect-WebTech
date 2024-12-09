import * as reviewService from '../services/reviewServices.js'

const search= async(req,res)=>{

    try{
        const rewiev= await reviewService.search(req.query.status);
        if(rewiev)
            res.send({rewiev});
        else
            res.status(400).send("0 reviews found");

    }catch(error){
        res.status(500).send({ message: "Error fetching review", error: error.message });
    }

};

const getReviewsForArticle=async(req,res)=>{
    try{
        const reviewIdentified=await reviewService.getReviewsForArticle(req.params.id)
        if (reviewIdentified) {
            res.send({ review: reviewIdentified});
        } else {
            res.status(404).send({ message: "Review not found" });
        }
    }catch(error){
        res.status(500).send({ message: "Error fetching review", error: error.message });
    }
};

export{
    search,
    getReviewsForArticle
};