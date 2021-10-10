import React from 'react';


const style='btn--primary--solid'
const size= 'btn--medium'

export const Button=({children, onClick})=>{
    return(
        <button className='add-button' onClick={onClick}>
            {children}
        </button>
    )
}