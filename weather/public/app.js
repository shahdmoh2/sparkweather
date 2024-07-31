document.getElementById('generate').addEventListener('click', async () => {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  const apiKey = 'your_api_key'; // Replace 'your_api_key' with your actual API key from OpenWeatherMap
  const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`;

  try {
    const res = await fetch(baseUrl);
    const data = await res.json();
    const temperature = data.main.temp;
    const date = new Date().toLocaleDateString();

    // Post data to the server
    await fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({temperature, date, userResponse: feelings})
    });

    // Update the UI
    updateUI();
  } catch (error) {
    console.error("Error:", error);
  }
});

async function updateUI() {
  const request = await fetch('http://localhost:3000/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)}°F`;
    document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
  } catch (error) {
    console.error("Error", error);
  }
}
