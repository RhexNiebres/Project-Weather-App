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

      const conditionKey = currentConditions.conditions.toLowerCase();//add 
      const imageResponse = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=kjslOcjrBfTc6PDM4KhjjRSxBgfl7HkG&s=${conditionKey}`
      );

      if (!imageResponse.ok) {
        throw new Error("Could not fetch GIF resource");
      }
      const imageData = await imageResponse.json();
      const imageUrl = imageData.data.images.original.url;

      const display = document.getElementById("display");

      const weatherInfo = `
      <h3>Wheather in ${locationName}</h3>
      <p><i class="fa-solid fa-cloud-sun"></i> ${currentConditions.conditions}</p>
      <p><i class="fa-solid fa-temperature-half"></i> ${currentConditions.temp}</p>
      <p><i class="fa-solid fa-droplet"></i> ${currentConditions.humidity}</p>
      <img src="${imageUrl}" alt="Image of ${currentConditions.temp}" />
      `;

      display.innerHTML = weatherInfo;
      display.style.display = "block";
      
    } catch (error) {
      console.log(error);
    }
  }