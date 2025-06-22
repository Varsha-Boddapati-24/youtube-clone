function logger(req, res, next) {
  // Record the timestamp when the request is received
  const start = Date.now();
  // Log the incoming request details (method and URL) with current timestamp in ISO format
  console.log(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.originalUrl}`);
 // Register an event listener that triggers when the response has finished being sent
  res.on('finish', () => {
     // how much time the request took 
    const duration = Date.now() - start;
     // Log the response details including status code and duration, again with a timestamp
    console.log(
      `[${new Date().toISOString()}] Response: ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`
    );
  });
// Call the next middleware or route handler in the stack
  next();
}
// Export the logger function to use it in other parts of the app
export default logger;