const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const { generateHash } = require('../utils/hashGenerator');

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';

router.get('/:username', async (req, res) => {
    const { username } = req.params;

    const query = {
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }`,
        variables: { username }
    };

    try {
        const response = await axios.post(LEETCODE_GRAPHQL, query, { headers: { 'Content-Type': 'application/json' } });
        const stats = response.data.data.matchedUser.submitStatsGlobal.acSubmissionNum;
        let solvedCount = 0;
        stats.forEach(item => solvedCount += item.count);

        const user = await User.findOne({ username });
        const totalScore = (user?.skillScore || 0) + solvedCount;
        const proofHash = generateHash(username + totalScore);

        const updatedUser = await User.findOneAndUpdate(
            { username },
            { leetcodeData: stats, skillScore: totalScore, proofHash },
            { upsert: true, new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;