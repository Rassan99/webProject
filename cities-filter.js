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
      card.className = "city-card expandable-card";
      card.innerHTML = `
        <h3>جازان</h3>
        <p>منطقة تتميز بزراعة محاصيل متنوعة ذات أهمية ثقافية واقتصادية، أبرزها الفل، البن، والمانجو.</p>
        <div class="expanded-content">
          <div class="crop-section">
            <h4>الفل الجيزاني</h4>
            <p>
              شجيرة عطرية دائمة الخضرة، تُعرف بسرعة نموها وتكيفها مع البيئة. 
              يُعتبر الفل رمزاً للمناسبات في جازان، حيث تستخدمه النساء في التزيّن خلال الأعراس والاحتفالات. 
              يُباع في الأسواق التقليدية مثل سوق الخوبة وصبياء، ويُنظم له مهرجان خاص باسم "مهرجان الفل والنباتات العطرية".
              تُستخدم أجزاؤه كمغلي أو كمادات لعلاج الاحتقان وخفض الحرارة وآلام الرأس.
            </p>
          </div>
          <div class="crop-section">
            <h4>البن الجازاني</h4>
            <p>
              يُزرع البن في المناطق الجبلية ذات المناخ الاستوائي المعتدل. تشتهر جازان بإنتاج بن عالي الجودة قليل المرارة وغني بالنكهة، 
              ويعد من مصادر الدخل المهمة. يُروى من مياه الآبار والمطر، وتدعمه الحكومة كمحصول استراتيجي. 
              البن يحظى بمكانة ثقافية كبيرة، ويرتبط بالضيافة والمناسبات، وله مهرجانات وأسواق مخصصة.
            </p>
          </div>
          <div class="crop-section">
            <h4>المانجو الجازاني</h4>
            <p>
              تُعد المانجو من أهم المحاصيل الصيفية في جازان، وتُزرع بأكثر من 30 صنف مثل التومي والجولي والهندي الخاص. 
              يتم استخدام تقنيات حديثة في الري والتسميد مما يساعد على إنتاج وفير وذو جودة عالية. 
              تقام مهرجانات سنوية للترويج لها، مثل "مهرجان المانجو"، وتُعد المانجو الجازانية منتجًا مطلوبًا محليًا وللتصدير.
            </p>
          </div>
        </div>
      `;
      cardsContainer.appendChild(card);
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
  