import React from 'react';
import {Avatar} from '@material-ui/core'



export default function Profile(name){
        
    return (
        <div style={{marginTop: '10px', marginLeft: '50px'}}>
            <h1>User Profile</h1>
            <Avatar style={{height: '150px', width: '150px', marginLeft: '15px'}}></Avatar>
            <h3 style={{paddingTop: '20px'}}>{`${name}`}</h3>
        </div>
    );
};

