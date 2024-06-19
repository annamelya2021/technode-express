// ProfileFavoriteProducts.jsx
import React, { useContext } from 'react';
import { useProductActions } from './ProductUtils';
import UserContext from '../../context/userContext';

const ProfileFavoriteProducts = ({ product }) => {
    const { user } = useContext(UserContext);
    const { isFavorite, handleToggleFavorite } = useProductActions(product, user);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="favorite-product">
            <img src={product.product_image} alt={product.product_name} />
            <div className="favorite-product-details">
                <h3>{product.product_name}</h3>
                <p>{product.product_description}</p>
                <button onClick={handleToggleFavorite}>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default ProfileFavoriteProducts;

