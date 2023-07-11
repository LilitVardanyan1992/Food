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
            total,
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
        const daysBlock = timer.querySelector("#days");
        const hoursBlock = timer.querySelector("#hours");
        const minutesBlock = timer.querySelector("#minutes");
        const secondsBlock = timer.querySelector("#seconds");
        const timerId = setInterval(updateClock, 1000);

        function updateClock() {
            const { total, days, hours, minutes, seconds } = getTimeRemaining(deadline);;

            daysBlock.textContent = setZero(days);
            hoursBlock.textContent = setZero(hours);
            minutesBlock.textContent = setZero(minutes);
            secondsBlock.textContent = setZero(seconds);

            if (total <= 0) {
                clearInterval(timerId);
            }
        }
    }

    setClock(".timer", deadline);

    //timer logic end
})

const start = Date.now()
console.log(start)