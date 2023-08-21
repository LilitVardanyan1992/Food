function closeModal (modal) {
	modal.classList.add("hide");
	modal.classList.remove("show");
	document.body.removeAttribute("style");
}

function openModal(modal) {
	debugger
	modal.classList.add("show");
	modal.classList.remove("hide");
	document.body.style.overflow = "hidden";
	// clearTimeout(modalTimerId);
}

function modalModule() {
	
	const modalTrigger = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");

	modalTrigger.forEach(btn => btn.addEventListener("click", () => openModal(modal)));

	closeModal(modal);
	openModal(modal);

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			closeModal(modal);
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.matches(".show")) {
			closeModal(modal);
		}
	});

	// const modalTimerId = this.setTimeout(() => openModal(modal), 500000);

	function showModalByScroll() {
		// if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
		// 	openModal(modal);
		// 	window.removeEventListener("scroll", showModalByScroll);
		// }
		if (window.scrollY >= 1000) {
			openModal(modal);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);
}

// module.exports = modalModule;
export { closeModal, openModal };
export default modalModule;