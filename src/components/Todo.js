import React, { useRef, useState } from "react";
import { Button, Form, Row, InputGroup, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTags } from "../db";
import { faTrash, faTag } from '@fortawesome/free-solid-svg-icons'

export default function Todo(props) {
  const [newName, setNewName] = useState(props.name);
  const editFieldRef = useRef(null);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    props.editTask(props.id, newName);
  }

  const editingTemplate = (
    <Form className="stack-small" onSubmit={handleSubmit}>
      <InputGroup className="mb-3" onBlur={handleSubmit}>
        <InputGroup.Checkbox
          id={props.id}
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
          />
        <Form.Control id={props.id}
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}/>
        <Button variant="primary">
        <FontAwesomeIcon icon={faTag}/>
        </Button>
        <Button variant="danger" onClick={() => props.deleteTask(props.id)}>
          <FontAwesomeIcon icon={faTrash}/>
        </Button>
      </InputGroup>
      <Row>
        {
          props.tags.map(t => {
            const dbtag = getTags().find(tag => tag.name === t)
            return (
              <Col xs='auto' className='tag-label' style={{ backgroundColor: dbtag?.color }}>{t}</Col>
            )
          })
        }
      </Row>
    </Form>
  );

  return <Row className="todo">{editingTemplate}</Row>;
}
