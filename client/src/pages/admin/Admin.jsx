import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import CreateProduct from "../../components/product/CreateProduct";
import "./Admin.css";

const Admin = () => {
    const [products,setProducts] = useState(useLoaderData());
    const [creatingProduct,setCreatingProduct] = useState(false);
    
    return (
        <>
        <h1>Welcome Administrator</h1>
        
            {creatingProduct ?
            <Modal onClose={()=>setCreatingProduct(false)}>
                <CreateProduct onCreate={()=>setCreatingProduct(false)}/>
            </Modal>
            :
            <button onClick={()=>setCreatingProduct(true)}>New Product</button>
        }

        <div>
            <p>We have {user.length} users registered</p>
        </div>
        </>
    )
}

export default Admin