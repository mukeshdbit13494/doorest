import { Container, makeStyles } from "@material-ui/core";
import React from "react";

import AddItemTab from "../../components/admin/AddItemTab";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/adminRoutes";

const useStyles = makeStyles((theme) => ({
  roaddItemTabot: {
    marginTop: 30,
  },
}));

function AddItems() {
  const classes = useStyles();
  return (
    <DashboardLayout route={routes} menuOption={menuOption} profile={{}}>
      <div className={classes.addItemTab}>
        <AddItemTab />
      </div>
    </DashboardLayout>
  );
}

export default AddItems;
