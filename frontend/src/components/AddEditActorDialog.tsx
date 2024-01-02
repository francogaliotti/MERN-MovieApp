import React from 'react'
import { Actor } from '../models/actor';
import { ActorInput, createActor, updateActor } from '../network/movie_api';
import { useForm } from 'react-hook-form';
import { Button, Form, Modal } from 'react-bootstrap';
import { TextInputField } from './forms/TextInputField';


interface Props {
  actorToEdit?: Actor;
  onDismiss: () => void;
  onSuccess: (actor: Actor) => void;
}

const AddEditActorDialog = ({ onDismiss, onSuccess, actorToEdit }: Props) => {

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ActorInput>({
    defaultValues: {
      name: actorToEdit?.name || "",
      lastname: actorToEdit?.lastname || "",
      biography: actorToEdit?.biography || "",
      birth_date: actorToEdit?.birth_date ? new Date(actorToEdit.birth_date) : new Date(),
    }
  });

  async function onSubmit(data: ActorInput) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("lastname", data.lastname);
      formData.append("biography", data.biography);
      formData.append("birth_date", data.birth_date.toString());
      formData.append("image", data.image[0], data.image[0].name);
      let actorResponse: Actor;
      if (actorToEdit) {
        actorResponse = await updateActor(actorToEdit._id, formData);
      } else {
        actorResponse = await createActor(formData);
      }
      onSuccess(actorResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {actorToEdit ? "Edit actor" : "Add actor"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditActorForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='name'
            label="Name"
            register={register}
            registerOptions={{ required: "Name is required" }}
            error={errors.name}
            type='text'
            placeholder="Insert name"
          />
          <TextInputField
            name='lastname'
            label="Lastname"
            register={register}
            registerOptions={{ required: "Lastname is required" }}
            error={errors.lastname}
            type='text'
            placeholder="Insert lastname"
          />
          <TextInputField
            name='biography'
            label="Biography"
            register={register}
            registerOptions={{ required: "Biography is required" }}
            error={errors.biography}
            as='textarea'
            rows={5}
            placeholder="Insert biography" />
          <TextInputField
            name='birth_date'
            label="Birth date"
            register={register}
            registerOptions={{ required: "Birth date is required" }}
            error={errors.birth_date}
            type='date'
            placeholder="Insert birth date" />
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
          form="addEditActorForm"
          disabled={isSubmitting}
        >Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditActorDialog