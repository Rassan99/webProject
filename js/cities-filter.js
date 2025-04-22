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

  if (city === "جازان") {
    const template = document.getElementById("jazan-card-template");
    const content = template.content.cloneNode(true);
    cardsContainer.appendChild(content);

    const card = cardsContainer.querySelector(".city-card");

    const cropSections = card.querySelectorAll(".crop-section");
    cropSections.forEach(section => {
      const title = section.querySelector("h4");
      title.addEventListener("click", () => {
        const isActive = section.classList.contains("active");
        cropSections.forEach(s => s.classList.remove("active", "hidden"));
        if (!isActive) {
          section.classList.add("active");
          cropSections.forEach(s => {
            if (s !== section) s.classList.add("hidden");
          });
        }
      });
    });

    const subWrappers = card.querySelectorAll(".sub-info-wrapper");
    subWrappers.forEach(wrapper => {
      const subInfos = wrapper.querySelectorAll(".sub-info");
      subInfos.forEach(sub => {
        const header = sub.querySelector("h5");
        header.addEventListener("click", () => {
          const isActive = sub.classList.contains("active");
          subInfos.forEach(s => s.classList.remove("active", "hidden"));
          if (!isActive) {
            sub.classList.add("active");
            subInfos.forEach(s => {
              if (s !== sub) s.classList.add("hidden");
            });
          }
        });
      });
    });

  } else if (city && cityDescriptions[city]) {
    const card = document.createElement("div");
    card.className = "city-card";
    card.innerHTML = `
      <h3>${city}</h3>
      <p>${cityDescriptions[city]}</p>
    `;
    cardsContainer.appendChild(card);
  }
});




  
