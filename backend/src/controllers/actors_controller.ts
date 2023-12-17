import { RequestHandler } from "express";
import Actor from "../models/actor";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import ActorMovie from "../models/actorMovie";
import Movie from "../models/movie";
import multer from 'multer';
import path from 'path';

export const index: RequestHandler = async (req, res, next) => {
    try {
        const actors = await Actor.find().exec();
        res.status(200).json(actors)
    } catch (error) {
        next(error);
    }
}

export const show: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid Id")
        }
        const actor = await Actor.findById(id).exec();
        if (!actor) {
            throw createHttpError(404, "Actor not found");
        }
        res.status(200).json(actor)
    } catch (error) {
        next(error)
    }
}

interface CreateBody {
    name?: string,
    lastname?: string,
    birth_date?: string,
}

export const create: RequestHandler<unknown, unknown, CreateBody, unknown> = async (req, res, next) => {
    const { name, lastname, birth_date } = req.body;
    const image = req.file?.path;
    try {
        if (!name || !lastname) {
            throw createHttpError(400, "Name and Last Name is required")
        }
        if (!birth_date) {
            throw createHttpError(400, "Birth Date is required")
        }
        const actor = await Actor.create({ 
            name, 
            lastname, 
            birth_date: new Date(birth_date),
            image
        });
        res.status(201).json(actor);
    } catch (error) {
        next(error);
    }
}

export const update: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    const { name, lastname, birth_date } = req.body;
    const image = req.file?.path;
    try {
        if (!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid Id")
        }
        if (!name || !lastname) {
            throw createHttpError(400, "Name and Last Name is required")
        }
        if (!birth_date) {
            throw createHttpError(400, "Birth Date is required")
        }
        const actor = await Actor.findByIdAndUpdate(id, {
            name,
            lastname, 
            birth_date: new Date(birth_date),
            image
        }, { new: true }).exec();
        if (!actor) {
            throw createHttpError(404, "actor not found");
        }
        res.status(200).json(actor);
    } catch (error) {
        next(error);
    }
}

export const destroy: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid Id")
        }
        const actor = await Actor.findByIdAndDelete(id).exec();
        if (!actor) {
            throw createHttpError(404, "actor not found");
        }
        res.status(200).json(actor);
    } catch (error) {
        next(error);
    }
}

interface addMovieBody {
    movieId: string,
    actorId: string
}

export const addMovieToActor: RequestHandler<unknown, unknown, addMovieBody, unknown> = async (req, res, next) => {
    const { movieId, actorId } = req.body;
    try {
        if (!mongoose.isValidObjectId(actorId)){
            throw createHttpError(400, "Invalid actor Id")
        }
        if (!mongoose.isValidObjectId(movieId)){
            throw createHttpError(400, "Invalid movie Id")
        }
        const actor = await Actor.findById(actorId).exec();
        if (!actor) {
            throw createHttpError(404, "Actor not found");
        }
        const movie = await Movie.findById(movieId).exec();
        if (!movie) {
            throw createHttpError(404, "Movie not found");
        }
        const actorMovie = await ActorMovie.create({ actorId: actorId, movieId: movieId });
        res.status(200).json(actorMovie);
    } catch (error) {
        next(error);
    }
}

export const filterByMovie: RequestHandler = async (req, res, next) => {
    // eslint-disable-next-line prefer-const
    const movieId = req.params.id;
    console.log(movieId)
    try {
        if (!mongoose.isValidObjectId(req.body.movieId)) {
            throw createHttpError(400, "Invalid movie Id")
        }
        const actorMovies = await ActorMovie.find({ movieId }).exec();
        const actors = [];
        for (const actorMovie of actorMovies) {
            const actor = await Actor.findById(actorMovie.actorId).exec();
            if (actor) {
                actors.push(actor);
            }
        }
        res.status(200).json(actors);
    } catch (error) {
        next(error);
    }
}

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images/actors')
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