import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
import Home from "./Pages/Home";
import Room from "./Components/Room";
import "./Style.css";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStateProvider>
                <div className="container">
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                        <Room />
                    </main>
                </div>
            </GlobalStateProvider>
        </BrowserRouter>
    );
}
