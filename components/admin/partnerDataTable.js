import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { capitalize } from "../../custome_methods/capitalize";
import { Chip } from "@material-ui/core";
import PartnerDetailDialog from "./partnerDetailDialog";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
}));

export default function PartnerDataTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);

  const handleClickOpen = (item) => {
    setData(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Partner Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Mobile</StyledTableCell>
            <StyledTableCell align="right">Alternate Mobile</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((item, index) => (
            <StyledTableRow key={index} onClick={() => handleClickOpen(item)}>
              <StyledTableCell align="right">
                {capitalize(`${item.firstName} ${item.lastName}`)}
              </StyledTableCell>
              <StyledTableCell align="right">{item.email}</StyledTableCell>
              <StyledTableCell align="right">{item.mobile}</StyledTableCell>
              <StyledTableCell align="right">
                {item.partnerDetails.alternateMobile}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Chip
                  label={
                    item.partnerDetails.isApproved ? "Approved" : "NotApproved"
                  }
                  color="primary"
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <PartnerDetailDialog
        open={open}
        close={handleClose}
        data={data}
        onApprove={props.onApprove}
      />
    </TableContainer>
  );
}
