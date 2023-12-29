function updateDateTime() {
  const currentDate = new Date()
  currentDate.setHours(0,0,0,0)
  const formattedDate = currentDate.toLocaleDateString(); // Customize the date format as needed
  document.getElementById('updatedDate').textContent = "Last updated " + formattedDate;
}

updateDateTime();

// Schedule the update to occur every 24 hours (in milliseconds)
const updateInterval = 24 * 60 * 60 * 1000;
setInterval(updateDateTime, updateInterval);




