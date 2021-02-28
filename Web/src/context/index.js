import React, { useContext, useState , useEffect  } from "react";
import axios from "axios";
import url from "../core";

// Allowing credentials true for axios 
axios.defaults.withCredentials = true;

// Calling global context from React
const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()


// Creating global Context
export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)


// Making Global State component
export function GlobalStateProvider({ children }) {

    const [data, setData] = useState({
        user: null,
        loginStatus: false,
        role : null,
    })

    useEffect(() => {
        console.log('url is=> ' ,url);
        axios({
            method: 'get',
            url: url + "/profile",
        }).then((response) => {
                setData(prev => ({ ...prev, loginStatus: true , user : response.data.profile , role : response.data.profile.role }));
        }, (error) => {
            setData(prev => ({ ...prev, loginStatus: false }))
        });
    } , [] );
  
    

    return (
        <GlobalStateContext.Provider value={data}>
            <GlobalStateUpdateContext.Provider value={setData}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    )
} 