console.log("Fetching data...");

let readings = [];

// Fetch the data from the API
fetch("https://api.data.gov.sg/v1/environment/psi")
  .then((response) => response.json())
  .then((data) => {
    console.log("Data fetched successfully.");
    // Last Update Date Time
    const getLastUpdateDateTime = data.items[0].update_timestamp;
    const lastUpdateDateTimeElement =
      document.getElementById("lastUpdateDateTime");
    lastUpdateDateTimeElement.textContent =
      "Last Updated: " + conversionOfDateString(getLastUpdateDateTime);
    // Get the readings
    let rawReadings = data.items[0].readings;
    const formattedReadings = Object.entries(rawReadings).map(
      ([metric, regions]) => {
        const regionValues = Object.values(regions);
        const national =
          regionValues.reduce((sum, val) => sum + val, 0) / regionValues.length;

        return {
          metric,
          national,
          ...regions,
        };
      }
    );
    // Add readings to the table
    const tableBody = document.querySelector(".psiTable tbody");

    formattedReadings.forEach((item) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${item.metric}</td>
      <td>${item.national}</td>
      <td>${item.central}</td>
      <td>${item.west}</td>
      <td>${item.east}</td>
      <td>${item.north}</td>
      <td>${item.south}</td>
    `;

      // Add the row to the table body
      tableBody.appendChild(row);
    });
  })

  .catch((error) => {
    console.log("Error fetching data:", error);
  });

// Convert ISO date string to custom format
function conversionOfDateString(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}
