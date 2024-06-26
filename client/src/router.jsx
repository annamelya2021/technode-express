

import { createBrowserRouter, redirect } from "react-router-dom";
import { getProducts, getProduct, getCartOpened, getUserData } from "./utils/fetch";
import { getToken } from "./utils/local";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/register/Register";
import ProductList from "./pages/product/ProductList";
import ProductView from "./pages/product/ProductView";
import Cart from "./pages/cart/Cart"
// import UserInfo from "./pages/user/User"
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home.jsx";
import Product from "./components/product/Product.jsx";

async function fetchProducts() {
  const result = await getProducts();
  if (result.error) {
    return redirect("/register");
  }
  return result.data;
}

async function fetchProduct(_id) {
  const result = await getProduct(_id);
  if (result.error) {
    return redirect("/register");
  }
  return result.data;
}

async function fetchCartOpened() {
  const result = await getCartOpened();
  console.log("carrito", result);
  if (result.error) {
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
        element: <Home />
      },
      {
        path: "/products",
        element: <ProductList />,
        loader: fetchProducts
      },
      {
        path: "/products/:id",
        element: <ProductView />,
        loader: ({ params }) => fetchProduct(params.id)
      },
      {
        path: "/carts",
        element: <Cart />,
        loader: fetchCartOpened
      },
      {
        path: "/admin",
        element: <AdminPanel />,
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
        element: <Profile />,
        loader: async () => {
          const token = getToken();
          if (!token) {
            return redirect("/products");
          }
          const { data } = await getUserData();
          if (data.role !== "user") {
            return redirect("/products");
          }
          return null;
        },
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  }
]);

export default router;
