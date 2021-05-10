// Import dependencies
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const mongoose = require("mongoose");
const path = require("path");
const passport = require("./middleware/passport");


const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(compression());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
  secret: "all your base",
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});


app.use(require("./routes/api-routes"));
app.use("/auth", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Setup db connection based on current environment
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/shoppies',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Config socketio 
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Listen for an emitted saved message
io.on("connection", (socket) => {
  socket.on("saved", (msg) => {
    console.log(msg);
    io.emit("saved", msg);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});


