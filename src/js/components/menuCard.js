function menuCard () {
    
	// used Class for menu cards start
	// class MenuCard {
	// 	constructor(img, alt, title, descr, price, parentSelector) {
	// 		this.img = img;
	// 		this.alt = alt;
	// 		this.title = title;
	// 		this.descr = descr;
	// 		this.price = price;
	// 		this.parent = document.querySelector(parentSelector);
	// 		this.transfer = 27;
	// 		this.changeToUAH();
	// 	}

	// 	changeToUAH() {
	// 		this.price = +this.price * this.transfer;
	// 	}

	// 	render() {
	// 		const { img, alt, title, descr, price, parent } = this;
	// 		const element = document.createElement("div");
	// 		element.classList.add("menu__item")
	// 		element.innerHTML = `
	// 			<img src=${img} alt=${alt}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 			</div>
	// 		`;

	// 		parent.append(element);
	// 	}
	// };

	// getData("http://localhost:8888/menu")
	// 	.then(data => {
	// 		data.forEach(({ img, altimg, title, descr, price }) => {
	// 			new MenuCard(img, altimg, title, descr, price, ".menu .container").render()
	// 		});
	// 	});

	// used Class for menu cards end

	// getData("http://localhost:8888/menu")
	// 	.then(data => createMenuCard(data));

	function createMenuCard(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			const element = document.createElement("div");
			element.classList.add("menu__item");
			const transfer = 29.59;

			function changeToUAH() {
				price = (parseFloat(price) * parseFloat(transfer)).toFixed(2);
			}

			changeToUAH();

			element.innerHTML = `
				<img src=${img} alt=${altimg}>
				<h3 class="menu__item-subtitle">${title}</h3>
				<div class="menu__item-descr">${descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${price}</span> грн/день</div>
				</div>
			`;

			document.querySelector(".menu .container").append(element);
		});
	}

	axios.get("http://localhost:8888/menu")
		.then(data => createMenuCard(data.data))
}

module.exports = menuCard;