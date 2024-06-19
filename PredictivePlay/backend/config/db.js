const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shashanks2003:1yoaRgQtbt81dKSm@predictiveplay.7lh0uep.mongodb.net/PredictivePlay", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log('no connection', err);
    process.exit(1); // Exit process with failure
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("Successfully connected to database ...");
});

db.on('error', (error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit process with failure
});

module.exports = db;
