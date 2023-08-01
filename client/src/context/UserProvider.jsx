import React, { useState } from "react";
import axios from 'axios'
const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || "", 
        fav: '',
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [thisStat, setThisStat] = useState('')

    function signUp(credentials){
        axios.post("/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getUserTodos()
                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))})
            .catch(err => handleAuthErr(err.response.data.errMsg)) 
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: "",
            fav: ''
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prev => ({
            ...prev,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prev => ({
            ...prev,
            errMsg: ""
        }))
    }

    function getUserTodos(){
        userAxios.get("/api/todo/user")
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    todos: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    function addPrioStat(newTodo){
        console.log(newTodo)
        userAxios.post('/api/todo', newTodo)
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    todos: [...prev.todos, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    

    return (

        <UserContext.Provider
            value={{
                ...userState,
                signUp,
                login,
                logout,
                resetAuthErr,
                thisStat,
                setThisStat,
                addPrioStat
            }}>
            { props.children }
        </UserContext.Provider>

    )
}

export { UserProvider, UserContext }