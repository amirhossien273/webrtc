import { createContext, useCallback, useEffect, useState } from "react";
import users from '../data/users.json';

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
       setUser(user);
    },[]);
 

    return <AuthContext.Provider  value={{user}}>{children}</AuthContext.Provider>
}