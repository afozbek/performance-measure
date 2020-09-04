(function () {
  var logStyle =
    "color: green; font-weight: bold; font-size: 14px; text-transform: uppercase";

  var pageNav = performance.getEntriesByType("navigation")[0];
  var ttfb = pageNav.responseStart - pageNav.requestStart;

  // TTFB - Time To First Byte
  console.log("%cTTFB:", logStyle, ttfb + " ms");

  // FCP - First Contentful Paint
  // Dom Load
  // Window Load
  var observer = new PerformanceObserver(function (list, obj) {
    var perfEntries = list.getEntries();
    console.log(perfEntries);
    for (var i = 0; i < perfEntries.length; i++) {
      var entry = perfEntries[i];
      if (entry.entryType === "navigation") {
        console.log(entry.loadEventEnd);
        var contentLoadTime = entry.domContentLoadedEventEnd;
        var loadTime = entry.loadEventEnd;

        console.log(`%c${entry.entryType}`, logStyle);
        console.log("%cDOM Load Time: ", logStyle, contentLoadTime + " ms");
        console.log("%cLoad Time: ", logStyle, loadTime + " ms");
      } else {
        console.log(`%c${entry.name} :`, logStyle, entry.startTime + " ms");
      }
    }
  });

  observer.observe({ entryTypes: ["paint", "navigation"] });

  // Network Timings
})();
