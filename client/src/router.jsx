import {createBrowserRouter,redirect} from "react-router-dom";
import { getProducts,getProduct, getCartOpened, getUserData } from "./utils/fetch";
import { getToken } from "./utils/local"; 
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/register/Register";
import ProductList from "./pages/product/ProductList";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart"
// import UserInfo from "./pages/user/User"
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Profile from "./pages/Profile/Profile";

async function fetchProducts(){
    const result = await getProducts();
    if(result.error){
        return redirect("/register");
    }
    return result.data;
}

async function fetchProduct(_id){
  const result = await getProduct(_id);
  if(result.error){
      return redirect("/register");
  }
  return result.data;
}
async function fetchCartOpened(){
  const result = await getCartOpened();
  console.log("carrito",result)
  if(result.error){
      return redirect("/products");
  }
  return result;
}

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <h1>WELLCOME TO TECHNODE-EXPRESS</h1>
        },
        
        {
          path: "/products",
          element: <ProductList />,
          loader: () => fetchProducts()
      },
        {
            path: "/products/:id",
            element: <Product />,
            loader: ({params}) => fetchProduct(params.id)
        },
        {
          path: "/carts",
          element: <Cart />,
          loader: () => fetchCartOpened()
        },

        {
            path: "/admin",
            element: <AdminPanel/>,
            loader: async () => {
                const token = getToken();
                if (!token) {
                  return redirect("/");
                }
                const { data } = await getUserData();
                if (data.role !== "admin") {
                  return redirect("/products");
                }
                return null;
              },
          },
          {
            path: "/profile",
            element: <Profile/>,
            loader: async () => {
                const token = getToken();
              if (!token) {
                return redirect("/products");
              }
              const { data } = await getUserData();
              if (data.role !== "user") {
                return redirect("/products");
              }
              return data;
            },
          }
      ]
    },
    {
        path: "/register",
        element: <Register />
    }
      // {
        //     path: "/projects/:id",
        //     element: <Project />,
        //     loader: ({params}) => fetchProject(params.id)
        // },
    
  ]);

export default router;