import React, { useEffect, useState } from "react";
import "./styles.css";
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
import axios from "../../hoc/axios";
import DataTable from "react-data-table-component";
import { useLoading } from "../../hoc/LoadingContext/LoadingContext";

const columns = [
  { name: "Username", selector: "userName", sortable: false },
  {
    name: "Number of resolved requests",
    selector: "completedRequest",
    sortable: true,
    right: true,
  },
];

function Active() {
  const [activeLists, setActiveLists] = useState();
  const [loading, setLoading] = useLoading();

  useEffect(() => {
    async function fetchTopActive() {
      setLoading((prev) => !prev);
      let data;
      try {
        const res = await axios.get("/api/user/users");
        data = res.data;
        setLoading((prev) => !prev);
      } catch (err) {
        alert(err);
      }
      const rows = data.sort((a, b) => {
        return b.completedRequest - a.completedRequest;
      });
      setActiveLists(rows);
    }
    fetchTopActive();
  }, []);

  return (
    <DataTable
      title="Most Active Users"
      columns={columns}
      data={activeLists}
      pagination={true}
      keyField="_id"
      highlightOnHover={true}
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15]}
    />
  );
}

export default Active;
