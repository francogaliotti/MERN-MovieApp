import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { MovieInput, createMovie, getGenders, updateMovie } from '../network/movie_api';
import { Movie } from '../models/movie';
import { TextInputField } from './forms/TextInputField';
import { Genre } from '../models/genre';
import { SelectField } from './forms/SelectField';

interface Props {
    movieToEdit?: Movie;
    onDismiss: () => void;
    onSuccess: (movie: Movie) => void;
}

const AddEditMovieDialog = ({ onDismiss, onSuccess, movieToEdit }: Props) => {

    const [genders, setGenders] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenders = async () => {
            const res = await getGenders();
            setGenders(res);
        }
        fetchGenders();
    }, []);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<MovieInput>({
        defaultValues: {
            title: movieToEdit?.title || "",
            description: movieToEdit?.description || "",
            genderId: movieToEdit?.genderId || "",
            release_date: movieToEdit?.release_date ? new Date(movieToEdit.release_date) : new Date(),
        }
    });

    async function onSubmit(data: MovieInput) {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("genderId", data.genderId);
            formData.append("release_date", data.release_date.toString());
            formData.append("image", data.image[0], data.image[0].name);
            let movieResponse: Movie;
            if (movieToEdit) {
                movieResponse = await updateMovie(movieToEdit._id, formData);
            } else {
                movieResponse = await createMovie(formData);
            }
            onSuccess(movieResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {movieToEdit ? "Edit movie" : "Add movie"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditMovieForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name='title'
                        label="Title"
                        register={register}
                        registerOptions={{ required: "Title is required" }}
                        error={errors.title}
                        type='text'
                        placeholder="Insert title"
                    />
                    <TextInputField
                        name='description'
                        label="Description"
                        register={register}
                        registerOptions={{ required: "Description is required" }}
                        error={errors.description}
                        as='textarea'
                        rows={5}
                        placeholder="Insert description" />
                    <SelectField
                        name='genderId'
                        label="Genre"
                        register={register}
                        options={genders}
                        registerOptions={{ required: "Genre is required" }}
                        error={errors.genderId}
                        setValue={() => setValue('genderId', movieToEdit?.genderId || "")}
                        placeholder="Select a genre"
                    />
                    <TextInputField
                        name='release_date'
                        label="Release date"
                        register={register}
                        registerOptions={{ required: "Release date is required" }}
                        error={errors.release_date}
                        type='date'
                        setValue={() => setValue('release_date', movieToEdit?.release_date ? new Date(movieToEdit.release_date) : new Date())}
                        placeholder="Insert release date" />
                    <TextInputField
                        name='image'
                        label="Image"
                        register={register}
                        registerOptions={{ required: "Image is required" }}
                        type='file' />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='submit'
                    form="addEditMovieForm"
                    disabled={isSubmitting}
                >Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEditMovieDialog