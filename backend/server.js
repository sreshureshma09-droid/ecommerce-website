const app = require('./app');
const path = require('path');
const connectDatabase = require('./config/database');
const express = require('express'); // ✅ add this

// Connect to database
connectDatabase();

// Serve React frontend (after API routes are set in app.js)
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// Start server
const server = app.listen(process.env.PORT, () => {
  console.log(`My Server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

// Handle errors
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled rejection error');
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception error');
  server.close(() => process.exit(1));
});
