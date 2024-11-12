import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthContext } from "./contexts/AuthContext";
import { lazy, Suspense } from "react";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import SpinnerFullPage from "./Components/SpinnerFullPage";

const App = () => {
  return (
    <AuthContext>
      <CitiesProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <Router>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="Pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </Suspense>
      </CitiesProvider>
    </AuthContext>
  );
};

export default App;
