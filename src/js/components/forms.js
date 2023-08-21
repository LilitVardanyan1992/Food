// const spinner = require("./spinner");
import spinner from "./spinner";
import { closeModal, openModal } from "./modal";

function formsModule() {
	const forms = document.querySelectorAll("form");
	const messages = {
		loading: spinner,
		success: "Thank you ! We will contact with you !",
		failure: "Sorry, but something went wrong !"
	};

	forms.forEach(form => bindPostData(form));

	// async function postData(url, data) {
	// 	const result = await fetch(url, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-type": "application/json; charset=utf-8"
	// 		},
	// 		body: data
	// 	});

	// 	if (!result.ok) {
	// 		throw new Error("Error");
	// 	}

	// 	return await result.json();
	// }

	// async function getData(url) {
	// 	const result = await fetch(url);

	// 	if (!result.ok) {
	// 		throw new Error(`Could not fetch  ${url}, status: ${result.status}`);
	// 	}

	// 	return await result.json();
	// }

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const { loading, success, failure } = messages;

			const loader = document.createElement("div");
			loader.innerHTML = loading();
			form.append(loader);

			if (!navigator.onLine) {
				messagesModal(failure + ":" + "Please check your internet connection !");
				loader.remove();
				form.reset();
			}

			const empty = /^$/g;
			const phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
			let status = false;

			for (let i = 0; i < form.querySelectorAll("input").length; i++) {
				if (empty.test(form[i].value) || !phone.test(form[1].value)) {
					status = false;
					messagesModal("Please fill all fields, and on Phone number field please fill only numbers")
					loader.remove();
					form.reset();
					break;
				} else {
					status = true;
				}
			}

			if (status) {
				const formData = new FormData(form);
				// const json = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())));
				const data = Object.fromEntries(formData)

				axios.post("http://localhost:8888/requests", data)
					// postData("http://localhost:8888/requests", json)
					.then(data => {
						console.log(data);
						messagesModal(success);
					})
					.catch(err => {
						messagesModal(failure + ": " + err);
					})
					.finally(() => {
						loader.remove();
						form.reset();
					});
			} else {
				console.log("status is false");
			}
		});
	}

	function messagesModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide");
		openModal(document.querySelector(".modal"));

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close> &times;</div>
				<div class="modal__title"> ${message} </div>
			</div>
		`;

		document.querySelector(".modal").append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModal(document.querySelector(".modal"));
		}, 2000);
	}
}

// module.exports = formsModule;
export default formsModule;