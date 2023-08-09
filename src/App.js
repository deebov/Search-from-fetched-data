import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";

function App() {
    return (
        <Routes>
            <Route path="/posts">
                <Route index element={<Posts />} />
                <Route path=":page" element={<Posts />} />
            </Route>
        </Routes>
    );
}

export default App;
