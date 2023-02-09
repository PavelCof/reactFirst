import React,{useContext} from "react";
import PropTypes from "prop-types"
import context from "../context";

const styles = {
    li:{
        display:'flex',
        justifyContent:'space-between',
        alingItem:'center',
        padding: '.5rem 1rem',
        border:'1px solid #ccc',
        borderRadius:'4px',
        marginBottom:'.5rem'
        },
        input:{
            marginRight:'1rem'
        }
}

function TodoItem({todo,index,onChange}) {
    const {removeTodo} = useContext(context)
   const classes =[]
   if(todo.completed){
        classes.push('done')
   }
    return (
        <li style={styles.li}>
            <span className={classes.join(" ")}>
                <input 
                    type="checkbox" 
                    style={styles.input} 
                    onChange={()=>onChange(todo.id)}
                    checked={todo.completed}
                />
                <strong>{index+1}</strong>    &nbsp; 
                {todo.title}
                &nbsp;
               
            </span>
            <button className="rm" onClick={removeTodo.bind(null,todo.id)}>&times;</button>
        </li>
    )
}

TodoItem.protoTypes ={
    todo:PropTypes.object.isRequired,
    index:PropTypes.number.isRequired,
    onChange:PropTypes.func.isRequired

}
export default TodoItem