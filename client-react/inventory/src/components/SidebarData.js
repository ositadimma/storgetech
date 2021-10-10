import React from 'react';
// import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Home';
import UsersIcon from '@material-ui/icons/Group';
import ItemsIcon from '@material-ui/icons/Category';
import ProfileIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ArrowBack';


export const SidebarData= [
    {
        title:"Dashboard",
        icon: <DashboardIcon/>,
        link: "/Dashboard"
    },
    {
        title:"Users",
        icon: <UsersIcon/>,
        link: "/Users"
    },
    {
        title:"Items",
        icon: <ItemsIcon/>,
        link: "/Items"
    },
    {
        title:"Category",
        icon: <ItemsIcon/>,
        link: "/Category"
    },
    {
        title:"Logout",
        icon: <LogoutIcon/>,
        link: "/Logout"
    }
]
