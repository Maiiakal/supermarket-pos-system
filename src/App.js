import "bootstrap/dist/css/bootstrap.min.css";

import FilterableProductTable from "./components/FilterableProductTable";
import FilterableCategoryTable from "./components/FilterableCategoryTable";
import NavBar from "./components/Navigation/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <FilterableCategoryTable />
    </>
  );
}

export default App;
