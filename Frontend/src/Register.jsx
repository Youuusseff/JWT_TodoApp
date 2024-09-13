import React, {useState} from "react"
export const Register = (props)=> {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        register(user,pass).then((data)=>{props.setToken(data["token"]);props.setUsername(user)}).then(props.onPageSwitch("home"));
    }
    
    const register = async (username, password) => {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: username,
            password: password,
            }),
        });
        const data = await response.json();
        return data;
    }
    return(
        <div className="loginReg">
            <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit} autoComplete="id">
                <h3 htmlFor="username">username</h3>
                <input className="lg-input" value={user} type="text" placeholder="username" id="username" name="username" onChange={(e)=>setUser(e.target.value)}/>
                <h3 htmlFor="username">Email</h3>
                <input className="lg-input" type="email" placeholder="email" id="email" name="email"/>
                <h3 htmlFor="password">password</h3>
                <input className="lg-input" type="password" placeholder="password" id="password" name="password" onChange={(e)=>{setPass(e.target.value)}}/>
                <button type="submit">Log In</button>
            </form>
            <button onClick={()=>props.onPageSwitch("login")}>Already have an account ?</button>
            </div>
        </div>
    )
}