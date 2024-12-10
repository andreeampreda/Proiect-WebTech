import express from 'express';
import * as userController from "../controllers/userController.js";

export const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/random", userController.getRandomUser);
router.get("/search", userController.search);
router.get("/:id", userController.getById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
