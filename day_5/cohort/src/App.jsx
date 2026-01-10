import React, { useState } from 'react'
import TodoList from './components/TodoList'
import './App.css'
const App = () => {

  const [todos, setTodos] = useState([
    { id: "1", title: "Build layout", status: "task" },
    { id: "2", title: "Setup project", status: "task" },
    { id: "3", title: "Fix the Bug", status: "task" },
  ]);

  const [input_Value, setInput] = useState("");


  const addTodo = (e) => {
    e.preventDefault();

    const newData = {
      id: Date.now().toString(),
      title: input_Value,
      status: "task",
    }

    console.log(newData)

    const copyData = [...todos];

    copyData.push(newData);

    setTodos(copyData)
  }


 

  return (
    <div className='container'>
      <div className='input_container'>
        <form onSubmit={(e) => addTodo(e)}>
          <input value={input_Value} onChange={(e) => setInput(e.target.value)} className='input_sec' type="text" placeholder='Enter the Task' />
          <button className='btn'>Add TASK</button>
        </form>
      </div>
      <TodoList  todos={todos} setTodos={setTodos}  />
    </div>
  )
}

export default App