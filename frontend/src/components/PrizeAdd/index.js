import React, { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, IconButton, Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from "../../hoc/axios";
import { useUserStatus } from "../../hoc/UserContext/UserContext";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useHistory } from "react-router-dom";

const PrizeAdd = (props) => {
  const content = props.request.requestContent;
  const history = useHistory();

  const [{ user }, dispatch] = useUserStatus();
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

  const addPrize = () => {
    if (user) {
      let res;
      try {
        axios.patch(
          `/api/request/update/${props.request._id}`,
          { rewards: [...items] },
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
      } catch (err) {
        alert(err);
      }
    } else {
      history.push(!user && "/login");
    }

    window.location.reload();
  };

  return (
    <div style={{ minWidth: 500 }}>
      <DialogTitle id="alert-dialog-title">
        <b>Request:</b> {content}
      </DialogTitle>
      <DialogContent>
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
                  <MenuItem value={prize["_id"]} key={prize["_id"]}>
                    {prize["prize"]}
                  </MenuItem>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={addPrize} color="primary" variant="contained">
          Add rewards
        </Button>
      </DialogActions>
    </div>
  );
};

export default PrizeAdd;
