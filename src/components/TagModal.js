import React, { useState } from "react";
import { addTag, tagColors } from "../db";
import { Button, Modal, InputGroup, Form, Row, Col } from 'react-bootstrap'

export default function TagModal(props) {
  const { show, handleClose } = props

  const [tag, setTag] = useState('')
  const [color, setColor] = useState(tagColors[0])

  const colorList = (
    <Row>
      {tagColors.map(c => (
        <Col xs={'auto'}>
          <div
            style={{backgroundColor: c}}
            onClick={() => setColor(c)}
            className={c === color ? 'tag-color selected' : 'tag-color'}>
          </div>
        </Col>
      ))}
    </Row>
  )

  const handleSubmit = () => {
    setTag(tag.trim())
    addTag({ name: tag, color })
    handleClose()
  }

  function handleChange(e) {
    setTag(e.target.value);
  }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Create a new tag..."
            value={tag}
            onChange={handleChange}/>
        </InputGroup>
        {colorList}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
}