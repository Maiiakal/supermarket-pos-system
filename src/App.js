import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FilterableProductTable from "./features/table/FilterableProductTable";
import FilterableCategoryTable from "./features/table/FilterableCategoryTable";
import { Cart } from "./features/cart/components/Cart";

import NavBar from "./features/Header/Header";
import Footer from "./features/Footer/Footer";
import {Provider} from "react-redux";
import Store from "./stores/configureStore"

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/product-table" element={<FilterableProductTable />} />
            <Route
              path="/category-table"
              element={<FilterableCategoryTable />}
            />
            <Route path="/shopping-cart" element={<Cart />} />
            <Route path="/" element={<Cart />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
