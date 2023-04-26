import React from "react";
import '../styles/LayoutStyles.css'
import {adminMenu, userMenu } from "../Data/data";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Badge, message} from 'antd'

 const Layout = ({children}) =>{
    const {user} = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    //logout function
    const handleLogout = () =>{
        localStorage.clear()
        message.success('Logout successfully');
        navigate('/login');
    };

    //doctor menu 
      const doctorMenu = [
        {
            name:'Home',
            path:'/',
            icon: "fa-solid fa-house"
        },
        {
            name:'Appointments',
            path:'/doctor-appointments',
            icon:"fa-solid fa-list",
        },
        {
            name:'Profile',
            path:`/doctor/profile/${user?._id}`,
            icon:"fa-solid fa-user",
        },
        {
            name:'Online Consultation',
            path:'/onlineconsultation',
            icon:"fa-solid fa-user",
        },
        
    ];

    //ReNDERING MENU LIST
    const SidebarMenu = user?.isAdmin
     ? adminMenu 
     : user?.isDoctor
    ? doctorMenu 
    : userMenu;
    return(
        <>
        <div className="main">
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                    <h6>DOC APP</h6><hr></hr>
                    </div>
                    <div className="menu">
                        {SidebarMenu.map((menu) =>{
                            const isActive = location.pathname === menu.path;
                            return (
                                <>
                                    <div className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            );
                        })}
                        {/* <div className={`menu-item`}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <Link to="/onlineconsultation">Online Consultation</Link>
                        </div> */}
                        <div className={`menu-item`} onClick={handleLogout}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <Link to="/login">Logout</Link>
                        </div>
                                                
                    </div>
                </div>
                
                <div className="content">
                    <div className="header">
                        <div className="header-content" style={{cursor : "pointer"}}>
                        <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >          
                        <i class="fa-solid fa-bell"></i>
                        </Badge>
                        <Link to="/profile">{user?.name}</Link>
                        
                        </div>
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Layout;