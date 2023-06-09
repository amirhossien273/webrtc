import { useEffect } from "react";
import { useParams, useNavigate   } from "react-router-dom";
import users from '../data/users.json';

const LoginPage = () => {

    const params = useParams();
    const navigate  = useNavigate();
    useEffect(() => {

        const user = users.find(user => user.id === params.userID);
        if(user){
            localStorage.setItem("user", JSON.stringify(user));
            navigate('/');
        }


    },[]);
 
    return (
        <>
          login user...
        </>
    );
};

export default LoginPage;
