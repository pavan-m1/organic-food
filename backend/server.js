const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// -----------------------
// SAVE CUSTOMER ORDER
// -----------------------
app.post("/saveOrder", (req, res) => {
    const newOrder = req.body;

    let orders = [];
    if (fs.existsSync("orders.json")) {
        orders = JSON.parse(fs.readFileSync("orders.json"));
    }

    orders.push(newOrder);

    fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

    res.json({ message: "Customer data saved successfully!" });
});


// -----------------------
// SAVE CUSTOMER FEEDBACK
// -----------------------
app.post("/saveFeedback", (req, res) => {
    const newFeedback = req.body;

    let feedbacks = [];
    if (fs.existsSync("feedback.json")) {
        feedbacks = JSON.parse(fs.readFileSync("feedback.json"));
    }

    feedbacks.push(newFeedback);

    fs.writeFileSync("feedback.json", JSON.stringify(feedbacks, null, 2));

    res.json({ message: "Feedback saved successfully!" });
});


// -----------------------
// GET ALL FEEDBACK (display page)
// -----------------------
app.get("/getFeedback", (req, res) => {
    if (fs.existsSync("feedback.json")) {
        const feedbackData = JSON.parse(fs.readFileSync("feedback.json"));
        res.json(feedbackData);
    } else {
        res.json([]);
    }
});


// -----------------------
// START SERVER
// -----------------------
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

