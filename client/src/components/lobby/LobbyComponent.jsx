import { useContext } from "react";
import ListLobbyComponent from "./ListLobbyComponent"
import { AuthContext } from "../../context/AuthContext";

function LobbyComponent() {

    const {user} = useContext(AuthContext);

    console.log("user: ", user);
    let appointments = [];
    if(user?.appointments !== undefined) appointments = user?.appointments;

    console.log("appointments",appointments);

    return (
        <div className="header">
            <div className="container">
               <div className="contarols">
                   <div style={{marginTop: "100px"}} className="joined">
                        <h2>hi {user?.name} welcom to lobby</h2>
                        {appointments.map((appointment, index) =>{
                            return (
                                  <ListLobbyComponent key={index} appointment={appointment} user={user}></ListLobbyComponent>
                                )
                            })
                        }
                   </div>
               </div>
            </div>
        </div>
    )

}


export default LobbyComponent