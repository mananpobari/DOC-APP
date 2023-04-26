const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const connectDB = require("./config/db");

//require('dotenv').config();
dotenv.config();
connectDB();

const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const {Server} = require('socket.io');
app.use(cors());
// const server = http.createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(morgan('dev'));


io.on("connection",(socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) =>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () =>{
        console.log(`User disconnected:${socket.id}`);
    });
});
//put Socket instead of socket if doesnt work//


//routes
app.use('/api/v1/user', require("./routes/userRoutes")); 
 app.use('/api/v1/admin',require("./routes/adminRoutes"));
 app.use('/api/v1/doctor',require("./routes/doctorRoutes"));


const port = process.env.PORT || 8080;
   
http.listen(port, () =>{
    console.log(`Server running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgBlue.white
    );
}
);  