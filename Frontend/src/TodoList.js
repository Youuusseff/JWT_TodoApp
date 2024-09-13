import React, { useEffect, useState } from 'react'
export default function TodoList(props) {
  const todos = props.todos;
  async function todoListFetch(token,user,todos) {
    const response = await fetch("http://localhost:8080/"+user+"/todoitems/fetchitems",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(todos),
    });
    const data = await response.json();
    return data;
}
  function deleteItem(todo){
    const arr = todos.filter((item) => item !== todo);
    props.setTodos(arr);
    const data = todoListFetch(props.token, props.username, arr);
    console.log(data);
    }
  return (
    <div className='TodoList'>
        <ul>
            {(todos)?.map( todo => (<li key={todo.id} >{todo.task} <label><input id="checkbox" className="item" type='checkbox' value={todo.completed} onChange={()=>{todo.completed = !(todo.completed);todoListFetch(props.token, props.username, props.todos);console.log(todo.completed)}}></input><button onClick={()=>deleteItem(todo)} id="task-button" className="item">Delete task</button></label></li>))}
        </ul>
    </div>
  )
  }
