import React from 'react'
import {useContext,useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { signInWithGoogle,isAdmin,signOut } from '../../../services/firebase';
import {Message} from 'semantic-ui-react';
import { UserContext } from '../../../providers/UserProvider';
import Loader from '../Loader/Loader'
import AdminNavbar from './AdminNavbar';
import Navbar from './Navbar';

const NavDecider = (props) => {
    const info = useContext(UserContext);
    const {user,isLoading} = info;
    const [redirect, setredirect] = useState(null)
    const [notAdmin,setNotAdmin]  = useState(false);
    useEffect(() => {
    if (user && !isLoading) {
        if(isAdmin(user.email)){
            setredirect('/admin/dashboard');
            console.log("redirecting to admin/dashboard")
        }else{
            signOut();
            setNotAdmin(true);
        }
    }
    }, [user,isLoading])
    return (
        <div>
            {isLoading && <Loader />}
            {!isLoading && !user && 
            <Navbar>
                {props.children}
            </Navbar>
            }
            {!isLoading && user && 
            <AdminNavbar>
                {props.children}
            </AdminNavbar>    
            }
        </div>
    )
}

export default NavDecider
