import { InferSchemaType, Schema, model } from "mongoose";

const actorMovieSchema = new Schema({
    actorId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    movieId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

type ActorMovie = InferSchemaType<typeof actorMovieSchema>;

export default model<ActorMovie>("ActorMovie", actorMovieSchema);