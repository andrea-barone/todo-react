import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Todo from "./components/Todo";
import MyForm from "./components/Form";
import { nanoid } from "nanoid";
import 'bootstrap/dist/css/bootstrap.min.css';

// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    console.log(tasks[0]);
    setTasks(
      tasks.map((t) => ({
        ...t,
        completed: id === t.id ? !t.completed : t.completed,
      }))
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function editTask(id, newName) {
    setTasks(
      tasks.map((t) => ({ ...t, name: t.id === id ? newName : t.name }))
    );
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const navList = FILTER_NAMES.map((name) => (
    <Nav.Link eventKey={name}>{name} ({tasks.filter(FILTER_MAP[name]).length})</Nav.Link>
  ))

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  const handleSelect = (eventKey) => {
    console.log(eventKey)
    setFilter(eventKey)
  }
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <Container className="todoapp stack-large">
      <Row>
        <Col xs={3}>
          <Row>
            <Col>
              <h1>TodoMatic</h1>
            </Col>
          </Row>
          <Row>
          <Nav activeKey={filter} className="flex-column" onSelect={handleSelect}>
            {navList}
          </Nav>
          </Row>
        </Col>
        <Col xs={9}>
        <Row>
          <Col>
            <MyForm addTask={addTask} />
          </Col>        
        </Row>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
          {headingText}
        </h2>
        <Row>
          <Col>
          {taskList}
          </Col>
        </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
