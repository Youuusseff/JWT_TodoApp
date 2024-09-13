import React , { useState } from "react"

export const Login = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    function result(data,username){
        props.setToken(data["token"]);
        props.setUsername(username);
        const todos = getData(data["token"],username);
        return todos;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(user, pass).then(data =>result(data,user)).then(ref=>props.handelTodos(ref)).then(props.onPageSwitch("home"))
        }
    async function getData(token,username) {
        const response = await fetch("http://localhost:8080/"+username+"/todoitems/getitems",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        });
        const data = await response.json();
        return data;
    }    
    const login = async (userna, passwo) => {
        try {
        const response= await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: userna,
            password: passwo,
            }),
        });
        const data = await response.json();
        return data
        }
    catch{
        return null;
    }}
        
  
    return(
        <div className="loginReg">
        <div className="auth-form-container">
        <form className="loginform" onSubmit={handleSubmit}>
            <h3 htmlFor="username">username</h3>
            <input className="lg-input" value={user} type="text" placeholder="username" id="username" name="username" onChange={(e)=>{setUser(e.target.value)}}/>
            <h3 htmlFor="password">password</h3>
            <input className="lg-input" type="password" placeholder="password" id="password" name="password" onChange={(e)=>{setPass(e.target.value)}}/>
            <button type="submit">Log In</button>
        </form>
        <button onClick={()=>props.onPageSwitch("register")}>Don't have an account? </button>
        </div>
        </div>
    )
}
