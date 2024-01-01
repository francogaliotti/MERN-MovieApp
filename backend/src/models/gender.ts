import { InferSchemaType, Schema, model } from "mongoose";

const genderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

type Gender = InferSchemaType<typeof genderSchema>;

export default model<Gender>("Gender", genderSchema);