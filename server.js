require('dotenv').config();
const config = require('./src/utils/config');
const app = require('./src/app');
const connectDB = require('./src/config/db.config');

const port = config.server.port;
let server;
let dbConnection;

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} signal recieved: starting graceful shutdown`);
  
  // Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed');
    
    try {
      // Close database connection
      if (dbConnection) {
        console.log('Closing database connection...');
        await dbConnection.close();
        console.log('Database connection closed');
      }
      
      console.log('Graceful shutdown completed');
      process.exit(0);
    } catch (err) {
      console.error('Error during graceful shutdown:', err);
      process.exit(1);
    }
  });

  // Force shutdown after timeout
  setTimeout(() => {
    console.error('Could not close connection in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

const startServer = async () => {
  try {
    dbConnection = await connectDB();
    
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Handle various shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    // Handle uncaught exceptions and rejections
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      gracefulShutdown('Uncaught Exception');
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('Unhandled Rejection');
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();