import { Link } from "react-router-dom";
import users from '../../data/users.json';

function ListLobbyComponent(props) {
    
    console.log(props);
    const userMeeting = users.filter((user) => user.id !== props.user.id && user.appointments.includes(props.appointment));

    console.log("userMeeting",userMeeting);

    return (
        <div>
            <div>
                <div>
                  Meeting with 
                   {userMeeting.map((user, index) =>{
                            return (
                                <span key={index}>{user.name}</span>
                            )
                        })
                    }
                </div>
             <Link to={`room/${props.appointment}`} >Join to Room</Link>
            </div>
        </div>
    )

}


export default ListLobbyComponent