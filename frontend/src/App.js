import './App.css';
import React, { useState, useEffect } from "react";
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';

function App() {

  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");


    const addTodo = (todo) => {
      const newTodos = [...todos, todo]
      setTodos(newTodos)
    };

    const deleteTodo = (index) => {
      fetch("http://localhost:3001/todos/" + todos[index].id, {
        method: "DELETE"
      })
      
      const newTodos = [...todos]
      newTodos.splice(index, 1)
      setTodos(newTodos);
    }

    useEffect(() => {
      const getData = async () => {
        const result = await fetch('http://localhost:3001/todos/', {})
        const data = await result.json();
        setTodos(data)
      }
      getData()
    }, [])

    //Hinzufügenn und in der Datenbak speichern
    const handleSubmit = (e) => {
      e.preventDefault()
      addTodo({
        text: value,
        complete: false
      })

      fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: value,
          complete: false
        })
      })
      setValue('')
    }




  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm  
      value={value} 
      setValue={setValue}
      handleSubmit={handleSubmit}
      />
      <div>
      {todos.map((todo, index) => {
        return(
          <Todo
          todo={todo}
          key={index}
          index={index}
          // wenn man die delete möglichkeit mit einbauen will dann besser key={todo.title} nehmen weil durc das löschen der index durcheinander gebracht wird 
          deleteTodo={deleteTodo}
          />
        )
      })}
      </div>
    </div>
  );
}

export default App;
