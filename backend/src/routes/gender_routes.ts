import * as GenderController from "../controllers/genders_controller"
import express from "express";

const router = express.Router();

router.get("/", GenderController.index);
router.get("/:id", GenderController.show)
router.post("/", GenderController.create);
router.patch("/:id", GenderController.update);
router.delete("/:id", GenderController.destroy);

export default router;