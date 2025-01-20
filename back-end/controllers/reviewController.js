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
    console.log(req.params);
    try{
        const {id} = req.params;
        console.log("id", id);
        const reviewIdentified=await reviewService.getReviewsForArticle(id)
        if (reviewIdentified) {
            res.send({ review: reviewIdentified});
        } else {
            res.status(404).send({ message: "Review not found" });
        }
    }catch(error){
        res.status(500).send({ message: "Error fetching review", error: error.message });
    }
};

const createReview = async (req, res) => {
    try {
      const { articleId, reviewerId, comment, status } = req.body;

      console.log("Create review request:", articleId, reviewerId, comment, status);

      if (!articleId || !reviewerId || !comment || !status) {
        return res.status(400).json({
          message: "Trebuiesc completate toate câmpurile!",
        });
      }

      const newReview = await reviewService.createReview({
        articleId,
        reviewerId,
        comment,
        status,
      });
  
      res.status(201).json({
        message: "Review-ul s-a creat cu succes!",
        review: newReview, 
      });
    } catch (error) {
      console.error("Error creating review:", error.message);
  
      res.status(500).json({
        message: "Eroare la crearea review-ului!",
        error: error.message,
      });
    }
  };
  

const getAllReviews = async(req, res)=>{
    try {
        const reviews = await reviewService.getAllReviews();
        res.send({reviews});
    } catch (error) {
        res.status(500).send({ message: "Error fetching reviews", error: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!id || !updatedData) {
            return res.status(400)
            .send({ message: "ID-ul și datele actualizate sunt necesare" });
        }

        const updatedReview = await reviewService.updateReview(id, updatedData);
        if (updatedReview) {
            res.send({ message: "Review actualizat cu succes", review: updatedReview });
        } else {
            res.status(404).send({ message: "Review-ul nu a fost găsit" });
        }
    } catch (error) {
        res.status(500).send({ message: "Eroare la actualizarea review-ului", error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "ID-ul este necesar" });
        }

        const isDeleted = await reviewService.deleteReview(id);
        if (isDeleted) {
            res.send({ message: "Review șters cu succes" });
        } else {
            res.status(404).send({ message: "Review-ul nu a fost găsit" });
        }
    } catch (error) {
        res.status(500).send({ message: "Eroare la ștergerea review-ului", error: error.message });
    }
};



export{
    search,
    getReviewsForArticle,
    createReview, 
    getAllReviews, 
    updateReview, 
    deleteReview
};