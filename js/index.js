window.addEventListener("DOMContentLoaded", function () {
    //tab logic start

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

    //tab logic end

    //timer logic start

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

    //timer logic end

    //modal logic start

    const modalTrigger = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");
    const modalCloseBtn = document.querySelector("[data-close]");

    modalTrigger.forEach(btn => btn.addEventListener("click", openModal));

    document.addEventListener("click", (e) => {
        if(e.target !== ".modal" && e.target.matches(".show") || e.target === modalCloseBtn) {
           closeModal();
        }
    })

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
           closeModal();
        }
    })
  
    const modalTimerId = setTimeout(openModal, 5000);

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

    //modal logic end
})

