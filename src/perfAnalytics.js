(function () {
  var performanceTiming = performance.timing;
  var ttfb = performanceTiming.responseStart;

  // TTFB - Time To First Byte
  console.log("TTFB:", ttfb);

  // FCP - First Contentful Paint
  // const paintTimings = performance.getEntriesByType("paint");
  // console.log(paintTimings);
  // const FCP = paintTimings.find((paint) => paint.name === "first-paint");
  // console.log(`First paint at ${FCP.startTime || "?"}ms`);

  var observer = new PerformanceObserver(function (list) {
    var perfEntries = list.getEntries();
    for (var i = 0; i < perfEntries.length; i++) {
      // Process entries
      // report back for analytics and monitoring
      // ...
      var entry = perfEntries[i];
      console.log(entry);
      console.log(entry.name + ": " + entry.startTime + "ms");
    }
  });

  observer.observe({ entryTypes: ["paint"] });

  // Dom Load

  // Window Load

  // Network Timings
})();
