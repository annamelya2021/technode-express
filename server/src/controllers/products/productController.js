import Product from '../../models/productModel.js';

const getAll = async () => {
    try {
      const products = await Product.find();
      console.log('products :>> ', products);
      return { error: null, data: products };
    } catch (error) {
      return { error: error.message, data: null };
    }
  };
  
  const getById = async (id) => {
    try {
      const product = await Product.findById(id).populate('product_comments');
      if (!product) {
        return { error: 'Product not found', data: null };
      }
      return { error: null, data: product };
    } catch (error) {
      return { error: error.message, data: null };
    }
  };
const create = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return { error: null, data: product };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

const update = async (id, productData) => {
  try {
    const product = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (!product) {
      return { error: 'Product not found', data: null };
    }
    return { error: null, data: product };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

const remove = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return { error: 'Product not found', data: null };
    }
    return { error: null, data: product };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove
};
