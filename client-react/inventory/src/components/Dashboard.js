import '../App.css';
import React from 'react'
import UsersIcon from '@material-ui/icons/Group';
import ItemsIcon from '@material-ui/icons/Category';

const Dashboard=(props)=>{
    return (
        <div className='dashboardPage'>
            <div >
                <h1>Dashboard</h1>
                <div className="boxes"> 
                    <div className="items">
                        <div>
                            <div className="total">{props.items.length}</div>
                            Total Items
                        </div>
                        <ItemsIcon className ='large-icon'/>     
                    </div>
                    <div className="users">
                        <div>
                            <div className="total">{props.users.length}</div>
                            Total Users
                        </div>
                        <UsersIcon className ='large-icon'/> 
                    </div>
                    <div className="categories">
                        <div>
                            <div className="total">{props.categories.length}</div>
                            Total Categories
                        </div>
                        <ItemsIcon className ='large-icon'/> 
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Dashboard