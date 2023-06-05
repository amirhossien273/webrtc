import { createContext, useCallback, useEffect, useState } from "react";
import users from '../data/users.json';

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
       console.log(users);
       const random = Math.floor(Math.random() * users.length);
       setUser(users[random]);
       console.log(user);

    },[]);
 

    return <AuthContext.Provider  value={{user}}>{children}</AuthContext.Provider>
}