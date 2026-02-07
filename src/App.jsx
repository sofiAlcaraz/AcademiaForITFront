import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Task from "./pages/Task";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<Task />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
