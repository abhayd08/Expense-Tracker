import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
    </Routes>
  );
};

export default App;
