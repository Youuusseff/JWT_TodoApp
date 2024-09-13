import {useState, useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import { Login } from './Login';
import { Register } from './Register' 

function App() {
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([])
  const [currentPage, setCurrentPage] = useState("login");
  const [token, setToken] = useState(null);
  const [isDirty, setIsDirty] = useState(false)
  async function getData(token,user) {
    const response = await fetch("http://localhost:8080/"+user+"/todoitems/getitems",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
    });
    const data = await response.json();
    return data;
} 
  console.log(token)
  useEffect(()=>{token?getData(token,username).then((data)=>setTodos(data)):console.log("user not here")},[])
  const handleSignIn = (userToken)=>{
    setToken(userToken);
  }
  const togglePage = (pageName) =>{
    setCurrentPage(pageName);
  }
  const handelTodos = (data) =>{
    setTodos(data);
  }
  const handelDirty = (boolean) =>{
    setIsDirty(boolean);
  }

  function displayComponent(currentPage){
    if(currentPage === "login"){
      return <Login className="LoginReg" onPageSwitch={togglePage} token={token} todos={todos} handelTodos={handelTodos} setToken={handleSignIn} setUsername={setUsername}/>
    }
    else if(currentPage === "register"){
      return <Register className="LoginReg" onPageSwitch={togglePage} setToken={handleSignIn} setUsername={setUsername}/>
    }
    else{
      return (
      <div className='TodoWrapper'>
        <h1>MY TO DO LIST</h1>
        <TodoInput handelDirty={handelDirty} token={token} username={username} todos={todos} setTodos={handelTodos}/>
        <TodoList token={token} username={username} todos={todos} setTodos={handelTodos}/>
        <button className='logout' onClick={()=>{setToken("");setTodos([]);setCurrentPage("login")}}>Log Out</button>
      </div>)
    }
  }
  return(
      displayComponent(currentPage)
  )}
export default App;
