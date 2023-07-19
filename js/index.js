window.addEventListener("DOMContentLoaded", function () {
    // tab logic start

    const tabsHeader = document.querySelectorAll(".tabheader__item");
    const tabsContents = document.querySelectorAll(".tabcontent");
    const tabsHeaderParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContents.forEach(tabContent => {
            tabContent.classList.add("hide");
            tabContent.classList.remove("show");
        })
        tabsHeader.forEach(tabHeader => tabHeader.classList.remove("tabheader__item_active"));
    }

    function showTabContent(i = 0) {
        tabsContents[i].classList.add("show", "fade");
        tabsContents[i].classList.remove("hide");
        tabsHeader[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsHeaderParent.addEventListener("click", (e) => {
        if (e.target && e.target.matches(".tabheader__item")) {
            tabsHeader.forEach((tabHeader, index) => {
                if (e.target === tabHeader) {
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    })

    // tab logic end

    // timer logic start

    const deadline = "2023-07-17";

    function getTimeRemaining(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (total <= 0) {
            days = 0,
                hours = 0,
                minutes = 0,
                seconds = 0
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((total / 1000 / 60) % 60);
            seconds = Math.floor((total / 1000) % 60);
        }

        return {
            days,
            hours,
            minutes,
            seconds
        }
    }

    function setZero(n) {
        return n < 10 ? "0" + n : n;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const timerParts = timer.querySelectorAll("span");

        updateClock();

        function updateClock() {
            const calculation = getTimeRemaining(deadline);
            const calculationValues = Object.values(calculation);

            const timerId = setInterval(updateClock, 1000);

            timerParts.forEach((part, index) => {
                part.textContent = setZero(calculationValues[index])
            })

            if (total <= 0) {
                clearInterval(timerId);
            }
        }
    }

    setClock(".timer", deadline);

    // timer logic end

    // modal logic start

    const modalTrigger = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");
    const modalCloseBtn = document.querySelector("[data-close]");

    modalTrigger.forEach(btn => btn.addEventListener("click", openModal));

    document.addEventListener("click", (e) => {
        if (e.target !== ".modal" && e.target.matches(".show") || e.target === modalCloseBtn) {
            closeModal();
        }
    })

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    })

    // const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearTimeout(modalTimerId);
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.removeAttribute("style");
    }

    // modal logic end

    // used Class for menu items start

    class MenuCard {
        constructor(img, alt, title, descr, price, parentSelector) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const {img, alt, title, descr, price, parent} = this;
            const element = document.createElement("div");
            element.classList.add("menu__item");
            element.innerHTML = `
                    <img src=${img} alt=${alt}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> грн/день</div>
                    </div>
            `
            parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню \"Фитнес\"",
        "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        8,
        ".menu .container"
    ).render()
    
    new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		"Меню \"Премиум\"",
		"В меню \"Премиум\" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
		15,
		".menu .container"
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"postnoe",
		"Меню \"Постное\"",
		"Меню \"Постное\" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
		13,
		".menu .container"
	).render();
    // used Class for menu items end
})

