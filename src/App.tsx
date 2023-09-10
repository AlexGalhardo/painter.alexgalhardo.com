import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
import Home from "./Pages/Home";
import Room from "./Components/Room";
import "./Style.css";
import { CSSProperties } from "react";

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
                <footer style={center}>
                    <h3>
                        Made by{" "}
                        <a href="https://github.com/alexgalhardo" target="_blank">
                            Alex Galhardo
                        </a>
                    </h3>
                </footer>
            </GlobalStateProvider>
        </BrowserRouter>
    );
}

const center: CSSProperties = {
    textAlign: "center",
    margin: "30px 0px 10px 0px",
};
