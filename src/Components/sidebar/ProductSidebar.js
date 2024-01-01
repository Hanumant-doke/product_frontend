import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Sidebar,
    Menu,
    MenuItem,
} from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "../../App.css";
import axios from "axios";
import { Button } from "@mui/material";

const ProductSidebar = () => {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-user');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const [collapsed, setCollapsed] = useState(false);
    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };

    console.log(users, 'users');

    const logout = () => {
        navigate("/")
    }
    return (
        <Sidebar
            collapsed={collapsed}
            style={{ height: "100vh" }}
        >
            <Menu>
                <MenuItem
                    icon={<MenuOutlinedIcon onClick={handleCollapseToggle} />}
                    style={{ textAlign: "center", cursor: "pointer" }}
                >
                    <h2>LOGO</h2>
                </MenuItem>
                <div>
                    <Link to="/user/list" className="menu-link">
                        <MenuItem icon={<PeopleOutlinedIcon />}>
                            User
                        </MenuItem>
                    </Link>
                    <Link to="/product/list" className="menu-link">
                        <MenuItem icon={<PeopleOutlinedIcon />}>
                            Product
                        </MenuItem>
                    </Link>
                </div>
            </Menu>
            <Button style={{ marginTop: "50vh" }} sx={{ margin: 5 }} onClick={logout} variant="contained">Logout</Button>
        </Sidebar>
    );
}

export default ProductSidebar;
