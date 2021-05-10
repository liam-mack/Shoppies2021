import Login from "../pages/Login/Login";
import Nominated from "../pages/Nominated/Nominated";
import Search from "../pages/Search/Search";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Awards from "../pages/Awards/Awards";
import Contact from "../pages/Contact/Contact";

// configure the privacy of pages for authorization purposes
const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/signup",
    component: Signup,
    isPrivate: false,
  },
  {
    path: "/home",
    component: Home,
    isPrivate: true,
  },
  {
    path: "/nominated",
    component: Nominated,
    isPrivate: true,
  },
  {
    path: "/search",
    component: Search,
    isPrivate: true,
  },
  {
    path: "/awards",
    component: Awards,
    isPrivate: true,
  },
  {
    path: "/contact",
    component: Contact,
    isPrivate: true,
  },
  {
    path: "/",
    component: Login,
    isPrivate: false,
  },
];

export default routes;
