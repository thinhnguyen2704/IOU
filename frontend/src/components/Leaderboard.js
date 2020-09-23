import React from 'react';
import {Container, TextField, Button, ButtonGroup} from '@material-ui/core';
import { Link, Route } from 'react-router-dom';

function Leaderboard() {
    return (
        <div>
             <Container fixed style={{backgroundColor: '#ffffff', padding: 50}}>
                <h1>Leaderboard</h1>
                {/* Router to debts and active */}
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Link to="/leaderboard/debts">
                        <Button>Debts</Button>
                    </Link>    
                    <Link to="/leaderboard/active">
                        <Button>Active</Button>
                    </Link> 
                </ButtonGroup>
                <Route path="/leaderboard/active">
                    <h1>Active</h1>
                </Route>
                <Route path="/leaderboard/debts">
                    <h1>Debts</h1>
                </Route>
            </Container>
        </div>
    )
}

export default Leaderboard
