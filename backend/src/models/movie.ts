import { InferSchemaType, Schema, model } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    genderId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true });

type Movie = InferSchemaType<typeof movieSchema>;

export default model<Movie>("Movie", movieSchema);