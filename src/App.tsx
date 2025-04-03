import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Box height={"100vh"} bg={"#fff"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
