import * as MoviesController from "../controllers/movies_controller"
import express from "express";

const router = express.Router();

router.get("/", MoviesController.index);
router.get("/:id", MoviesController.show)
router.post("/", MoviesController.upload, MoviesController.create);
router.patch("/:id", MoviesController.upload, MoviesController.update);
router.delete("/:id", MoviesController.destroy);
router.get("/gender/:id", MoviesController.filterByGender);
router.get("/actor/:id", MoviesController.filterByActor);
router.post("/actors/:id", MoviesController.addActors);

export default router;