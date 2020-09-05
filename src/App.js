import React, { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import "./perfAnalytics";

function App() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  // const baseFetchUrl =
  //   "https://performance-measure.herokuapp.com/browser-metrics";
  const baseFetchUrl = "http://localhost:8080/browser-metrics";

  useEffect(() => {
    setLoading(true);
    fetch(baseFetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const labels = [
    "ttfb",
    "dom-load-time",
    "first-contentful-paint",
    "load-time",
  ];

  const chartList = metrics.map((metric) => {
    return (
      <Dashboard
        label={metric.measureName}
        key={metric._id}
        color="black"
        metricData={metric.measureTimes}
        timestampLabels={metric.timestamps}
      />
    );
  });

  return (
    <div className="m-container">
      {loading ? <h1>Loading...</h1> : chartList}
    </div>
  );
}

export default App;
