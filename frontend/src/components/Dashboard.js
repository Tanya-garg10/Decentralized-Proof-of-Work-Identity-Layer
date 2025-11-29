import React, { useState } from "react";
import {
  fetchGitHub,
  fetchLeetCode,
  verifyUser,
  storeOnChain,
  verifyOnChain,
} from "../api";

import UserInfo from "../components/UserInfo";
import ContributionGraph from "../components/ContributionGraph";
import LeetCodeGraph from "../components/LeetCodeGraph";
import AIVerificationScore from "../components/AIVerificationScore";
import Badges from "../components/Badges";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  const handleVerify = async () => {
    const github = await fetchGitHub(username);
    const leetcode = await fetchLeetCode(username);
    const verified = await verifyUser(username);

    setData({
      username,
      githubData: github.data,
      leetcodeData: leetcode.data,
      skillScore: verified.data.skillScore,
      proofHash: verified.data.proofHash,
    });
  };

  return (
    <div className="container">

      <h1>Developer Proof-of-Work Identity</h1>

      <input
        placeholder="Enter GitHub / LeetCode Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleVerify}>Verify Identity</button>

      {data && <UserInfo data={data} />}
      {data && <ContributionGraph githubData={data.githubData} />}
      {data && <LeetCodeGraph leetcodeData={data.leetcodeData} />}
      {data && <AIVerificationScore score={data.skillScore} />}

      <Badges
        badges={[
          { title: "100+ Commits Verified", icon: "🔥" },
          { title: "AI Authenticity Verified", icon: "✅" },
          { title: "LeetCode Achiever", icon: "📘" },
        ]}
      />

      <button onClick={() => storeOnChain(username)}>Store Proof on Blockchain</button>
      <button onClick={() => verifyOnChain(username)}>Verify Proof on Blockchain</button>

    </div>
  );
}

export default Dashboard;
