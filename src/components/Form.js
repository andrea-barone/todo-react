import React, { useState } from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';

export default function MyForm(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !name?.trim()) {
      return
    }
    props.addTask(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3" onBlur={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Create a new todo..."
          value={name}
          onChange={handleChange}/>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </InputGroup>
    </Form>
  );
}
