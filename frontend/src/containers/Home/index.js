import React from 'react';
import {Container, TextField, Button, ButtonGroup} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import {useUserStatus} from '../../hoc/UserContext'

function Home() {

    const [user,setUser] = useUserStatus();
    
    function createData(request, from, rewards) {
        return {request, from, rewards};
      }
      
      const rows = [
        createData('Clean the table', 'Chris', 'Candy'),
        createData('Tidy the room', 'Thinh', 'Pizza'),
        createData('Do homework', 'Hailey', 'Coffee'),
        createData('Deliver food', 'Duc', 'Tea'),
      ];
        
    return (
        <div className="home">
            <div className="home__data">
                <Container fixed style={{backgroundColor: '#ffffff', padding: 50}}>
                    <h1>Public requests</h1>
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Requests</TableCell>
                                <TableCell align="right">From</TableCell>
                                <TableCell align="right">Rewards</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.request}>
                                <TableCell component="th" scope="row">
                                    {row.request}
                                </TableCell>
                                <TableCell align="right">{row.from}</TableCell>
                                <TableCell align="right">{row.rewards}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                        <Link to={user ? "/favors/add" : "/login"}>
                                            <Button>Add Favor</Button>
                                        </Link>    
                                        <Link to={user ? "/favors/resolve" : "/login"}>
                                            <Button>Resolve</Button>
                                        </Link> 
                                    </ButtonGroup>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        </div>
    )
}

export default Home
