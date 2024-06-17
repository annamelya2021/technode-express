import { useState, useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import CreateProduct from "../../components/product/CreateProduct";
import UserContext from "../../context/userContext";

const AdminPanel = () => {
    const [products, setProducts] = useState(useLoaderData());
    const [creatingProduct, setCreatingProduct] = useState(false);
    const { user } = useContext(UserContext);

    const handleCreateProduct = (newProduct) => {
        setCreatingProduct(false);
    };

    return (
        <>
            <h1>Welcome Administrator</h1>
            {creatingProduct ? (
                <Modal onClose={() => setCreatingProduct(false)}>
                    <CreateProduct onCreate={handleCreateProduct} />
                </Modal>
            ) : (
                <button onClick={() => setCreatingProduct(true)}>New Product</button>
            )}

            <div>
                <p>We have {user.length} users registered</p>
            </div>

            
        </>
    );
};

export default AdminPanel;
