(function () {
  var logStyle =
    "color: green; font-weight: bold; font-size: 14px; text-transform: uppercase";

  // TTFB - Time To First Byte
  var navigationEntry = performance.getEntriesByType("navigation")[0];
  var ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
  console.log("%cTTFB:", logStyle, ttfb + " ms");

  // FCP - First Contentful Paint
  var fcp;
  // Dom Load
  var contentLoadTime;
  // Window Load
  var loadTime;

  var observer = new PerformanceObserver(function (list, obj) {
    var perfEntries = list.getEntries();
    // console.log(perfEntries);
    for (var i = 0; i < perfEntries.length; i++) {
      var entry = perfEntries[i];

      if (entry.entryType === "navigation") {
        console.log(entry.loadEventEnd);
        contentLoadTime = entry.domContentLoadedEventEnd;
        loadTime = entry.loadEventEnd;

        console.log(`%c${entry.entryType}`, logStyle);
        console.log("%cDOM Load Time: ", logStyle, contentLoadTime + " ms");
        console.log("%cLoad Time: ", logStyle, loadTime + " ms");
      } else if (entry.entryType === "paint") {
        console.log(`%c${entry.name} :`, logStyle, entry.startTime + " ms");
        fcp = entry.startTime;
      } else if (entry.entryType === "resource") {
        console.log(`%c${entry.entryType}`, logStyle);
        console.log(`${entry.name} : ` + entry.responseEnd);
      }
    }
  });

  observer.observe({ entryTypes: ["paint", "navigation", "resource"] });

  var basePostUrl = "http://localhost:8080/browser-metrics";
  fetch(basePostUrl, {
    method: "POST",
    body: JSON.stringify({
      message: "Furkan Ozbek",
      fcp: fcp,
      contentLoadTime: contentLoadTime,
      loadTime: loadTime,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  // Network Timings
})();
