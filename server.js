const express = require("express");
const next = require("next");
const router = require("./pages/api/routes/mainRoute.js");
require("dotenv").config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    const setServer = require("http").Server(server);
    const io = require("socket.io")(setServer);
    global.io = io;

    server.use(cors());

    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.use(express.static("./public"));
    server.use("/api", router);
    server.use(handle);

    mongoose.connect(
      process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      (err) => {
        if (err) return console.log(err);
        console.log("DB connection established");
      }
    );

    io.sockets.on("connection", (socket) => {
      console.log(`Client with ID of ${socket.id} connected!`);

      io.sockets.emit("SOME_EVENT", "HelloWorld");
    });

    setServer.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
