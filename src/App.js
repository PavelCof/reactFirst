
import React, {useEffect} from "react";
import TodoList from "./Todo/TodoList";
import context from "./context";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";

function App() {
  const [todos,setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

useEffect(()=>{
  fetch("https://jsonplaceholder.typicode.com/todos/?_limit=5")
  .then(res=>res.json())
  .then(json=>{
    setTodos(json)
    setLoading(false)
  })
},[])

function toggleTodo(id) {
  setTodos(
   todos.map(todo=>{
      if(todo.id===id){
        todo.completed=!todo.completed
      }
      return todo
    })
  )

}
  function removeTodo(id) {
    setTodos(todos.filter(todo=> todo.id !==id))
  }
  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed:false
    }]))
  }
  return (
    <context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1>React first</h1>
        <AddTodo onCreate={addTodo}/>
       { loading?<Loader />:""}
      {
        todos.length? <TodoList todos={todos} onTogle={toggleTodo}/>:(loading?"<p>Нет задач</p>":"")
        
        
      }
       
      </div>
    </context.Provider>
  );
}

export default App;
