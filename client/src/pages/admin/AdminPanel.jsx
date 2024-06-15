import React, { useState } from 'react'
import {createProduct} from "../../utils/fetch";


const initialState = {
    product_image: "",
    product_name: "",
    product_description: "",
    product_model: "",
    product_price: "",
    product_type: "", 
    product_amount: ""   
}

const AdminPanel = () => {
    
    const [data, setData] = useState(initialState);

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const result = await createProduct(data);
        console.log(result);
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="image">product_image</label>
                <input type="text" name="image" onChange={(e) => setData({...data, product_image: e.target.value})}/>
                
                <label htmlFor="product_name">product_name</label>
                <input type="text" name="product_name" onChange={(e) => setData({...data, product_name: e.target.value})}/>
                
                <label htmlFor="product_description">product_description</label>
                <input type="text" name="product_description" onChange={(e) => setData({...data, product_description: e.target.value})}/>
                
                <label htmlFor="product_model">product_model</label>
                <input type="text" name="product_model" onChange={(e) => setData({...data, product_model: e.target.value})}/>
                
                <label htmlFor="product_price">product_price</label>
                <input type="text" name="product_price" onChange={(e) => setData({...data, product_price: e.target.value})}/>
                
                <label htmlFor="product_type">product_type</label>
                <select name="product_type" value={data.product_type} onChange={(e) => setData({...data, product_type: e.target.value})}>
                <option value="" default>choose type</option>
                    <option value="mobile">mobile</option>
                    <option value="laptop">laptop</option>
                </select>

                <label htmlFor="product_amount">product_amount</label>
                <input type="text" name="product_amount" onChange={(e) => setData({...data, product_amount: e.target.value})}/>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AdminPanel