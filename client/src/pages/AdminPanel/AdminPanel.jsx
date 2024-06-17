import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import CreateProduct from "../../components/product/CreateProduct";
import UserContext from "../../context/userContext"; 

const AdminPanel = () => {
    const { user } = useContext(UserContext); 
    const [products, setProducts] = useState(useLoaderData());
    const [creatingProduct, setCreatingProduct] = useState(false);

    return (
        <>
            <h1>Welcome Administrator</h1>
        
            {creatingProduct ?
                <Modal onClose={() => setCreatingProduct(false)}>
                    <CreateProduct onCreate={() => setCreatingProduct(false)} />
                </Modal>
                :
                <button onClick={() => setCreatingProduct(true)}>New Product</button>
            }

            <div>
                <p>We have {user ? user.length : 0} users registered</p>
            </div>
        </>
    );
}

export default AdminPanel;
