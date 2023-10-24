import React from 'react'

export default function AuthForm(props){
console.log(props)
const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg, 
    inputs: {
        username, 
        password
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
        <button>{ btnText }</button>
        <p style={{color: "red"}}>{ errMsg }</p>
    </form>
)
}