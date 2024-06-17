import { getToken } from "./local";

const API_URL = import.meta.env.VITE_BACKEND_URL
const fetchData = async (route, method, inputData = null) => {
    const url = new URL(API_URL + route);
    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };
    if (inputData) {
      if (method === "get") {
        Object.keys(inputData).forEach(key => {
          url.searchParams.append(key, inputData[key]);
        });
      } else if (method === "post" || method === "put" || method === "patch") {
        fetchOptions.body = JSON.stringify(inputData);
      }
    }
    try {
      const result = await fetch(url.toString(), fetchOptions);
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return { error: error.message };
    }
};

const getUserData = async () => {
    const result = await fetchData("/users/bytoken", "get");
    return result;
};

  

const register = async(userData)=>{
    const result = await fetchData("/register","post",userData);
    return result;
}
const login = async(userData)=>{
    try {
        const result = await fetchData("/login","post",userData);

        return result;
    } catch (error) {
        console.error("Error during login:",error);
        return { error: error.message };
    }
}

const getProducts = async()=>{
    const result = await fetchData("/products","get");
    return result;
}
const getProduct = async(_id)=>{
    const result = await fetchData("/products/"+_id,"get");
    return result;
}
const createProduct = async(productData)=>{
    const result = await fetchData("/products","post",productData);
    return result;
}
const getComments = async(id)=>{
    const result = await fetchData(`/products/${id}/comments`,"get");
    return result;}

 const createComments = async(id, data)=>{
    const result = await fetchData(`/products/${id}/comments`,"post", data);
    return result;}
 
 const deleteComments = async(id, commentId)=>{
    const result = await fetchData(`/products/${id}/comments/${commentId}`,"delete");
    return result;
 }   
 const getCart = async () => {
    return await fetchData("/carts", "get");
};

const addProductToCart = async (productId) => {
    return await fetchData(`/carts/${productId}`, "post");
};

const updateQuantityInCart = async (productId, quantity) => {
    const result = await fetchData(`/carts/${productId}`, "patch", { quantity });
    return  result
};

const removeProductFromCart = async (productId) => {
    const result =  await fetchData(`/carts/${productId}`, "delete");
    return result
};

const clearCart = async () => {
    return await fetchData("/carts", "delete");
};

 
export {
    register,
    login,
    getProducts,
    getProduct,
    createProduct,
    getUserData,
    getComments,
    createComments,
    deleteComments,
    getCart,
    addProductToCart,
    updateQuantityInCart,
    removeProductFromCart,
    clearCart
}