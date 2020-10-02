import React, { useContext, createContext, useEffect, useReducer } from 'react'
import reducer, {initialState} from './reducer'

const UserContext = React.createContext();

export function UserProvider({children}){

    const [state, dispatch] = useReducer(reducer, initialState, ()=>{
        const localData = localStorage.getItem('user');
        return localData ? JSON.parse(localData) : initialState
    })

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(state));
        console.log("Changed");
    },state.user)

    return(
        <UserContext.Provider value={[state,dispatch]}>
                {children}
        </UserContext.Provider>
    )
}

export function useUserStatus(){
    return useContext(UserContext);
}

