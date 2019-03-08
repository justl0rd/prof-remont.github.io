'use strict'

function addActiveClass() {

	const container = document.getElementById('design');
	container.addEventListener('click', e=> {
		const {element} = e.target.dataset,
			{target} = e;

		if (!element) return;

		const smallContainer = target.parentNode.parentNode,
			largeContainer = smallContainer.parentNode;
		
		let largeClassList = [...largeContainer.className.split(' ')],
			smallClassList = [...smallContainer.className.split(' ')];

		// large container
		if (largeContainer.className.includes('-active')) {
			largeClassList.splice(largeClassList.length - 1, 1);
			largeContainer.className = largeClassList.join(' ');
		}
		largeContainer.classList.add(element + '-lg');
		
		if (smallContainer.className.includes('-active')) {
			smallClassList.splice(smallClassList.length - 1, 1);
			smallContainer.className = smallClassList.join(' ');
		}
		smallContainer.classList.add(element + '-sm');
		// small container
	});
}

addActiveClass();