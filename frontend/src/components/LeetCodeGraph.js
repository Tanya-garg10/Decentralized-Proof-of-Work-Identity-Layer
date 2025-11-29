import React from "react";
import { Bar } from "react-chartjs-2";

function LeetCodeGraph({ leetcodeData }) {
  if (!leetcodeData) return null;

  return (
    <div className="card">
      <h2>LeetCode Progress</h2>
      <Bar
        data={{
          labels: ["Easy", "Medium", "Hard"],
          datasets: [
            {
              label: "Problems Solved",
              data: [
                leetcodeData.easy || 0,
                leetcodeData.medium || 0,
                leetcodeData.hard || 0,
              ],
            },
          ],
        }}
      />
    </div>
  );
}

export default LeetCodeGraph;
