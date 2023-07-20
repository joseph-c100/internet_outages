// fetches json data from Cloudflare worker

const fetchandlog = async () => {
  try {
    const response = await fetch('https://internetshutdowns.joeclark176.workers.dev/', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse the response body as JSON data
    const jsonData = await response.json();

    // Print the JSON data
    console.log(jsonData);

    // Return the JSON data
    return jsonData;
  } catch (error) {
    console.error('Error fetching JSON:', error);
    return null;
  }
};

fetchandlog();

export default fetchandlog;

function updateDateTime() {
  const currentDate = new Date()
  currentDate.setHours(0,0,0,0)
  const formattedDate = currentDate.toLocaleString(); // Customize the date format as needed
  document.getElementById('updatedDate').textContent = "Last updated:" + formattedDate;
}

updateDateTime();

// Schedule the update to occur every 24 hours (in milliseconds)
const updateInterval = 24 * 60 * 60 * 1000;
setInterval(updateDateTime, updateInterval);




