import { getToken } from "./local";

const API_URL = import.meta.env.VITE_BACKEND_URL

const fetchData = async(route,method,inputData=null)=>{
    const url = new URL(API_URL + route);
    const fetchOptions = {
        method:method,
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    }
    if(inputData){
        if(method === "get"){
            Object.keys(inputData).forEach(key=>{
                url.searchParams.append(key,inputData[key]);
            })
        }
        else if(method === "post" || method === "put" || method === "patch"){
            fetchOptions.body = JSON.stringify(inputData);
        }
    }
    try {
        const result = await fetch(url.toString(),fetchOptions);
        const data  = await result.json();
        return data;
    } catch (error) {
        console.error(error);
        return ({error:error.message})
    }
}

const register = async(userData)=>{
    const result = await fetchData("/register","post",userData);
    return result;
}
const login = async(userData)=>{
    const result = await fetchData("/login","post",userData);
    console.log("login",result);
    return result;
}
const getUserData = async()=>{
    const result = await fetchData("/users/bytoken","get");
    return result;
}
const getProducts = async()=>{
    const result = await fetchData("/products","get");
    return result;
}
const getProduct = async(id)=>{
    const result = await fetchData("/products/"+id,"get");
    return result;
}
const createProduct = async(productData)=>{
    const result = await fetchData("/products","post",productData);
    return result;
}

export {
    register,
    login,
    getProducts,
    getProduct,
    createProduct,
    getUserData
}