import React, { useState } from "react";
import "./TodoList.css";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const TodoList = ({ todos, setTodos }) => {


    const taskTodos = todos.filter(todo => todo.status === "task");
    const progressTodos = todos.filter(todo => todo.status === "progress");
    const doneTodos = todos.filter(todo => todo.status === "done");


    const [draggedId, setDraggedId] = useState(null);

    const handleDragStart = (e, id) => {
        setDraggedId(id);
    };

    const handleDrop = (status) => {
        const updatedTodos = todos.map(todo =>
            todo.id === draggedId ? { ...todo, status } : todo
        );
        setTodos(updatedTodos);
        setDraggedId(null);
    };




    const renderTodos = (list) =>
        list.map(todo => (
            <div
                key={todo.id}
                className={`card_item ${todo.status}`}
                draggable
                onDragStart={(e) => handleDragStart(e, todo.id)}
            >
                <div className="child_item">
                    {todo.title}
                    <i onClick={()=>deleteTodo(todo.id)} class="ri-delete-bin-5-fill"></i>
                </div>
            </div>
        ));


    const deleteTodo = (id) => {
        const filterTodo = todos.filter((todo) => todo.id != id);
        setTodos(filterTodo);
    }
    return (
        <div className="todo-board">
            <div className="task_column" onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop("task")}>
                <h2>Task</h2>
                {renderTodos(taskTodos)}
            </div>

            <div className="column" onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop("progress")}>
                <h2>In Progress</h2>
                {renderTodos(progressTodos)}
            </div>

            <div className="column" onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop("done")}>
                <h2>Done</h2>
                <div className="card">{renderTodos(doneTodos)}</div>
            </div>
        </div>
    );
};

export default TodoList;
