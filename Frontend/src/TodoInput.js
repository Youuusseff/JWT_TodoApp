import React, { useEffect } from 'react'
import { useState } from 'react'
import {v4} from 'uuid'
export default function TodoInput(props) {
    let id_=0;
    const [todo, setTodo] = useState("")
    const [newTodo, setNewTodo] = useState()
    async function postData(token,user,task) {
      const response = await fetch("http://localhost:8080/"+user+"/todoitems/postitems",{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            task:  task,
            completed: false,
          }),
      });
      const data = await response.json();
      return data;
  }
  return (
    <div className='TodoInput'>
        <input value={todo} placeholder='what are we going to do !?' onChange={e =>setTodo(e.target.value)}></input>
        <button onClick={()=>{postData(props.token, props.username, todo).then((data)=>props.setTodos([...props.todos, data])); setTodo('')}}>ADD</button>
    </div>
  )
}
