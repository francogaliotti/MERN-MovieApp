import { InferSchemaType, Schema, model } from "mongoose";

const genderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    translation_en: {
        type: String
    },
    translation_es: {
        type: String
    },
    translation_de: {
        type: String
    },
}, { timestamps: true });

type Gender = InferSchemaType<typeof genderSchema>;

export default model<Gender>("Gender", genderSchema);