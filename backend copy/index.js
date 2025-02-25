const express = require("express");
const newsletterRoute = require("./routes/newsletterRoute");
const { connectDb } = require("./configuration/connectdb");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
// const {Server} = require("socket.io");
const app = express();


dotenv.config();
app.use(cors());

const port = process.env.PORT;
connectDb();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors:{
//     origin:"http://localhost:3000"
//   }
// });

// io.on("connection", (socket) => { 
//   console.log(`User connected: ${socket.id}`);

//   socket.on("join_room", (data) =>{
//     if(data !== ""){
//       socket.join(data);
//       console.log(`User with ID: ${socket.id} joined room: ${data}`);
//     }
//   })

//   socket.on("send_message", (data)=>{
//     console.log(data);
//     socket.to(data.room).emit("receive_message", data);
//   })

//   socket.on("disconnect", (reason) =>{
//     console.log("User Disconnected", socket.id);
//     console.log("reason:", reason);
//   })
// });

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});

app.use(express.json());
app.use("/api", newsletterRoute);