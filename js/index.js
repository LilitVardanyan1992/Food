window.addEventListener("DOMContentLoaded", function () {
    const tabsHeader = document.querySelectorAll(".tabheader__item");
    const tabsContents = document.querySelectorAll(".tabcontent");
    const tabsHeaderParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContents.forEach(tabContent => {
            tabContent.classList.add("hide");
            tabContent.classList.remove("show", );
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
        if(e.target && e.target.matches(".tabheader__item")) {
            tabsHeader.forEach((tabHeader, index) => {
                if (e.target === tabHeader) {
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    })
})