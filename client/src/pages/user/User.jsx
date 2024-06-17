
import React from 'react';
import { useLoaderData } from 'react-router-dom';


const userInfo = () => {
    const user = useLoaderData();
    
    return (
        <>
        {/* informacion de usuario */}
        <article className="user-card" key={user._id}>
    
            <h2>{user.username}</h2>
            <p>{user.lastname}</p>
    
            <p>{user.email}</p>
            <p>{user.phone}</p>
       
        </article>
        
        {/* informacion dirección */}
        <article>
        <p>{user.user_direction}</p>
    
        </article>
    
        {/* informacion Favoritos y CarritosComprados */}
        <article>
            <div></div>
            <div></div>
        </article>
        </>
    );
};
   


export default userInfo;