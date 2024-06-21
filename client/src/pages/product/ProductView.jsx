import Product from "../../components/product/Product";

import { useLoaderData, Link } from 'react-router-dom';

const ProductView = () => {
    const product = useLoaderData()
    return (
        <Product product={product}/>
    )
}

export default ProductView
