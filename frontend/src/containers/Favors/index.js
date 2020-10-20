import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  ButtonGroup,
  IconButton,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { Link, Route, Redirect, useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./style.css";
import AddIcon from "@material-ui/icons/Add";
import FavorAdd from "../../components/FavorAdd";
import axios from "../../hoc/axios";
import { useUserStatus } from "../../hoc/UserContext/UserContext";
import { useLoading } from "../../hoc/LoadingContext/LoadingContext";
import TablePagination from "@material-ui/core/TablePagination";

function Favors() {
  const DEFAULT_IMG =
    "https://www.kenyons.com/wp-content/uploads/2017/04/default-image.jpg";
  const [{ user }, dispatch] = useUserStatus();
  const [loading, setLoading] = useLoading();
  const [favorList, setFavorList] = useState([]);
  const [open, setOpen] = useState(false);
  let history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Retrieve a list of Favor for the user
  useEffect(() => {
    async function fetchData(userID) {
      const response = await axios.get(`/api/favor/user/${userID}`, {
        headers: {
          Authorization: user.token,
        },
      });
      setFavorList(response.data);
    }
    setLoading((prev) => !prev);
    fetchData(user.userID).catch((error) => {
      console.log(error);
    });
    setLoading((prev) => !prev);
  }, []);

  function handleComplete(id) {
    if (window.confirm("Do you want to mark this favor as completed?")) {
      axios
        .patch(
          `api/favor/update/${id}`,
          {},
          {
            headers: {
              Authorization: user.token,
            },
          }
        )
        .then((res) => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }

  function handleAdd(favor) {
    setFavorList([...favorList, favor]);
  }

  function handleDelete(id) {
    if (window.confirm("Do you want to delete this favor?")) {
      axios
        .delete(`api/favor/delete/${id}`, {
          headers: {
            Authorization: user.token,
          },
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }

  function handleClickOpen(e) {
    setOpen(true);
  }

  function handleClose(e) {
    setOpen(false);
    history.push("/favors");
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Container fixed style={{ backgroundColor: "#ffffff", padding: 50 }}>
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
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favorList.length > 0 ? (
                favorList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((favor) => (
                    <TableRow key={favor._id}>
                      <TableCell component="th" scope="row">
                        <p>
                          {favor.items.map((item) => (
                            <span>
                              {item.quantity} {item.id.prize}{" "}
                            </span>
                          ))}
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        {favor.debtorID.userName}
                      </TableCell>
                      <TableCell align="right">
                        {favor.isComplete ? "COMPLETED" : "UNCOMPLETED"}
                      </TableCell>
                      <TableCell align="right">
                        <img
                          src={
                            favor.createdImage
                              ? favor.createdImage
                              : DEFAULT_IMG
                          }
                          width={100}
                          height={100}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <img
                          src={
                            favor.completedImage
                              ? favor.completedImage
                              : DEFAULT_IMG
                          }
                          width={100}
                          height={100}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {!favor.isComplete && (
                          <ButtonGroup
                            variant="contained"
                            color="primary"
                            aria-label="contained primary button group"
                          >
                            <Button onClick={(e) => handleComplete(favor._id)}>
                              Complete
                            </Button>
                          </ButtonGroup>
                        )}

                        <ButtonGroup variant="contained" color="secondary">
                          <Button onClick={(e) => handleDelete(favor._id)}>
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    No favor has been added
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 100]}
          component="div"
          count={favorList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        {/* Route to favor add */}
        <Route path="/favors/add">
          <Dialog
            maxWidth="lg"
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <FavorAdd onFavorAdd={() => setOpen(false)} />
          </Dialog>
        </Route>
      </Container>
    </div>
  );
}

export default Favors;
