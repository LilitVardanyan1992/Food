function sliderModule() {
	let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll(".offer__slide");
	const slider = document.querySelector(".offer__slider");
	const prevBtn = document.querySelector(".offer__slider-prev");
	const nextBtn = document.querySelector(".offer__slider-next");
	const total = document.querySelector("#total");
	const current = document.querySelector("#current");
	const slidesWrapper = document.querySelector(".offer__slider-wrapper");
	const slidesField = document.querySelector(".offer__slider-inner");
	const width = window.getComputedStyle(slidesWrapper).width;

	checkForZero();

	slidesField.style.cssText = `
		display: flex;
		width: ${100 * slides.length + "%"};
		transition: all 0.5s;
	`;

	slidesWrapper.style.cssText = `
		overflow: hidden;
	`;

	slides.forEach(slide => slide.style.width = width);

	slider.style.position = "relative";

	const indicators = document.createElement("ul");
	const dots = [];
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;

		if (i === 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	nextBtn.addEventListener("click", () => {
		sliderLogic(width.replace(/\D/g, "") * (slides.length - 1), true, false);
		checkForZero();
		dotsLogic();
	});

	prevBtn.addEventListener("click", () => {
		sliderLogic(0, false, true);
		checkForZero();
		dotsLogic();
	});

	dots.forEach(dot => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");
			slideIndex = slideTo;
			offset = width.replace(/\D/g, "") * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			checkForZero();
			dotsLogic();
		});
	});

	function checkForZero() {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
	}

	function dotsLogic() {
		dots.forEach(dot => dot.style.opacity = "0.5");
		dots[slideIndex - 1].style.opacity = 1;
	}

	function sliderLogic(statment, next = false, prev = false) {
		// nextBtn
		if (next === true && prev === false) {
			slideIndex === slides.length || slideIndex >= slides.length ? slideIndex = 1 : slideIndex++;
			offset === statment ? offset = 0 : offset += +width.replace(/\D/g, "");
		}
		// prevBtn
		if (next === false && prev === true) {
			slideIndex === 1 || slideIndex <= 1 ? slideIndex = slides.length : slideIndex--;
			offset === statment ? offset = width.replace(/\D/g, "") * (slides.length - 1) : offset -= +width.replace(/\D/g, "");
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
	}
}

// module.exports = sliderModule;
export default sliderModule;