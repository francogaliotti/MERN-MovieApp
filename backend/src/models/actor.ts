import { InferSchemaType, Schema, model } from "mongoose";

const actorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    biography: {
        type: String,
        maxlength: 455
    },
    image: {
        type: String
    }
}, { timestamps: true });

type Actor = InferSchemaType<typeof actorSchema>;

export default model<Actor>("Actor", actorSchema);

