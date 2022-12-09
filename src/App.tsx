import "./App.css";
import "@shopify/polaris/build/esm/styles.css";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Listing from "./components/Listing";
import Editcomponent from "./edit/Editcomponent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/listing" element={<Listing />} />
          <Route path="/listing/:id" element={<Editcomponent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
