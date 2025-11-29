const OpenAI = require('openai');
const User = require('../models/User');
const { generateHash } = require('../utils/hashGenerator');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function verifyAuthenticity(username) {
    const user = await User.findOne({ username });
    if (!user) return null;

    const repoData = JSON.stringify(user.githubData).slice(0, 5000);

    const prompt = `
    Analyze this GitHub data for suspicious activity:
    ${repoData}
    Identify fake/bulk commits and return authenticity score out of 100.
    `;

    const completion = await openai.chat.completions.create({
        model: 'gpt-5-mini',
        messages: [{ role: 'user', content: prompt }]
    });

    const aiScore = parseInt(completion.choices[0].message.content.match(/\d+/)[0]);
    const totalScore = (user.skillScore || 0) * (aiScore / 100);
    const proofHash = generateHash(username + totalScore);

    user.skillScore = totalScore;
    user.proofHash = proofHash;
    await user.save();

    return user;
}

module.exports = { verifyAuthenticity };