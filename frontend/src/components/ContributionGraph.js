import React from "react";
import { Line } from "react-chartjs-2";

function ContributionGraph({ githubData }) {
  if (!githubData) return null;

  const labels = githubData.map(repo => repo.repoName);
  const commits = githubData.map(repo => repo.commits);

  return (
    <div className="card">
      <h2>GitHub Contributions</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Commits",
              data: commits,
            },
          ],
        }}
      />
    </div>
  );
}

export default ContributionGraph;
