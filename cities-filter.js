const regionCityMap = {
    "الجنوبية": ["جازان"],
    "الغربية": ["الطائف"],
    "الشمالية": ["الجوف"]
  };
  
  const cityDescriptions = {
    "جازان": "منطقة غنية بالنباتات العلاجية مثل السواك والبابونج، ولها حضور قوي في الأسواق الشعبية.",
    "الطائف": "مشهورة بورودها العطرية وزراعة الورد الطائفي المستخدم في العطور والعلاجات.",
    "الجوف": "متميزة بزراعة الزيتون والنعناع ولها أهمية اقتصادية وثقافية."
  };
  
  const regionSelect = document.getElementById("region");
  const citySelect = document.getElementById("city");
  const cardsContainer = document.getElementById("cards");
  
  regionSelect.addEventListener("change", () => {
    const region = regionSelect.value;
    citySelect.innerHTML = `<option value="">-- اختر المدينة --</option>`;
    if (region && regionCityMap[region]) {
      regionCityMap[region].forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
    cardsContainer.innerHTML = "";
  });
  
  citySelect.addEventListener("change", () => {
    const city = citySelect.value;
    cardsContainer.innerHTML = "";
    if (city && cityDescriptions[city]) {
      const card = document.createElement("div");
      card.className = "city-card";
      card.innerHTML = `
        <h3>${city}</h3>
        <p>${cityDescriptions[city]}</p>
      `;
      cardsContainer.appendChild(card);
    }
  });
  