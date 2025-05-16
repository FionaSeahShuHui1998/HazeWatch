console.log("Fetching data...");

// Fetch the data from the API
fetch("https://api.data.gov.sg/v1/environment/psi")
  .then((response) => response.json())
  .then((data) => {
    console.log("Data fetched successfully.");
    console.log(data.items[0]);
    // Last Update Date Time
    const getLastUpdateDateTime = data.items[0].update_timestamp;
    console.log("Upadate Date Time: ", getLastUpdateDateTime);
    const lastUpdateDateTimeElement =
      document.getElementById("lastUpdateDateTime");
    lastUpdateDateTimeElement.textContent =
      "Last Updated: " + formatDateToCustomString(getLastUpdateDateTime);
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

// Convert ISO date string to custom format
function formatDateToCustomString(isoString) {
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
