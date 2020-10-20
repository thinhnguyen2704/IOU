import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  ButtonGroup,
  IconButton,
  Dialog,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link, Route, useHistory } from "react-router-dom";
import { useUserStatus } from "../../hoc/UserContext/UserContext";
import AddIcon from "@material-ui/icons/Add";
import "./style.css";
import axios from "../../hoc/axios";
import RequestAdd from "../../components/RequestAdd";
import PrizeAdd from "../../components/PrizeAdd";
import ResolveModal from "../../components/ResolveModal";
import { useLoading } from "../../hoc/LoadingContext/LoadingContext";
import { ACTIONS } from "../../hoc/UserContext/reducer";
import TablePagination from "@material-ui/core/TablePagination";

function Home() {
  const [{ user }, dispatch] = useUserStatus();
  const [requests, setRequests] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openAddRw, setOpenAddRw] = useState(false);
  const [openResolve, setOpenReolve] = useState(false);
  const [selectRequest, setSelectRequest] = useState();
  const [loading, setLoading] = useLoading();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("/api/request/")
        .then((response) => {
          setRequests(response.data);
        })
        .catch((error) => {
          alert(error);
        });
    }

    async function verifyUser() {
      try {
        const response = await axios.get("/api/user/verify", {
          headers: {
            Authorization: user.token,
          },
        });
      } catch (err) {
        if (err) {
          alert("Your session is timeout. Please login again");
          logout();
        }
      }
    }
    setLoading((prev) => !prev);
    fetchData();
    if (user) {
      verifyUser();
    }
    setLoading((prev) => !prev);
  }, []);

  function logout() {
    dispatch({
      type: ACTIONS.SET_USER,
      user: null,
    });
    history.push("/");
  }

  const handleClickOpen = () => {
    if (user) {
      setOpen(true);
    } else {
      history.push("/login");
    }
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  const handleDeleteClick = async (id) => {
    let res;
    try {
      res = await axios.delete(`/api/request/delete/${id}`, {
        headers: {
          Authorization: user.token,
        },
      });
    } catch (err) {
      console.log(err);
    }

    window.location.reload();
  };

  const buttonGroup = (request) => (
    <ButtonGroup aria-label="contained primary button group">
      <Button
        variant="contained"
        color="default"
        onClick={() => {
          if (user) {
            setOpenAddRw(true);
            setSelectRequest(request);
          } else {
            history.push(!user && "/login");
          }
        }}
      >
        Add Rewards
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (user) {
            setOpenReolve(true);
            setSelectRequest(request);
          } else {
            history.push(!user && "/login");
          }
        }}
      >
        Resolve
      </Button>
    </ButtonGroup>
  );

  const buttonDelete = (id) => (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        if (window.confirm("Are you sure to delete this record?")) {
          handleDeleteClick(id);
        }
      }}
    >
      Delete
    </Button>
  );

  const verifyUser = (id, array) => {
    let temp = 0;
    array.forEach((element) => {
      if (id === element.from["_id"]) {
        temp += 1;
        return;
      }
    });
    return temp > 0 ? true : false;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="home">
      <div className="home__data">
        <Container fixed style={{ backgroundColor: "#ffffff", padding: 50 }}>
          <div className="request__add">
            <h1>Active public requests</h1>
            <IconButton onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          </div>
          <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Requests</TableCell>
                  <TableCell align="right">Rewards</TableCell>
                  <TableCell align="right">From</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.length > 0 ? (
                  requests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((request) => (
                      <TableRow key={request._id}>
                        <TableCell component="th" scope="row">
                          {request.requestContent}
                        </TableCell>
                        <TableCell align="right">
                          {request.requestFavors.map((favor) => (
                            <p>
                              {favor.rewards.map((reward) => (
                                <span>
                                  {reward.quantity} {reward.id.prize}{" "}
                                </span>
                              ))}
                            </p>
                          ))}
                        </TableCell>
                        <TableCell align="right">
                          {request.requestFavors.map((favor) => (
                            <p>
                              {user
                                ? favor.from["_id"] != user.userID
                                  ? favor.from.userName
                                  : "You"
                                : favor.from.userName}
                            </p>
                          ))}
                        </TableCell>
                        <TableCell align="right">
                          {!user
                            ? buttonGroup(request)
                            : verifyUser(user.userID, request.requestFavors)
                            ? buttonDelete(request["_id"])
                            : buttonGroup(request)}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={12}>
                      No active request has been added
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={requests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Container>

        {/* Pop up add request */}
        <Dialog
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <RequestAdd />
        </Dialog>
        <Dialog
          open={openAddRw}
          onClose={() => {
            setOpenAddRw(false);
            history.push("/");
          }}
        >
          <PrizeAdd request={selectRequest} />
        </Dialog>
        <Dialog
          open={openResolve}
          onClose={() => {
            setOpenReolve(false);
            history.push("/");
          }}
        >
          <ResolveModal
            request={selectRequest}
            onResolve={() => setOpenReolve(false)}
          />
        </Dialog>
      </div>
    </div>
  );
}

export default Home;
