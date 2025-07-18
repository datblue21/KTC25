import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useAuthStore } from "../TasksManagementWithZustand/useAuthStore";

const Customer = () => {
    const navigate = useNavigate();
    const {loggedInUser} = useAuthStore();
    
    useEffect(()=>{
        if(!loggedInUser) {
            navigate('/login');
        }
        //Kiem tra tiep xem co role customer hay khong
        if(loggedInUser && !loggedInUser.roles.some(role => role.name === 'Managers')) {
            navigate('/access-denied'); 
        }

    },[loggedInUser, navigate])

    console.log('Logged in user:', loggedInUser);
  return (
    <div>Customer</div>
  )
}

export default Customer