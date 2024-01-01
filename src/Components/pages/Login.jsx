import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "top-right",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "top-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:5000/login",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
        });
    };

    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh" >
            <Card style={{ padding: "20px", width: "500px" }}>
                <h2>Login</h2>
                <Grid>
                    <label htmlFor="email">Email</label>
                    <TextField
                        type="email"
                        name="email"
                        value={email}
                        fullWidth
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                        size='small'

                    />
                </Grid>
                <Grid sx={{ mt: 2 }}>
                    <label htmlFor="password">Password</label>
                    <TextField
                        type="password"
                        name="password"
                        value={password}
                        fullWidth
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                        size='small'
                    />
                </Grid>
                <Grid sx={{ marginTop: 5 }}>
                    <Button variant="contained" onClick={handleSubmit}>Login</Button>
                </Grid>
            </Card>
            <ToastContainer />
        </Box>
    );
};

export default Login;