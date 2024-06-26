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
    console.log('Fetching:', url.toString(), fetchOptions);
    try {
        
      const result = await fetch(url.toString(), fetchOptions);
      console.log("result", result);

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      return data;
    } catch (error) {
      console.log('Fetch error:', error);
      return { error: error.message };
    }
  };
  
  

const register = async(userData)=>{
    const result = await fetchData("/register","post",userData);
    return result;
}
const login = async(userData)=>{
    try {
        const result = await fetchData("/login","post",userData);
        console.log("login",result);
        return result;
    } catch (error) {
        console.error("Error during login:",error);
        return { error: error.message };
    }
}
const update = async(userData)=>{
    const result = await fetchData("/users/"+userData._id,"put",userData);
    return result;
}

const getUserData = async()=>{
    const result = await fetchData("/users/bytoken","get");
    return result;
}
const allUsers = async()=>{
    const result = await fetchData("/users","get");
    return result;
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
const updateProduct = async(_id,productData)=>{
    const result = await fetchData("/products/"+_id,"put",productData);
    return result;
}
const createCart = async()=>{
    const result = await fetchData("/carts","post");
    return result;
}
const getCarts = async()=>{
    const result = await fetchData("/carts/history","get");
    return result;
}
const getCartOpened = async () => {
  const result = await fetchData("/carts/opened", "get");
  return result;
}

const addProductToCart = async (productId) => {
  const result = await fetchData(`/carts/products/${productId}`, "post");
  return result;
}

const removeProductFromCart = async (productId) => {
  const result = await fetchData(`/carts/products/${productId}`, "delete");
  return result;
}

const closeCart = async (cartId) => {
  const result = await fetchData("/carts/" + cartId + "/close", "post");
  return result;
} 

  const getComments = async(id)=>{
    const result = await fetchData(`/products/${id}/comments`,"get");
    return result;}

 const addComment = async(id, data)=>{
    const result = await fetchData(`/products/${id}/comments`,"post", data);
    return result;}
 
 const deleteComment = async(id, commentId)=>{
    const result = await fetchData(`/products/${id}/comments/${commentId}`,"delete");
    return result;
 }   


export {
    register,
    login,
    update,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    getUserData,
    createCart,
    getCarts,
    closeCart,
    getCartOpened,
    addProductToCart,
    removeProductFromCart,
    allUsers,
    addComment,
    deleteComment,
    getComments


}