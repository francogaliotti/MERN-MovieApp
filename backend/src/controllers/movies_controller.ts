import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Movie from "../models/movie";
import ActorMovie from "../models/actorMovie";
import Actor from "../models/actor";
import multer from 'multer';
import path from 'path';

export const index: RequestHandler = async (req, res, next) => {
    try {
        const movies = await Movie.find().exec();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}

export const show: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        const movie = await Movie.findById(id).exec();
        if (!movie) {
            throw createHttpError(404, "Movie not found");
        }
        res.status(200).json(movie)
    } catch (error) {
        next(error)
    }
}

interface CreateBody {
    title?: string,
    description?: string,
    genderId?: string,
    release_date?: string
}

export const create: RequestHandler<unknown, unknown, CreateBody, unknown> = async (req, res, next) => {
    const { title, description, genderId, release_date } = req.body;
    let idGender;
    const image = req.file?.path;
    try {
        if (!title) {
            throw createHttpError(400, "Movie must have a title");
        }
        if (genderId && !mongoose.isValidObjectId(genderId)) {
            throw createHttpError(400, "Invalid gender Id")
        }
        if (genderId) {
            idGender = new mongoose.Types.ObjectId(genderId)
        }
        if (!release_date) {
            throw createHttpError(400, "Movie must have a release date");
        }
        const note = await Movie.create({
            title,
            description,
            genderId: idGender,
            release_date: new Date(release_date),
            image
        });
        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
}

interface UpdateParams {
    id: string
}

export const update: RequestHandler = async (req, res, next) => {
    const { title, description, genderId, release_date } = req.body;
    const id = req.params.id;
    const image = req.file?.path;
    let idGender;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        if (!mongoose.isValidObjectId(genderId)) {
            throw createHttpError(400, "Invalid gender Id")
        } else {
            idGender = new mongoose.Types.ObjectId(genderId)
        }
        if (!title) {
            throw createHttpError(400, "Movie must have a title")
        }
        const movie = await Movie.findById(id).exec();
        if (!movie) {
            throw createHttpError(404, "Movie not found");
        }
        if (!release_date) {
            throw createHttpError(400, "Movie must have a release date");
        }

        movie.title = title;
        movie.description = description;
        movie.genderId = idGender;
        movie.release_date = new Date(release_date);
        movie.image = image;

        const newNote = await movie.save();
        res.status(200).json(newNote);
    } catch (error) {
        next(error);
    }
}

export const destroy: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        const movie = await Movie.findById(id).exec();
        if (!movie) {
            throw createHttpError(404, "Movie not found");
        }
        await movie.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

export const filterByGender: RequestHandler = async (req, res, next) => {
    // eslint-disable-next-line prefer-const
    const genderId = req.params.genderId;
    try {
        if (!mongoose.isValidObjectId(req.body.genderId)) {
            throw createHttpError(400, "Invalid category Id")
        }
        const movies = await Movie.find({ genderId: genderId }).exec();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}

export const filterByActor: RequestHandler = async (req, res, next) => {
    // eslint-disable-next-line prefer-const
    const actorId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(actorId)) {
            throw createHttpError(400, "Invalid actor Id")
        }
        const actorMovies = await ActorMovie.find({ actorId }).exec();
        const movies = [];
        for (const actorMovie of actorMovies) {
            const actor = await Movie.findById(actorMovie.movieId).exec();
            if (actor) {
                movies.push(actor);
            }
        }
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }

}

interface AddActorBody {
    actorId: string
}

export const addActorToMovie: RequestHandler<UpdateParams, unknown, AddActorBody, unknown> = async (req, res, next) => {
    const id = req.params.id;
    const { actorId } = req.body;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid movie Id")
        }
        if (!mongoose.isValidObjectId(actorId)) {
            throw createHttpError(400, "Invalid actor Id")
        }
        const movie = await Movie.findById(id).exec();
        if (!movie) {
            throw createHttpError(404, "Movie not found");
        }
        const actor = await Actor.findById(actorId).exec();
        if (!actor) {
            throw createHttpError(404, "Actor not found");
        }
        const actorMovie = await ActorMovie.create({ actorId: actorId, movieId: id });
        res.status(200).json(actorMovie);
    } catch (error) {
        next(error);
    }
}

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images/movies')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }),
    limits: {
        fileSize: 5000000
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))
        console.log(extName, mimType)
        if (mimType && extName) {
            return cb(null, true)
        } else {
            cb(new Error('Give proper files format to upload'))
        }
    }
}).single('image')