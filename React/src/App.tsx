import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./Components/Commons/Navbar";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: 1 }}>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path="/main" element={<div>hi</div>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

const CommonLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
