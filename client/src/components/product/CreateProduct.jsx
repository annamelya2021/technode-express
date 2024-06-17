import React, { useState } from "react";
import "./CreateProduct.css";

const CreateProduct = ({ onCreate }) => {
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        description: "",
        price: "",
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar la creación del producto.
        console.log("Producto creado:", formData);
        if (onCreate) onCreate();
    };

    return (
        <div className="modal">
            <div className="modal-body">
                <form className="create-product-form" onSubmit={handleSubmit}>
                    <h2>Create New Product</h2>
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <button type="submit">Create Product</button>
                    <button type="button" className="cancel-button" onClick={onCreate}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
