function calculator () {
    // Calculating start
	const result = document.querySelector(".calculating__result span");

	let gender = "female";
	let activityFactor = "small";
	let height = 0;
	let weight = 0;
	let age = 0;
	
	// Set up event listeners for static information (gender and activity factor)
	function setStaticInformation(selector, activeClass, dataKey) {
	  const elements = document.querySelectorAll(selector);
	
	  elements.forEach(elem => {
		elem.addEventListener("click", () => {
		  elements.forEach(elem => elem.classList.remove(activeClass));
		  elem.classList.add(activeClass);
		  localStorage.setItem(dataKey, elem.id);
	
		  if (dataKey === "gender") {
			gender = elem.id;
		  } else if (dataKey === "activityFactor") {
			activityFactor = elem.id;
		  }
	
		  calcTotal();
		});
	  });
	}
	
	setStaticInformation("#gender div", "calculating__choose-item_active", "gender");
	setStaticInformation(".calculating__choose_big div", "calculating__choose-item_active", "activityFactor");
	
	// Set up event listeners for dynamic information (height, weight, age)
	function setDynamicInformation(selector, dataType) {
	  const input = document.querySelector(selector);
	
	  input.addEventListener("input", () => {
		const value = parseFloat(input.value);
		if (!isNaN(value)) {
		  input.style.border = "none";
	
		  switch (dataType) {
			case "height":
			  height = value;
			  break;
			case "weight":
			  weight = value;
			  break;
			case "age":
			  age = value;
			  break;
		  }
		  
		  calcTotal();
		} else {
		  input.style.border = "1px solid #f00";
		}
	  });

	  input.addEventListener("blur", () => {
		if (isNaN(input.value)) {
			input.style.border = "1px solid #f00";
		} else {
			input.style.border = "none";
		}
	  })
	}
	
	setDynamicInformation("#height", "height");
	setDynamicInformation("#weight", "weight");
	setDynamicInformation("#age", "age");
	
	// Calculate total calories based on the collected data
	function calcTotal() {
	  let bmr;
	
	  if (!gender || !height || !weight || !age || !activityFactor) {
		result.textContent = "_________";
		return;
	  }
	
	  if (gender === "male") {
		bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
	  } else if (gender === "female") {
		bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
	  } else {
		throw new Error("Invalid gender");
	  }
	
	  let activityFactorValue;
	
	  switch (activityFactor) {
		case "low":
		  activityFactorValue = 1.2;
		  break;
		case "small":
		  activityFactorValue = 1.375;
		  break;
		case "medium":
		  activityFactorValue = 1.55;
		  break;
		case "high":
		  activityFactorValue = 1.725;
		  break;
		default:
		  throw new Error("Invalid activity level");
	  }
	
	  const dailyCalories = Math.round(bmr * activityFactorValue);
	  result.textContent = dailyCalories;
	}
	
	// Initial calculation
	calcTotal();
}

module.exports = calculator;