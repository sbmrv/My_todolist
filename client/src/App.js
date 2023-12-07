import { Route, Routes, BrowserRouter } from "react-router-dom";
// import { Route, Routes} from "react-router-dom";
import "./App.css"
import Login from "./components/login";
import Signup from "./components/signup";
import Todo from "./components/todo";
import Home from "./components/home"
// import Navbar from "./components/navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home className="home"/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
