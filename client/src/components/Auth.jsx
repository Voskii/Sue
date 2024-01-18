import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import yom from '../images/HeyYou1.png'

const initInputs = { username: "", password: "", email: '' }

export default function Auth(){
const [inputs, setInputs] = useState(initInputs)
const [toggle, setToggle] = useState(true)

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
<div className="auth-container">
    <h1 className='intro-name'>HeyYou!</h1>
    <img src={yom} className='yom-img'/>
    <h2 className='mmt'>Mindful Meal Tracker</h2>
    { !toggle ?
    <div className='auth'>
        <AuthForm 
        handleChange={handleChange}
        handleSubmit={handleSignup}
        inputs={inputs}
        btnText="Sign up"
        errMsg={errMsg}
        needEmail={true}
        />
        <p onClick={toggleForm}>Already a HeyYou'er?</p>
    </div>
    :
    <div className='auth'>
        <AuthForm 
        handleChange={handleChange}
        handleSubmit={handleLogin}
        inputs={inputs}
        btnText="Login"
        errMsg={errMsg}
        />
       <p onClick={toggleForm}>Not a member?</p>
    </div>
    }
</div>
)
}