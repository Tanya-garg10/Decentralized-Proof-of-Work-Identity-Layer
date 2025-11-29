const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const { generateHash } = require('../utils/hashGenerator');

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const repos = await axios.get(`https://api.github.com/users/${username}/repos`);
        let commitCount = 0;
        repos.data.forEach(repo => commitCount += repo.stargazers_count); // simple metric

        const skillScore = commitCount;
        const proofHash = generateHash(username + commitCount);

        const user = await User.findOneAndUpdate(
            { username },
            { githubData: repos.data, skillScore, proofHash },
            { upsert: true, new: true }
        );

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
