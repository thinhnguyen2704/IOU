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
import "./styles.css";
import axios from "../../hoc/axios";
import DataTable from "react-data-table-component";
import { useLoading } from "../../hoc/LoadingContext/LoadingContext";

const columns = [
  { name: "Username", selector: "userDetail[0].userName", sortable: false },
  {
    name: "Number of debts",
    selector: "totalDebt",
    sortable: true,
    right: true,
  },
];

function DebtsLeaderboard() {
  const [debtLists, setDebtLists] = useState([]);
  const [loading, setLoading] = useLoading();

  useEffect(() => {
    async function fetchTopDebts() {
      setLoading((prev) => !prev);
      let data;
      try {
        const response = await axios.get("/api/favor/top");
        data = response.data;
        setLoading((prev) => !prev);
      } catch (err) {
        setLoading((prev) => !prev);
        alert(err);
      }

      const rows = data.sort((a, b) => {
        return a.totalDebt - b.totalDebt;
      });

      setDebtLists(rows);
    }

    fetchTopDebts();
  }, []);

  return (
    <DataTable
      title="Users with the least debts"
      columns={columns}
      data={debtLists}
      pagination={true}
      keyField="_id"
      highlightOnHover={true}
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15]}
    />
  );
}

export default DebtsLeaderboard;
