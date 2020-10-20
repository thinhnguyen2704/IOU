import React, { useContext, createContext, useEffect, useReducer, useState } from 'react'
import reducer, {initialState} from './reducer'

const LoadingContext = React.createContext();

export function LoadingProvider({children}){

    const [isLoading, setIsLoading] = useState(false);

    return(
        <LoadingContext.Provider value={[isLoading,setIsLoading]}>
                {children}
        </LoadingContext.Provider>
    )
}

export function useLoading(){
    return useContext(LoadingContext);
}

