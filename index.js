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

const data = [
  {
    metric: "123",
    national: 55,
    central: 1,
    west: 2,
    north: 3,
    south: 4,
    east: 5,
  },
  {
    metric: "abc",
    national: 55,
    central: 1,
    west: 2,
    north: 3,
    south: 4,
    east: 5,
  },
  {
    metric: "def",
    national: 55,
    central: 1,
    west: 2,
    north: 3,
    south: 4,
    east: 5,
  },
];

const tableBody = document.querySelector(".psiTable tbody");

data.forEach((item) => {
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
