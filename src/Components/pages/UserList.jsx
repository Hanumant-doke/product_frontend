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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function UserList() {
    const [users, setUsers] = React.useState([])

    const navigate = useNavigate();

    React.useEffect(() => {
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

    const removeUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/delete-user/${userId}`);
            const updatedUsers = users.filter((user) => user._id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const AddUser = () => {
        navigate("/user/add")
    }

    return (<div>
        <Card style={{ margin: "20px" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell align="right">Username</StyledTableCell>
                            <StyledTableCell align="right">PhoneNumber</StyledTableCell>
                            <StyledTableCell align="right">Gender</StyledTableCell>
                            <StyledTableCell align="right">Images</StyledTableCell>
                            <StyledTableCell align="right">Country</StyledTableCell>
                            <StyledTableCell align="right">State</StyledTableCell>
                            <StyledTableCell align="right">Skills</StyledTableCell>
                            <StyledTableCell align="right">Role</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow key={user._id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.email}
                                </StyledTableCell>
                                <StyledTableCell align="right">{user.username}</StyledTableCell>
                                <StyledTableCell align="right">{user.phoneNumber}</StyledTableCell>
                                <StyledTableCell align="right">{user.gender}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <img
                                        src={user.images}
                                        alt="User Image"
                                        style={{ height: '60px', width: '50px' }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="right">{user.country}</StyledTableCell>
                                <StyledTableCell align="right">{user.state}</StyledTableCell>
                                <StyledTableCell align="right">{user.skills}</StyledTableCell>
                                <StyledTableCell align="right">{user.role}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" onClick={() => removeUser(user._id)}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button sx={{ mt: 2, mb: 2, left: 10 }} variant="contained" onClick={AddUser}>Add User</Button>
        </Card>
    </div>);
}
