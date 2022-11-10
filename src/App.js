import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import FilterableProductTable from "./components/FilterableProductTable";
import FilterableCategoryTable from "./components/FilterableCategoryTable";
import POS from "./components/pos";
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Navigation/Footer";


function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/product-table" element={<FilterableProductTable />} />
          <Route path="/category-table" element={<FilterableCategoryTable />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/" element={<POS />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
