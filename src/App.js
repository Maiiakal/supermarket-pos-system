import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import FilterableProductTable from "./components/FilterableProductTable";
import FilterableCategoryTable from "./components/FilterableCategoryTable";
import NavBar from "./components/Navigation/NavBar";


function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/product-table" element={<FilterableProductTable />} />
          <Route path="/category-table" element={<FilterableCategoryTable />} />
          <Route path="/" element={<FilterableCategoryTable />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
