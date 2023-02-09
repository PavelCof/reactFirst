
import React, {useEffect} from "react";
import TodoList from "./Todo/TodoList";
import context from "./context";
import Loader from "./Loader";
import Modal from "./Todo/Modal/Modal";

const AddTodo =React.lazy(()=> import('./Todo/AddTodo'))

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
        <Modal/> 
        <React.Suspense fallback={<p>Loading</p>}>
            <AddTodo onCreate={addTodo}/>
        </React.Suspense>
       
       { loading?<Loader />:""}
      {
        todos.length? <TodoList todos={todos} onTogle={toggleTodo}/>:(loading?null:<p>Нет задач</p>)
        
        
      }
       
      </div>
    </context.Provider>
  );
}

export default App;
