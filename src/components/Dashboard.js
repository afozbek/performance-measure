import React from "react";
import PropTypes from "prop-types";

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
        borderColor: props.color || "black",
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

Dashboard.propTypes = {
  label: PropTypes.string.isRequired,
  metricData: PropTypes.array.isRequired,
  timestampLabels: PropTypes.array.isRequired,
  color: PropTypes.string,
};

export default Dashboard;
