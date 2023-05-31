const Todo = ({todo, deleteTodo, index}) => {
    return ( 
        <div>
            <label htmlFor="">
                <input type= "checkbox" name="checkbox" id="checkbox" />
                <p>{todo.text}</p>
                <button onClick={() => deleteTodo(index)}>Delete</button>
            </label>
        </div>
    );
}

export default Todo;