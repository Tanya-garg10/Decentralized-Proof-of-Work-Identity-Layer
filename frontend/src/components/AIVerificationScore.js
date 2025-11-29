import React from "react";
import { Doughnut } from "react-chartjs-2";

function AIVerificationScore({ score }) {
  if (!score) return null;

  return (
    <div className="card">
      <h2>AI Verification Score</h2>
      <Doughnut
        data={{
          labels: ["Authenticity Score", "Remaining"],
          datasets: [
            {
              data: [score, 100 - score],
            },
          ],
        }}
      />
    </div>
  );
}

export default AIVerificationScore;