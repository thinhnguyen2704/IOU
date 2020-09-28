import React, {useState, useEffect} from 'react';
import {Container, TextField, Button, ButtonGroup, IconButton, Dialog, DialogTitle} from '@material-ui/core';
import { Link, Route, Redirect, useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './style.css';
import AddIcon from '@material-ui/icons/Add';
import FavorAdd from '../../components/FavorAdd';

function Favors() {

    const[favorLists, setFavorLists] = useState([]);
    const [open, setOpen] = useState(false);
    let history = useHistory();

    function createData(favorsID, favors, from, status, initialProof, resolvedProof) {
        return {favorsID, favors, from, status, initialProof, resolvedProof};
    }

    const rows = [
        createData(1,['1 chocolate, 1 coffe'], 'Chris', false, 'image', 'image'),
        createData(2,['1 chocolate, 1 coffe'], 'Duc', false, 'image', 'image'),
        createData(3,['1 chocolate, 1 coffe'], 'Hailey', false, 'image', 'image'),
        createData(4,['1 chocolate, 1 coffe'], 'Thinh', false, 'image', 'image'),
    ];

    useEffect(() => {
        setFavorLists(rows)
    }, [])
    

    function handleComplete(id){
        if(window.confirm("Do you want to mark this favor as completed?")){
            rows[id].status = true;
            alert("Status:" + rows[id].status);
        };
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
        history.push("/favors");
    };    

    return (
        <div>
            <Container fixed style={{backgroundColor: '#ffffff', padding: 50}}>
                <div className="favor__heading">
                    <h1>Your Favors</h1>
                    <Link to="/favors/add">
                        <IconButton onClick={handleClickOpen}>
                            <AddIcon />
                        </IconButton>    
                    </Link>
                </div>
                {/* Router to debts and active */}
                <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Favors</TableCell>
                                <TableCell align="right">From</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Initial Proof</TableCell>
                                <TableCell align="right">Resolved Proof</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {favorLists.map((row) => (
                                <TableRow key={row.favorsID}>
                                <TableCell component="th" scope="row">
                                    {row.favors}
                                </TableCell>
                                <TableCell align="right">{row.from}</TableCell>
                                <TableCell align="right">{row.status ? "Completed" : "Uncompleted"}</TableCell>
                                <TableCell align="right">{row.initialProof}</TableCell>
                                <TableCell align="right">{row.resolvedProof}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                        <Button onClick={()=>handleComplete(row.favorsID)}>Mark as completed</Button>
                                    </ButtonGroup>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    {/* Route to favor add */}
                    <Route path="/favors/add">
                        <Dialog maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <FavorAdd />
                        </Dialog>
                    </Route>
            </Container>
        </div>
    )
}

export default Favors
