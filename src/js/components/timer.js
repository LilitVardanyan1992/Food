function timerModule(timerParam) {
	function getTimeRemaining(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date());
		let days, hours, minutes, seconds;

		if (total <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(total / (1000 * 60 * 60 * 24));
			hours = Math.floor((total / (1000 * 60 * 60) % 24));
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
		return n >= 0 && n < 10 ? `0${n}` : n;
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const daysBlock = timer.querySelector("#days");
		const hoursBlock = timer.querySelector("#hours");
		const minutesBlock = timer.querySelector("#minutes");
		const secondsBlock = timer.querySelector("#seconds");
		const timerId = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);

			daysBlock.textContent = setZero(days);
			hoursBlock.textContent = setZero(hours);
			minutesBlock.textContent = setZero(minutes);
			secondsBlock.textContent = setZero(seconds);

			if (total <= 0) {
				clearInterval(timerId);
			}
		}
	}

	setClock(".timer", timerParam);
}

// module.exports = timerModule;
export default timerModule;