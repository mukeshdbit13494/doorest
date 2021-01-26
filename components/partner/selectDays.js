import { Checkbox, FormControlLabel, Grid, TextField } from "@material-ui/core";
import { useState } from "react";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import CheckBoxIcon from "@material-ui/icons/CheckBox";

export default function SelectDays(props) {
  const [serviceDays, setServiceDays] = useState(
    props.days
      ? props.days
      : [
          {
            day: "Monday",
            status: false,
            timing: {
              startTime: "07:30",
              endTime: "21:00",
            },
          },
          {
            day: "Tuesday",
            status: false,
            timing: {
              startTime: "07:30",
              endTime: "21:00",
            },
          },
          {
            day: "Wednesday",
            status: false,
            timing: {
              startTime: "07:30",
              endTime: "21:00",
            },
          },
          {
            day: "Thursday",
            status: false,
            timing: {
              startTime: "07:30",
              endTime: "21:00",
            },
          },
          {
            day: "Friday",
            status: false,
            timing: {
              startTime: "07:30",
              endTime: "21:00",
            },
          },
          {
            day: "Saturday",
            status: false,
            timing: {
              startTime: "07:30",
              endTime: "21:00",
            },
          },
          {
            day: "Sunday",
            status: false,
            timing: {
              startTime: "07:30",
              endTime: "21:00",
            },
          },
        ]
  );
  const handleChange = (index) => {
    const days = [...serviceDays];
    days[index].status = days[index].status == false ? true : false;
    setServiceDays(days);
    props.response(serviceDays);
  };

  const handleTimeChange = (event, index, type) => {
    const days = [...serviceDays];
    if (type === "start") {
      days[index].timing.startTime = event.target.value;
    } else {
      days[index].timing.endTime = event.target.value;
    }
    setServiceDays(days);
    props.response(serviceDays);
  };

  return (
    <div>
      <Grid container spaciing={1}>
        {serviceDays.map((item, index) => (
          <Grid container item xs={12} sm={12} key={index}>
            <Grid item xs={4} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.status}
                    onChange={() => handleChange(index)}
                    color="primary"
                  />
                }
                label={item.day}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                id="time"
                type="time"
                disabled={item.status ? false : true}
                defaultValue={item.timing.startTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={(event) => handleTimeChange(event, index, "start")}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                id="time"
                type="time"
                disabled={item.status ? false : true}
                defaultValue={item.timing.endTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={(event) => handleTimeChange(event, index, "end")}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
