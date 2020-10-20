import React from 'react';
import {Container, TextField, Button, ButtonGroup} from '@material-ui/core';
import { Link, Route, useHistory } from 'react-router-dom';
import {useUserStatus} from '../../hoc/UserContext/UserContext';
import Active from '../../components/Active';
import DebtsLeaderboard from '../../components/DebtsLeaderboard';
import "./styles.css";

function Leaderboard() {

    const user = useUserStatus();
    const history = useHistory();

    return (
        <div>
             <Container fixed style={{backgroundColor: '#ffffff', padding: 50}}>
                <h1>Leaderboard</h1>
                <p className="board-description">"The leaderboard show the users with the least number of debts and users with the most number of resolved requests, click on either of the buttons below to discover the leaderboard!"</p>
                {/* Router to debts and active */}
                <ButtonGroup  aria-label="contained primary button group">
                        <Button variant="contained" color="primary" onClick={()=>{history.push("/leaderboard/debts")}}>Debts</Button>
                        <Button variant="contained" color="secondary" onClick={()=>{history.push("/leaderboard/active")}}>Active</Button>
                </ButtonGroup>
                <Route path="/leaderboard/active">
                    <Active />
                </Route>
                <Route path="/leaderboard/debts">
                    <DebtsLeaderboard />
                </Route>
            </Container>
        </div>
    )
}

export default Leaderboard
