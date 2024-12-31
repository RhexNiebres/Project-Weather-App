let useCelsius = false; // Starts in Fahrenheit by default
async function fetchData() {
  try {
    const locationName = document
      .getElementById("locationName")
      .value.toLowerCase();

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=us&key=HLWKVM4WWFDXMHUECFVTCY7KE&contentType=json`
    );

    if (!response.ok) {
      throw new Error("could not fetch resource");
    }
    const data = await response.json();
    // console.log(data);
    const currentConditions = data.currentConditions;

    const conditionKey = currentConditions.conditions.toLowerCase(); //add
    const imageResponse = await fetch(
      // `https://api.giphy.com/v1/gifs/translate?api_key=kjslOcjrBfTc6PDM4KhjjRSxBgfl7HkG&s=${conditionKey}`
    );

    if (!imageResponse.ok) {
      throw new Error("Could not fetch GIF resource");
    }
    const imageData = await imageResponse.json();
    const imageUrl = imageData.data.images.original.url;

    const display = document.getElementById("display");

    let temp = currentConditions.temp; 
        
        if (useCelsius) {
            temp = (temp - 32) * (5 / 9); // Convert to Celsius
            temp = temp.toFixed(1); // Keep one decimal place
        }

        const unit = useCelsius ? '°C' : '°F';

    const weatherInfo = `
      <div class="weather-info">
       <div>
         <h3>Wheather in ${locationName}</h3>
         <p><i class="fa-solid fa-cloud-sun"></i> ${currentConditions.conditions}</p> 
         <p><i class="fa-solid fa-temperature-half"></i> ${temp} ${unit}</p>
         <p><i class="fa-solid fa-droplet"></i> ${currentConditions.humidity}</p>
       </div>
       <div>
         <img src="${imageUrl}" alt="Image of ${currentConditions.temp}" />
       </div>
      </div>
      `;

    display.innerHTML = weatherInfo;
    display.style.display = "block";
  } catch (error) {
    console.log(error);
  }
}

function toggleUnits() {
    useCelsius = !useCelsius; // Toggle unit flag
    const button = document.getElementById("toggleUnitButton");
    button.textContent = useCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"; // Update button text
    fetchData(); // Fetch data again with updated unit
}
