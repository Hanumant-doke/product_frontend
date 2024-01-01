import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./Components/pages/UserList";
import AddUser from "./Components/pages/AddUser";
import Login from "./Components/pages/Login";
import ProductSidebar from "./Components/sidebar/ProductSidebar";
import AddProduct from "./Components/pages/AddProduct";
import ProductList from "./Components/pages/ProductList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/home/*"
                    element={
                        <div style={{ display: "flex" }}>
                            <ProductSidebar />
                        </div>
                    }
                />
                <Route
                    path="/user/*"
                    element={
                        <div style={{ display: "flex" }}>
                            <ProductSidebar />
                            <main>
                                <Routes>
                                    <Route path="list" element={<UserList />} />
                                    <Route path="add" element={<AddUser />} />
                                </Routes>
                            </main>
                        </div>
                    }
                />
                <Route
                    path="/product/*"
                    element={
                        <div style={{ display: "flex" }}>
                            <ProductSidebar />
                            <main>
                                <Routes>
                                    <Route path="list" element={<ProductList />} />
                                    <Route path="add" element={<AddProduct />} />
                                </Routes>
                            </main>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
