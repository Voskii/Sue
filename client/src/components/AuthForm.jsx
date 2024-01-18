import React from 'react'

export default function AuthForm(props){
console.log(props)
const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg,
    needEmail, 
    inputs: {
        username, 
        password,
        email
    } 
} = props

return (
    <form onSubmit={handleSubmit} className='auth-inputs'>
        <input 
            type="text" 
            value={username} 
            name="username" 
            onChange={handleChange} 
            placeholder="Name"/>
        <input 
            type="text" 
            value={password} 
            name="password" 
            onChange={handleChange} 
            placeholder="Password"/>
        {needEmail && 
        <input 
            type="text" 
            value={email} 
            name="email" 
            onChange={handleChange} 
            placeholder="Email"/>
        }
        <button>{ btnText }</button>
        <p style={{color: "red"}}>{ errMsg }</p>
    </form>
)
}