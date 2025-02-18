import express from 'express';
import * as userController from "../controllers/userController.js";

export const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/authors", userController.getAllAuthors);
router.get("/organizers", userController.getAllOrganizers);
router.get("/authors", userController.getAllAuthors);
router.get("/reviewers", userController.getAllReviewers);
router.get("/random", userController.getRandomUser);
router.get("/search", userController.search);
router.get("/:id", userController.getById);

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
