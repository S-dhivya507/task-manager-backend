// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import Sequelize instance and models
const { sequelize } = require("./models");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Fallback route for testing
app.get("/", (req, res) => res.send("Server is running"));

// PORT fallback
const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync({ alter: true }) // use { force: false } or { alter: true } depending on dev/prod
  .then(() => {
    console.log("PostgreSQL Connected");

    // Optional: log database URL for debugging
    console.log("DATABASE_URL =", process.env.DATABASE_URL);

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error("Unable to connect to the database:");
    console.error(err);
  });
