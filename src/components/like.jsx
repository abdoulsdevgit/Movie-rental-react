import React, { Component } from 'react';


const Like = ({onLiked, liked, movie}) => {

    let classes = "fa fa-heart";
    classes += liked ? "": "-o";
    
    return ( 
        <div
            style={{cursor: 'pointer'}}
            onClick={() => onLiked(movie)}>
            <i className={classes} aria-hidden="true"></i>
        </div>   
    );
   
}
 
export default Like;