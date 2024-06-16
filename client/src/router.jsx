import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/register/Register";
import ProductList from "./pages/product/ProductList";
import Product from "./pages/product/ProductCard";
import { getProducts, getProduct, getUserData } from "./utils/fetch";
import { getToken } from "./utils/local";
import ProtectedAdminRoute from "./routes/protectedAdminRoutes";
import AdminPanel from "./pages/admin/AdminPanel";
import FavoriteProducts from "./pages/favorites/FavoriteProducts";
import Cart from "./pages/cart/Cart";


async function fetchProducts() {
  const result = await getProducts();
  return result.data;
}

async function fetchProduct(_id) {
  const result = await getProduct(_id);
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
            element: <h2>Welcome to</h2>
        },
        {
        path: "/products",
        element: <ProductList/>,
        },
    //     loader: async () => {
    //       const products = await fetchProducts();
    //       if (!products) {
    //         throw new Error('Failed to load products');
    //       }
    //       return products; // Повертаємо продукти
    //     },
    //   },
      {
        path: "/admin",
        element: <AdminPanel/>,
        loader: async () => {
          const token = getToken();
          if (!token) {
            return redirect("/");
          }
          const { data } = await getUserData();
        //   console.log("dataROLE", data);
          if (data.role !== "admin") {
            return redirect("/products");
          }
          return null;
        },
      },
      {
        path: "/cart",
        element: <Cart/>,
        loader: async () => {
            const token = getToken();
          if (!token) {
            return redirect("/products");
          }
          return null;
        },
      },
      {
        path: "/favorites",
        element: <FavoriteProducts/>,
        // loader: async () => {
        //     const token = getToken();
        //   if (!token) {
        //     return redirect("/products");
        //   }
        //   return null;
        // },
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
