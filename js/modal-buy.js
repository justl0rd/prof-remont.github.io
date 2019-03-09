'use strict'

const jobsModal = (function (container) {
	const modalWindow = document.querySelector('.job-types'),
		jobs = document.querySelector('.job-types__value');

	window.addEventListener('click', e=> {
		const {target} = e;

		if (target.closest('.offers__card')) {
			const currentJobs = target.closest('.offers__card').dataset.jobsTypes;
			jobs.innerText = currentJobs;
			modalWindow.classList.toggle('job-types_open');
		}

		else if (!target.closest('.job-types')) {
			modalWindow.classList.remove('job-types_open');
		}
	})

})();