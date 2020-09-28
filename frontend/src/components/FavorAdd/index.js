import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './style.css';
import { Button, IconButton, Input } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router-dom';

function FavorAdd() {

    const [person, setPerson] = useState();
    const [item, setItem] = useState();
    const [itemNum, setItemNum] = useState();
    let history = useHistory();
    
    function handleChangePerson(e){
        setPerson(e.target.value);
    }

    function handleChangeItem(e){
        setItem(e.target.value);
    }

    function handleChangeItemNum(e){
        setItemNum(e.target.value);
    }

    function handleRemove(){
        alert("Removed");
    }

    function handleAdd(){
        alert("Added!");
    }

    function cancel(){
        history.push('/favors');
    }

    return (
        <div className="favorAdd">
            <h1>Add favor for you</h1>
            <div className="favorAdd__body">
                <div className="favorAdd__left">
                    <div className="favorAdd__chooseFrom">
                        <p>From: </p>
                        <Select 
                            id="choosePerson"
                            value={person}
                            onChange={handleChangePerson}
                            style = {{width: '20ch'}}
                        >
                            <MenuItem value="Chris">Chris</MenuItem>
                            <MenuItem value="Hailey">Hailey</MenuItem>
                            <MenuItem value="Duc">Duc</MenuItem>
                            <MenuItem value="Thinh">Thinh</MenuItem>
                        </Select>
                    </div>
                    <div className="favorAdd__chooseItems">
                        <p>Items: </p>
                        <Select
                            id="chooseItem"
                            value={item}
                            onChange={handleChangeItem}
                        >
                            <MenuItem value="Chocolate">Chocolate</MenuItem>
                            <MenuItem value="Coffee">Coffee</MenuItem>
                            <MenuItem value="Candy">Candy</MenuItem>
                            <MenuItem value="Tea">Tea</MenuItem>
                        </Select>
                        <Input
                            className="favorAdd__itemNumber"
                            onChange={handleChangeItemNum}
                            inputProps={{
                                type: 'number',
                                min: 0,
                                max: 100,
                            }}
                        />
                        <IconButton onClick={handleRemove}>
                            <RemoveIcon />
                        </IconButton>
                    </div>
                    <IconButton onClick={handleAdd}>
                        <AddIcon />
                    </IconButton> 
                </div>
                <div className="favorAdd__right">
                    <div className="favorAdd__proof">
                        <p>Proof Required</p>
                        <Input inputProps={{type: 'file'}}/>
                    </div>
                    <div className="favorAdd__buttons">
                        <Button>Create Favor</Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavorAdd;
