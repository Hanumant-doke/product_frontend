import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ProductList() {
    const [products, setProduct] = React.useState([])

    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-product');
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const removeProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/delete-product/${productId}`);
            const updatedproducts = products.filter((product) => product._id !== productId);
            setProduct(updatedproducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const AddProduct = () => {
        navigate("/product/add")
    }

    return (<div>
        <Card style={{ margin: "20px" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Product Name</StyledTableCell>
                            <StyledTableCell align="right">Product Image</StyledTableCell>
                            <StyledTableCell align="right">Discription</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <StyledTableRow key={product._id}>
                                <StyledTableCell component="th" scope="row">
                                    {product.productName}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <img
                                        src={product.image}
                                        alt="Product Image"
                                        style={{ height: '60px', width: '50px' }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="right">{product.description}</StyledTableCell>
                                <StyledTableCell align="right">{product.price}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" onClick={() => removeProduct(product._id)}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button sx={{ mt: 2, mb: 2, left: 10 }} variant="contained" onClick={AddProduct}>Add Product</Button>
        </Card>
    </div>);
}
