import tabsModule from "./components/tab.js";
import timerModule from "./components/timer.js";
import modalModule from "./components/modal.js";
import menuCardsModule from "./components/menuCard.js";
import formsModule from "./components/forms.js";
import sliderModule from "./components/slider.js";
import calculatorModule from "./components/calculator.js";

window.addEventListener("DOMContentLoaded", function () {
	// const tabsModule = require("./components/tab");
	// const timerModule = require("./components/timer");
	// const modalModule = require("./components/modal");
	// const menuCardsModule = require("./components/menuCards");
	// const formsModule = require("./components/forms");
	// const sliderModule = require("./components/slider");
	// const calculatorModule = require("./components/calculator");


	tabsModule();
	timerModule("2023-12-31 23:59:59");
	modalModule();
	menuCardsModule();
	formsModule();
	sliderModule();
	calculatorModule();
});