import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get("/todos");
      console.log(resp);
      setTodos(resp.data);
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`/todos/${id}`);
      if (resp.data.success) {
        setTodos((prevState) => prevState.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {/* TodoForm */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(e);
          // Form field values
          const todo = e.currentTarget[0].value;

          //Wir kriegen unsere datem vom backend
          //error oder newEntry

          const resp = await axios.post("/todos", { todo });

          const { newEntry, errors } = resp.data;

          if (newEntry) {
            console.log(resp.data);
            setTodos((prevState) => [newEntry, ...prevState]);
          }
          if (errors) {
            //Wenn es einen Fehler gibt setzen wir diesen State auf error
            setErrors(errors);
          }
        }}
      >
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="give me some todo"
        />
        <button type="submit">Add</button>
      </form>
      {todos.map((ele) => {
        return (
          <div key={ele._id}>
            <input type="checkbox" name="checkbox" id="checkbox" />
            <p>{ele.todo}</p>
            <button onClick={() => handleDelete(ele._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
