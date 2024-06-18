import React, { useState } from 'react'
// import {createProduct} from "../../utils/fetch";
import { Link, Outlet } from 'react-router-dom';


const AdminPanel = () => {
    
    return (
        <div>
            <Link to="/admin">Add new product</Link>
            <Link to="/admin/orders">Orders</Link>
            <Outlet />
        </div>

        
    )
}

export default AdminPanel