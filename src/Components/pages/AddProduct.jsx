import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


const AddProduct = () => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        productName: "",
        image: [],
        description: "",
        price: 0
    });

    const { productName, image, description, price } = inputValue;

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
                "http://localhost:5000/create",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/product/list");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            productName: "",
            image: [],
            description: "",
            price: 0
        });
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const onBack = () => {
        navigate("/product/list")
    }
    return (
        <Box padding={3}>
            <Card style={{ padding: "20px" }}>
                <Typography style={{ fontSize: 18, fontWeight: "bold" }}>Add User</Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} >
                        <label htmlFor="productName">Product Name</label>
                        <TextField
                            type="text"
                            name="productName"
                            value={productName}
                            onChange={handleOnChange}
                            fullWidth
                            placeholder="Enter your pname"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <label htmlFor="image">Image</label>
                        <TextField
                            type="text"
                            name="image"
                            fullWidth
                            onChange={handleOnChange}
                            value={image}
                            placeholder="Enter your image url"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            id="description"
                            type='text'
                            name='description'
                            fullWidth
                            onChange={handleOnChange}
                            value={description}
                            label="Description"
                            placeholder="Add Description"
                            multiline
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <label htmlFor="price">Price</label>
                        <TextField
                            type="number"
                            name="price"
                            fullWidth
                            value={price}
                            onChange={handleOnChange}
                            placeholder="Enter your price"
                            size='small'
                        />
                    </Grid>
                </Grid>
                <Grid container style={{ justifyContent: "space-between", marginTop: 20 }}>
                    <Grid>
                        <Button variant='contained' color='error' onClick={onBack}>Back</Button>
                    </Grid>
                    <Grid>
                        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </Card>
            <ToastContainer />
        </Box>
    )
}

export default AddProduct;