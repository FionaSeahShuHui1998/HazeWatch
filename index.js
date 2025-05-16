console.log("Fetching data...");

// Fetch the data from the API
fetch("https://api.data.gov.sg/v1/environment/psi")
  .then((response) => response.json())
  .then((data) => {
    console.log("Data fetched successfully");
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });
