import React, { useEffect, useState, useReducer } from "react";
import "./styles.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, IconButton, Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useHistory } from "react-router-dom";
import axios from "../../hoc/axios";
import { useUserStatus } from "../../hoc/UserContext/UserContext";

function RequestAdd() {
  const [{ user }, dispatch] = useUserStatus();
  const [request, setRequest] = useState();
  const [prizes, setPrize] = useState([]);
  const [items, setItems] = useState([{ id: "", quantity: 1 }]);

  useEffect(() => {
    const getPrizeList = async () => {
      const res = await axios.get("/api/prize/");
      const prizes = res.data;

      setPrize(prizes);
    };

    getPrizeList();
  }, []);

  const handleAddItem = () => {
    if (items.length < prizes.length) {
      setItems([...items, { id: "", quantity: 1 }]);
    } else {
      alert("Cant add more type of reward");
    }
  };

  const handleChangeItem = (item, index) => {
    const list = [...items];
    list[index].id = item;
    setItems(list);
  };

  const handleChangeItemNum = (quantity, index) => {
    const list = [...items];
    list[index].quantity = quantity;
    setItems(list);
  };

  const handleRemoveItem = (index) => {
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
  };

  const addRequest = async () => {
    if (user) {
      if ((items.length == 1 && items[0].id == "") || !request) {
        alert("All fields must be filled in!");
      } else {
        const request_params = {
          requestContent: request,
          requestFavors: [
            {
              from: user.userID,
              rewards: [...items],
            },
          ],
          resolverID: null,
          resolverProof: null,
        };

        await axios
          .post("/api/request/create", request_params, {
            headers: {
              Authorization: user.token,
            },
          })
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("You must log in again to add a request!");
    }
  };

  return (
    <div className="req-dialog">
      <div className="req-dialog-content">
        <h1>Add a new request</h1>
        <div className="req-dialog-request">
          <div className="req-dialog-request text">
            <p>
              Request: <span style={{ color: "red" }}>(Required)</span>
            </p>
          </div>
          <div className="req-dialog-request-input">
            <textarea
              onChange={(e) => setRequest(e.target.value)}
              value={request}
              rows="4"
              cols="50"
            ></textarea>
          </div>
        </div>
        <div className="req-dialog-reward">
          <div className="req-dialog-reward text">
            <p>
              Rewards: <span style={{ color: "red" }}>(Required)</span>
            </p>
          </div>
          <div className="widgets">
            <p>Items: </p>
            <div>
              {items.map((item, index) => (
                <div className="req-chooseitem" key={index}>
                  <Select
                    id="chooseItem"
                    value={item.id}
                    onChange={(e) => handleChangeItem(e.target.value, index)}
                  >
                    {prizes.map((prize) => (
                      <MenuItem value={prize["_id"]}>{prize["prize"]}</MenuItem>
                    ))}
                  </Select>
                  <Input
                    style={{ minWidth: "10px" }}
                    className="req-chooseItemNum"
                    value={item.quantity}
                    onChange={(e) => handleChangeItemNum(e.target.value, index)}
                    inputProps={{
                      type: "number",
                      min: 1,
                      max: 10,
                    }}
                  />
                  {items.length > 1 && (
                    <IconButton onClick={() => handleRemoveItem(index)}>
                      <RemoveIcon />
                    </IconButton>
                  )}
                </div>
              ))}
            </div>
            {items.length == prizes.length ? null : (
              <IconButton onClick={handleAddItem}>
                <AddIcon />
              </IconButton>
            )}
          </div>
        </div>
        <div className="req-button">
          <Button onClick={addRequest} color="primary" variant="contained">
            Create Request
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RequestAdd;
