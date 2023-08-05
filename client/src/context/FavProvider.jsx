import React, { createContext } from "react";
import axios from "axios";

const FavContext = React.createContext()

const favAxios = axios.create()

favAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const getFav = (id) => {
    favAxios.get(`/api/fav/${id}`)
        .then(res => console.log(`getFav func `, res))
}



export default function FavProvider(props){
    return(
        <FavContext.Provider value={{
            getFav
        }}>
            {props.children}
        </FavContext.Provider>
    )
}

export {FavProvider, FavContext}