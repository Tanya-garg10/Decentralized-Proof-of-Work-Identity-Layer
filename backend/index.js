const express = require('express');
const mongoose = require('mongoose');
const githubRoutes = require('./routes/github');
const leetcodeRoutes = require('./routes/leetcode');
const blockchainRoutes = require('./routes/blockchain');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://<username>:<password>@cluster.mongodb.net/decentralizedID', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/github', githubRoutes);
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/blockchain', blockchainRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));