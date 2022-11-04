import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./views/routes";
function App() {
    return (
        <BrowserRouter>
            <AllRoutes />
        </BrowserRouter>
    );
}

export default App;
