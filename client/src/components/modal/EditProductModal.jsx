import React, { useState, useEffect } from 'react';
import Modal from './Modal'; 
import './EditProductModal.css'; 

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    product_image: '',
    product_name: '',
    product_description: '',
    product_model: '',
    product_price: '',
    product_type: '',
    product_amount: ''
  });

  useEffect(() => {
    console.log('Editing product:', product);
    if (product) {
      setFormData({
        product_image: product.product_image,
        product_name: product.product_name,
        product_description: product.product_description,
        product_model: product.product_model,
        product_price: product.product_price,
        product_type: product.product_type,
        product_amount: product.product_amount
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
   
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal onClose={onClose}>
      <div className="edit-product-modal">
        <div className="edit-product-content">
          {/* <span className="close" onClick={onClose}>&times;</span> */}
          <h2>Edit Product</h2>
          <div className="form-group">
            <label htmlFor="product_image">Product Image:</label>
            <input
              type="text"
              id="product_image"
              value={formData.product_image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_name">Product Name:</label>
            <input
              type="text"
              id="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_description">Description:</label>
            <textarea
              id="product_description"
              value={formData.product_description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_model">Model:</label>
            <input
              type="text"
              id="product_model"
              value={formData.product_model}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_price">Price:</label>
            <input
              type="number"
              id="product_price"
              value={formData.product_price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_type">Type:</label>
            <input
              type="text"
              id="product_type"
              value={formData.product_type}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_amount">Amount:</label>
            <input
              type="number"
              id="product_amount"
              value={formData.product_amount}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;


// <div className="modal-edit" onClick={handleEditClose}>
// <div className="modal-edit-content" onClick={(e) => e.stopPropagation()}>
//     <span className="close" onClick={handleEditClose}>&times;</span>
//     <h2>Edit Product</h2>
//     <form onSubmit={handleEditSave}>
//         <label htmlFor="product_image">Product Image</label>
//         <input
//             type="text"
//             name="product_image"
//             value={editFormData.product_image}
//             onChange={(e) => setEditFormData({ ...editFormData, product_image: e.target.value })}
//         />

//         <label htmlFor="product_name">Product Name</label>
//         <input
//             type="text"
//             name="product_name"
//             value={editFormData.product_name}
//             onChange={(e) => setEditFormData({ ...editFormData, product_name: e.target.value })}
//         />

//         <label htmlFor="product_description">Product Description</label>
//         <input
//             type="text"
//             name="product_description"
//             value={editFormData.product_description}
//             onChange={(e) => setEditFormData({ ...editFormData, product_description: e.target.value })}
//         />

//         <label htmlFor="product_model">Product Model</label>
//         <input
//             type="text"
//             name="product_model"
//             value={editFormData.product_model}
//             onChange={(e) => setEditFormData({ ...editFormData, product_model: e.target.value })}
//         />

//         <label htmlFor="product_price">Product Price</label>
//         <input
//             type="number"
//             name="product_price"
//             value={editFormData.product_price}
//             onChange={(e) => setEditFormData({ ...editFormData, product_price: parseFloat(e.target.value) })}
//         />

//         <label htmlFor="product_type">Product Type</label>
//         <input
//             type="text"
//             name="product_type"
//             value={editFormData.product_type}
//             onChange={(e) => setEditFormData({ ...editFormData, product_type: e.target.value })}
//         />

//         <label htmlFor="product_amount">Product Amount</label>
//         <input
//             type="number"
//             name="product_amount"
//             value={editFormData.product_amount}
//             onChange={(e) => setEditFormData({ ...editFormData, product_amount: parseInt(e.target.value, 10) })}
//         />

//         <button type="submit">Save Changes</button>
//     </form>
// </div>
// </div>