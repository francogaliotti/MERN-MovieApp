import * as ActorController from "../controllers/actors_controller"
import express from "express";

const router = express.Router();

router.get("/", ActorController.index);
router.get("/:id", ActorController.show)
router.post("/", ActorController.upload, ActorController.create);
router.patch("/:id", ActorController.upload, ActorController.update);
router.delete("/:id", ActorController.destroy);
router.get("/movie/:id", ActorController.filterByMovie);
router.post("/movies/:id", ActorController.addMovies);

export default router;