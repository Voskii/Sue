import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.jsx'
import { UserContext } from '../context/UserProvider.jsx'

const initInputs = { username: "", password: "" }

export default function Auth(){
const [inputs, setInputs] = useState(initInputs)
const [toggle, setToggle] = useState(false)

const { signUp, login, errMsg, resetAuthErr } = useContext(UserContext)

function handleChange(e){
const {name, value} = e.target
setInputs(prevInputs => ({
    ...prevInputs,
    [name]: value
}))
}

function handleSignup(e){
e.preventDefault()
signUp(inputs)
}

function handleLogin(e){
e.preventDefault()
login(inputs)
}

function toggleForm(){
setToggle(!toggle)
resetAuthErr()
}

return (
<div className="cred-container wrap">
    <h1 className='game-name'></h1>
    { !toggle ?
    <>
        <AuthForm 
        handleChange={handleChange}
        handleSubmit={handleSignup}
        inputs={inputs}
        btnText="Sign up"
        errMsg={errMsg}
        />
        <p onClick={toggleForm}>Already a HeySuer?</p>
    </>
    :
    <>
        <AuthForm 
        handleChange={handleChange}
        handleSubmit={handleLogin}
        inputs={inputs}
        btnText="Login"
        errMsg={errMsg}
        />
        <p onClick={toggleForm}>Not a member?</p>
    </>
    }
</div>
)
}