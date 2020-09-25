import React, { useState, useContext, createContext } from 'react'

const UserContext = React.createContext();

export function useUserStatus(){
    return useContext(UserContext);
}

export function UserProvider({children}){
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(true);

    function logUser(){
        setLoggedIn(prev => !prev);
    }

    return(
        <UserContext.Provider value={loggedIn}>
                {children}
        </UserContext.Provider>
    )
}
