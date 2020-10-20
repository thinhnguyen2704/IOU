import React, { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "./style.css";
import { Button, IconButton, Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useHistory } from "react-router-dom";
import axios from "../../hoc/axios";
import { useUserStatus } from "../../hoc/UserContext/UserContext";
import { useLoading } from "../../hoc/LoadingContext/LoadingContext";

const DEFAULT_IMG =
  "https://www.kenyons.com/wp-content/uploads/2017/04/default-image.jpg";

function DebtAdd(props) {
  const [{ user }, dispatch] = useUserStatus();
  const [loading, setLoading] = useLoading();
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [person, setPerson] = useState();
  const [inputList, setInputList] = useState([{ id: "", quantity: 1 }]);
  const [img, setImg] = useState();
  const [proof, setProof] = useState();
  let history = useHistory();

  useEffect(() => {
    const getPrizeList = async () => {
      const res = await axios.get("/api/prize/");
      const items = res.data;

      setItems(items);
    };

    const getUsersList = async () => {
      const res = await axios.get("/api/user/users");
      const data = res.data;

      //REMOVE my ID
      const myID = user.userID;
      const idx = data.findIndex((user, index) => user["_id"] == myID);

      const list = [...data];
      list.splice(idx, 1);

      setUsers(list);
    };

    getPrizeList();
    getUsersList();
  }, []);

  function handleChangePerson(e) {
    setPerson(e.target.value);
  }

  function handleInputChange(e, index) {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  }

  function handleRemoveInputField(index) {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  }

  function handleAddInputField() {
    if (inputList.length < items.length) {
      setInputList([...inputList, { id: "", quantity: 1 }]);
    } else {
      alert("Cant add more type of reward");
    }
  }

  function cancel(e) {
    history.push("/debts");
  }

  const handleUpload = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    setProof(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!person || (inputList.length == 1 && inputList[0].id == "")) {
      alert("Please insert all required fields");
    } else {
      props.onAdd();
      setLoading((prev) => !prev);
      if (proof) {
        let createdImage;

        const fd = new FormData();
        fd.append("image", proof, proof.name);

        axios
          .post("https://api.imgur.com/3/upload", fd, {
            headers: {
              Authorization: "Client-ID 8fc1c1863ad18a9",
            },
          })
          .then((res) => {
            createdImage = res.data.data.link;
            const params = {
              ownerID: person,
              debtorID: user.userID,
              items: [...inputList],
              createdImage: createdImage,
            };

            axios
              .post("/api/favor/create", params, {
                headers: {
                  Authorization: user.token,
                },
              })
              .then(() => {
                setLoading((prev) => !prev);
                window.location.reload();
              })
              .catch((err) => {
                setLoading((prev) => !prev);
                alert(err);
              });
          })
          .catch((err) => {
            setLoading((prev) => !prev);
            alert(err);
          });
      } else {
        const params = {
          ownerID: person,
          debtorID: user.userID,
          items: [...inputList],
        };

        axios
          .post("/api/favor/create", params, {
            headers: {
              Authorization: user.token,
            },
          })
          .then(() => {
            setLoading((prev) => !prev);
            window.location.reload();
          })
          .catch((err) => {
            setLoading((prev) => !prev);
            alert(err);
          });
      }
    }
  };

  return (
    <div className="favorAdd">
      <h1>Add debt of you</h1>
      <div className="favorAdd__body">
        <div className="favorAdd__left">
          <div className="favorAdd__chooseFrom">
            <p>
              To: <span style={{ color: "red" }}>(Required)</span>
            </p>
            <Select
              id="choosePerson"
              value={person}
              onChange={handleChangePerson}
              style={{ width: "20ch" }}
            >
              {users.map((user, index) => (
                <MenuItem value={user["_id"]} key={index}>
                  {user["userName"]}
                </MenuItem>
              ))}
            </Select>
          </div>
          <p>
            Items: <span style={{ color: "red" }}>(Required)</span>
          </p>
          {inputList.map((item, index) => {
            return (
              <div>
                <div className="favorAdd__chooseItems">
                  <Select
                    id="chooseItem"
                    name="id"
                    value={item.id}
                    onChange={(e) => handleInputChange(e, index)}
                  >
                    {items.map((prize, index) => (
                      <MenuItem value={prize["_id"]} key={index}>
                        {prize["prize"]}
                      </MenuItem>
                    ))}
                  </Select>

                  <Input
                    className="favorAdd__itemNumber"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index)}
                    inputProps={{
                      type: "number",
                      min: 0,
                      max: 100,
                    }}
                  />
                  {inputList.length !== 1 && (
                    <IconButton onClick={() => handleRemoveInputField(index)}>
                      <RemoveIcon />
                    </IconButton>
                  )}
                </div>
                {inputList.length - 1 === index && (
                  <IconButton onClick={handleAddInputField}>
                    <AddIcon />
                  </IconButton>
                )}
              </div>
            );
          })}
        </div>
        <div className="favorAdd__right">
          <div className="favorAdd__proof">
            <p>Proof (Optional)</p>
            <img src={img ? img : DEFAULT_IMG} width={200} height={200} />
            <br />
            <Input onChange={handleUpload} inputProps={{ type: "file" }} />
          </div>
          <div className="favorAdd__buttons">
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Create Debt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebtAdd;
