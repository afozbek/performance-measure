import React, { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import "./perfAnalytics";

function App() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseFetchUrl =
    "https://performance-measure.herokuapp.com/browser-metrics";

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

  const ttfbDatas = [];
  const domLoadTimeDatas = [];
  const loadTimeDatas = [];
  const fcpDatas = [];
  const timestampLabels = [];

  metrics.forEach((metric) => {
    switch (metric.measureName) {
      case "ttfb":
        timestampLabels.push(new Date(metric.timestamp).toLocaleTimeString());
        ttfbDatas.push(metric.measureValue);
        break;
      case "dom-load-time":
        domLoadTimeDatas.push(metric.measureValue);
        break;
      case "load-time":
        loadTimeDatas.push(metric.measureValue);
        break;
      case "first-contentful-paint":
        fcpDatas.push(metric.measureValue);
        break;
      default:
        return;
    }
  });

  const chartList = labels.map((label) => {
    let metricData = [];
    let color = "black";

    switch (label) {
      case "ttfb":
        metricData = [...ttfbDatas];
        color = "red";
        break;
      case "dom-load-time":
        metricData = [...domLoadTimeDatas];
        color = "blue";
        break;
      case "load-time":
        metricData = [...loadTimeDatas];
        color = "orange";
        break;
      case "first-contentful-paint":
        metricData = [...fcpDatas];
        break;
      default:
        return;
    }

    return (
      <Dashboard
        label={label}
        key={label}
        color={color}
        metricData={metricData}
        timestampLabels={timestampLabels.slice(1, 30)}
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
