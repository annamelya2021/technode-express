import React, { useState, useEffect } from 'react';
import { createProduct, allUsers } from "../../utils/fetch";
import "./AdminPanel.css";

const initialState = {
    product_image: "",
    product_name: "",
    product_description: "",
    product_model: "",
    product_price: "",
    product_type: "", 
    product_amount: ""   
};

const AdminPanel = () => {
    const [data, setData] = useState(initialState);
    const [users, setUsers] = useState([]);
    const [adminCount, setAdminCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const getUsers = async () => {
            const result = await allUsers();
            setUsers(result.data);
            const adminCount = result.data.filter(user => user.role === 'admin').length;
            const userCount = result.data.filter(user => user.role === 'user').length;
            setAdminCount(adminCount);
            setUserCount(userCount);
        };
        getUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await createProduct(data);
        if (result) {
            alert("Product added successfully!");
            setData(initialState); // Clear form fields
        } else {
            alert("Error adding product.");
        }
        console.log(result);
    };

    return (
        <div>
            <h1>Welcome Administrator</h1>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="product_image">Product Image</label>
                <input type="text" name="product_image" value={data.product_image} onChange={(e) => setData({...data, product_image: e.target.value})}/>
                
                <label htmlFor="product_name">Product Name</label>
                <input type="text" name="product_name" value={data.product_name} onChange={(e) => setData({...data, product_name: e.target.value})}/>
                
                <label htmlFor="product_description">Product Description</label>
                <input type="text" name="product_description" value={data.product_description} onChange={(e) => setData({...data, product_description: e.target.value})}/>
                
                <label htmlFor="product_model">Product Model</label>
                <input type="text" name="product_model" value={data.product_model} onChange={(e) => setData({...data, product_model: e.target.value})}/>
                
                <label htmlFor="product_price">Product Price</label>
                <input type="text" name="product_price" value={data.product_price} onChange={(e) => setData({...data, product_price: e.target.value})}/>
                
                <label htmlFor="product_type">Product Type</label>
                <select name="product_type" value={data.product_type} onChange={(e) => setData({...data, product_type: e.target.value})}>
                    <option value="">Choose Type</option>
                    <option value="mobile">Mobile</option>
                    <option value="laptop">Laptop</option>
                </select>

                <label htmlFor="product_amount">Product Amount</label>
                <input type="text" name="product_amount" value={data.product_amount} onChange={(e) => setData({...data, product_amount: e.target.value})}/>
                
                <button type="submit">Submit</button>
            </form>
            <div>
                <p>We have {userCount} users registered.</p>
                <p>We have {adminCount} admins registered.</p>
            </div>
        </div>
    );
};

export default AdminPanel;
