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
      const card = document.createElement("div");
      card.className = "city-card expandable-card expanded";

      card.innerHTML = `
  <h3>جازان</h3>
  <p>منطقة تتميز بزراعة محاصيل متنوعة ذات أهمية ثقافية واقتصادية، أبرزها الفل، البن، والمانجو.</p>
  <div class="expanded-content">
    <div class="crop-wrapper">
      <div class="crop-section">
        <h4>الفل الجيزاني</h4>
        <p>... التفاصيل ...</p>
        

  <div class="sub-info-wrapper">
    <div class="sub-info">
      <h5>مع الثقافة</h5>
      <p>يُستخدم الفل في المناسبات الشعبية والزينة التقليدية... إلخ</p>
    </div>
    <div class="sub-info">
      <h5>مع الطب</h5>
      <p>يُستخدم كمغلي أو كمادات لعلاج الاحتقان وخفض الحرارة... إلخ</p>
    </div>
    <div class="sub-info">
      <h5>ما يمكن زيارته</h5>
      <p>سوق الخوبة، مهرجان الفل والنباتات العطرية... إلخ</p>
    </div>
  </div>


      </div>
      <div class="crop-section">
        <h4>البن الجازاني</h4>
        <p>... التفاصيل ...</p>
      </div>
      <div class="crop-section">
        <h4>المانجو الجازاني</h4>
        <p>... التفاصيل ...</p>
      </div>
    </div>
  </div>
`;


cardsContainer.appendChild(card);

// NOW attach the crop click logic after the DOM is updated
const cropSections = card.querySelectorAll(".crop-section");

cropSections.forEach(section => {
  const title = section.querySelector("h4");
  title.addEventListener("click", () => {
    const isActive = section.classList.contains("active");

    // Reset all
    cropSections.forEach(s => {
      s.classList.remove("active", "hidden");
    });
    
    
    if (!isActive) {
      section.classList.add("active");
      cropSections.forEach(s => {
        if (s !== section) s.classList.add("hidden");
      });
    }
  });
});
 
// ✅ Then: handle sub-info (مع الثقافة / الطب / الزيارة) clicks
const subWrappers = card.querySelectorAll(".sub-info-wrapper");

subWrappers.forEach(wrapper => {
  const subInfos = wrapper.querySelectorAll(".sub-info");

  subInfos.forEach(sub => {
    const header = sub.querySelector("h5");
    header.addEventListener("click", () => {
      const isActive = sub.classList.contains("active");

      // Reset all
      subInfos.forEach(s => {
        s.classList.remove("active", "hidden");
      });

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



  
