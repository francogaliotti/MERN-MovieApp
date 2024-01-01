import React from 'react'
import { Genre } from '../models/genre';
import { GenreInput, createGenre } from '../network/movie_api';
import { useForm } from 'react-hook-form';
import { Button, Form, Modal } from 'react-bootstrap';
import { TextInputField } from './forms/TextInputField';

interface Props {
  onDismiss: () => void;
  onSuccess: () => void;
}

const AddEditGenreDialog = ({onDismiss, onSuccess }: Props) => {

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<GenreInput>({
    defaultValues: {
      name: ""
    }
  });

  async function onSubmit(data: GenreInput) {
    try {
      await createGenre(data);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  } 

  return (
    <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Genre
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form id="addEditGenreForm" onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    name='name'
                    label="Name"
                    register={register}
                    registerOptions={{ required: "Name is required" }}
                    error={errors.name}
                    type='text'
                    placeholder="Insert name"
                />
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='submit'
                    form="addEditGenreForm"
                    disabled={isSubmitting}
                >Save</Button>
            </Modal.Footer>
        </Modal>
  )
}

export default AddEditGenreDialog