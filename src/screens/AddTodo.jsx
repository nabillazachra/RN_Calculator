import axios from "axios";
import { Button, Modal, FormControl, Input, Alert } from "native-base";
import React, { useState } from "react";

export default function AddTodo({ getTodos }) {
  const url = "http://192.168.1.11:4000/api/v1/";
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      if (!title.trim || !description.trim) {
        return <Alert>You need to fill the field</Alert>;
      }

      const data = {
        title,
        description,
      };

      const response = await axios.post(`${url}/todo`, data);
      setTitle("");
      setDescription("");
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const onPressButton = () => {
    handleSubmit();
    setShowModal(false);
  };
  return (
    <>
      <Button bg="primary.700" onPress={() => setShowModal(true)}>
        Add Todo
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Add Todo</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                placeholder="Input your Title"
                value={title}
                autoFocus={true}
                onChangeText={(nextValue) => setTitle(nextValue)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                placeholder="Input your Description"
                value={description}
                autoFocus={true}
                onChangeText={(descValue) => setDescription(descValue)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                color="white"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={onPressButton}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
