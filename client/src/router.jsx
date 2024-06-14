import {createBrowserRouter,redirect} from "react-router-dom";
import { getProducts,getProduct } from "./utils/fetch";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/register/Register";
import ProductList from "./pages/product/ProductList";
import Product from "./pages/product/Product";

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

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <h2>Hola Mundo</h2>
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