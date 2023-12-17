import * as MoviesController from "../controllers/movies_controller"
import express from "express";

const router = express.Router();

router.get("/", MoviesController.index);
router.get("/:id", MoviesController.show)
router.post("/", MoviesController.upload, MoviesController.create);
router.patch("/:id", MoviesController.upload, MoviesController.update);
router.delete("/:id", MoviesController.destroy);
router.post("/addActorToMovie", MoviesController.addActorToMovie);
router.get("/gender/:id", MoviesController.filterByGender);
router.get("/actor/:id", MoviesController.filterByActor);

export default router;