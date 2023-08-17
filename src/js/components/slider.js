function slider () {
    // Slider


	const slides = document.querySelectorAll(".offer__slide");
	const slider = document.querySelector(".offer__slider");
	const prevBtn = document.querySelector(".offer__slider-prev");
	const nextBtn = document.querySelector(".offer__slider-next");
	const total = document.querySelector("#total");
	const current = document.querySelector("#current");
	const slidesWrapper = document.querySelector(".offer__slider-wrapper");
	const slidesField = document.querySelector(".offer__slider-inner");
	const width = window.getComputedStyle(slidesWrapper).width;


	let offset = 0;
	let slideIndex = 1
	const slideWidth = parseFloat(width);

	function setSlideCountText() {
		total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
		current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
	}

	function updateSlideAndDot() {
		slidesField.style.transform = `translateX(-${offset}px)`;

		dots.forEach(dot => dot.style.opacity = "0.5");
		dots[slideIndex - 1].style.opacity = 1;

		setSlideCountText();
	}

	slidesField.style.cssText = `
		display: flex;
		width: ${100 * slides.length + "%"};
		transition: all 0.5s;
	`;

	slidesWrapper.style.cssText = `
		overflow: hidden;
	`;

	slides.forEach(slide => {
		slide.style.width = width;
	});

	function createIndicators() {
		const indicators = document.createElement("ul");
		indicators.classList.add("carousel-indicators");
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

		for (let i = 0; i < slides.length; i++) {
			const dot = document.createElement("li");
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

			indicators.append(dot);
			dots.push(dot);
		}

		return indicators;
	}

	const dots = [];
	const indicators = createIndicators();
	slider.style.position = "relative";
	slider.append(indicators);

	nextBtn.addEventListener("click", () => {
		// debugger
		if (offset === slideWidth * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += slideWidth;
		}

		if (slideIndex === slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		updateSlideAndDot()
	})

	prevBtn.addEventListener("click", () => {
		if (offset === 0) {
			offset = slideWidth * (slides.length - 1)
		} else {
			offset -= slideWidth;
		}

		if (slideIndex === 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		updateSlideAndDot()
	})

	dots.forEach((dot, index) => {
		dot.addEventListener("click", (e) => {
			slideIndex = index + 1;
			offset = slideWidth * index;
			updateSlideAndDot();
		})
	})

	// SLider varient 1 start

	// slides.length < 10 ? total.textContent = `0${slides.length}`: total.textContent = slides.length;

	// function showSlides (n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(slide => slide.style.display = "none");
	// 	slides[slideIndex - 1].style.display = "block";

	// 	slides.length < 10 ? current.textContent = `0${slideIndex}`: current.textContent = slideIndex;
	// }

	// function slidesState (n) {
	// 	showSlides(slideIndex += n);
	// }

	// prevBtn.addEventListener("click", () => slidesState(-1));
	// nextBtn.addEventListener("click", () => slidesState(1));
	// showSlides(slideIndex);


	// SLider varient 1 end

}

module.exports = slider;