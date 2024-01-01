import { RequestHandler } from "express";
import Gender from "../models/gender";
import mongoose from "mongoose";
import createHttpError from "http-errors";

export const index: RequestHandler = async (req, res, next) => {
    try {
        const genders = await Gender.find().exec();
        res.status(200).json(genders)
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
        const gender = await Gender.findById(id).exec();
        if (!gender) {
            throw createHttpError(404, "Category not found");
        }
        res.status(200).json(gender)
    } catch (error) {
        next(error)
    }
}

interface CreateBody {
    name?: string,
}

export const create: RequestHandler<unknown, unknown, CreateBody, unknown> = async (req, res, next) => {
    const { name   } = req.body;
    try {
        if (!name) {
            throw createHttpError(400, "Name is required")
        }
        const gender = await Gender.create({ name  });
        res.status(201).json(gender);
    } catch (error) {
        next(error);
    }
}

interface UpdateParams {
    id: string
}

interface UpdateBody {
    name?: string,
}

export const update: RequestHandler<UpdateParams, unknown, UpdateBody, unknown> = async (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        if (!mongoose.isValidObjectId(id)){
            throw createHttpError(400, "Invalid Id")
        }
        const gender = await Gender.findByIdAndUpdate(id, {
            name
        }, { new: true }).exec();
        if (!gender) {
            throw createHttpError(404, "Gender not found");
        }
        res.status(200).json(gender);
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
        const gender = await Gender.findByIdAndDelete(id).exec();
        if (!gender) {
            throw createHttpError(404, "Gender not found");
        }
        res.status(200).json(gender);
    } catch (error) {
        next(error);
    }
}
