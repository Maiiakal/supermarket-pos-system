import "bootstrap/dist/css/bootstrap.min.css";

import FilterableProductTable from "./components/FilterableProductTable";
import NavBar from "./components/Navigation/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <FilterableProductTable />
    </>
  );
}

export default App;
