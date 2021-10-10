import '../App.css';
import React from 'react';
import {SidebarData} from "./SidebarData"

function Sidebar(){
    return (
        <div className='sidebar'>
            <ul className='sidebarList'>
                {SidebarData.map((val, key)=>{
                    return (
                        <li key={key} 
                            className="row"
                            id={window.location.pathname==val.link? "active":""}
                            onClick={()=>{if (val.link==='/Logout') {
                                            window.location.pathname= "/"
                                        }else{
                                            window.location.pathname= val.link
                                        }
                                    }
                            }
                        >
                            <div className='small-icon'>{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sidebar;