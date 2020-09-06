import React from "react";

import { Line } from "react-chartjs-2";

const Dashboard = (props) => {
  const data = {
    // labels = last 30 min
    labels: props.timestampLabels.map((t) =>
      new Date(t).toLocaleTimeString("tr-TR")
    ),

    // label, data
    datasets: [
      {
        label: props.label,
        data: props.metricData,
        backgroundColor: "transparent",
        borderColor: props.color,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="m-container__dashboard">
      <Line data={data} options={{}} />
    </div>
  );
};

export default Dashboard;
