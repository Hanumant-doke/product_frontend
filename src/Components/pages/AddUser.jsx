import { Box, Button, Card, Grid, Input, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const AddUser = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        username: "",
        phoneNumber: "",
        gender: "",
        images: [],
        country: "",
        state: "",
        skills: [],
        role: "",
        password: "",
    });

    const { email, username, phoneNumber, gender, images, country, state, skills, role, password } = inputValue;

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
                "http://localhost:5000/create-user",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/user/list");
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
            username: "",
            phoneNumber: "",
            gender: "",
            images: [],
            country: "",
            state: "",
            skills: [],
            role: "",
            password: "",
        });
    };

    return (
        <Box padding={3}>
            <Card style={{ padding: "20px" }}>
                <Typography style={{ fontSize: 18, fontWeight: "bold" }}>Add User</Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={4} >
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
                    <Grid item xs={4} >
                        <label htmlFor="username">User Name</label>
                        <TextField
                            type="text"
                            name="username"
                            value={username}
                            fullWidth
                            placeholder="Enter your username"
                            onChange={handleOnChange}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <TextField
                            type="number"
                            name="phoneNumber"
                            value={phoneNumber}
                            fullWidth
                            placeholder="Enter your phoneNumber"
                            onChange={handleOnChange}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="gender">Gender</label>
                        <TextField
                            type="text"
                            name="gender"
                            value={gender}
                            fullWidth
                            placeholder="Enter your gender"
                            onChange={handleOnChange}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="images">Images</label>
                        <TextField
                            type="text"
                            name="images"
                            value={images}
                            fullWidth
                            placeholder="Enter your images url"
                            onChange={handleOnChange}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="country">Country</label>
                        <TextField
                            type="text"
                            name="country"
                            value={country}
                            fullWidth
                            placeholder="Enter your country"
                            onChange={handleOnChange}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="state">State</label>
                        <TextField
                            type="text"
                            name="state"
                            value={state}
                            fullWidth
                            placeholder="Enter your state"
                            onChange={handleOnChange}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="skills">Skills</label>
                        <TextField
                            type="text"
                            name="skills"
                            value={skills}
                            fullWidth
                            multiple
                            placeholder="Enter your skills"
                            onChange={handleOnChange}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="role">Role</label>
                        <TextField
                            type="text"
                            name="role"
                            value={role}
                            fullWidth
                            placeholder="Enter your role"
                            onChange={handleOnChange}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={4} >
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
                    <Grid item xs={6}></Grid>
                    <Grid style={{ marginTop: "15px" }} item xs={2}>
                        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </Card>
            <ToastContainer />
        </Box >
    )
}

export default AddUser;