import { useLoaderData } from 'react-router-dom';

import './Profile.css'

const Profile = () => {
    // const user = useLoaderData();
    
    return (
        <>
        <h1 className="profile-title">Profile</h1>
        {/* informacion de usuario */}
        {/* <article className="user-card" key={user._id}>
    
            <h2>{user.username}</h2>
            <p>{user.lastname}</p>
    
            <p>{user.email}</p>
            <p>{user.phone}</p>
       
        </article>
        
        {/* informacion dirección */}
        {/* <article>
        <p>{user.user_direction}</p>
    
        </article>
    
        {/* informacion Favoritos y CarritosComprados */}
        {/* <article>
            <div></div>
            <div></div>
        </article>  */}
  
        </>
    );
};
   

export default Profile
