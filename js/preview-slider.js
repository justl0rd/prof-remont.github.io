'use strict'

const previewDataToShow = [
	{
		id: 0,
		areaName:'Спальня',
		path: 'img/preview/00.jpg',

	},
	{
		id: 1,
		areaName:'Коридор',
		path: 'img/preview/01.jpg',

	},
	{
		id: 2,
		areaName:'Кухня',
		path: 'img/preview/02.jpg',

	},
	{
		id: 3,
		areaName:'Ванна',
		path: 'img/preview/03.jpg',

	},
	{
		id: 4,
		areaName:'Балкон',
		path: 'img/preview/04.jpg',

	}
];


const previewSliderContainer = document.getElementById('preview');

class PreviewSlider {
	constructor(container, data) {
		this.props = {
			data: [...data],
			currentSlide: 0
		}

		this.render(container);
		this.galleryHandler();
		this.clickHandler();

		// const frontImage = document.querySelector('.preview__front-image');
	}

	render(container) {
		const {data, currentSlide} = this.props,
			galleryContainer = this.createElement('div', 'preview__images'),
			previewAreas = this.createElement('div', 'preview__arias'),
			button = this.createElement('button', 'preview__right-button');

		data.forEach(el => {
			const areaEl = this.createElement('span', 'preview__area', [{'data-image-id': el.id}]);
			areaEl.innerText = el.areaName;
			previewAreas.append(areaEl);
		});

		previewAreas.append(button);
		container.append(galleryContainer, previewAreas);

		this.renderGallery(galleryContainer, currentSlide);
	}

	renderGallery(container, slide) {
		container.innerText = '';

		const {data} = this.props,
			nextSlide = (slide + 1 >  data.length - 1 ? 0 : slide + 1),
			backImage = this.createElement('div', 'preview__back-image'),
			frontImage = this.createElement('div', 'preview__front-image');

		backImage.style.background = `url(${data[nextSlide].path})`;
		frontImage.style.background = `url(${data[slide].path})`;
		
		container.append(backImage, frontImage);
		setTimeout(()=> {this.markerHandler()}, 0);
	}

	animateRender(container, slide) {
		const frontImage = document.querySelector('.preview__front-image'),
			backImage = document.querySelector('.preview__back-image');

		backImage.classList.remove('preview__back-image');
		backImage.classList.add('preview__front-image');

		frontImage.style.transform = 'translateX(-150%)';
		frontImage.classList.remove('preview__front-image');
		frontImage.classList.add('preview__back-image');

			
		setTimeout(() => {
			// frontImage.style.animation = 'in-right 5s ease'; <== back image
			this.renderGallery(container, slide);
		}, 900);
	}

	galleryHandler() {
		const galleryButtons = document.querySelector('.preview__arias'),
			galleryContainer = document.querySelector('.preview__images');

		galleryButtons.addEventListener('click', (e)=> {
			const {target} = e,
				slideId = +target.dataset.imageId;
				
			if (target.tagName === 'SPAN') {
				// this.animateRender(galleryContainer, slideId)
				// this.renderGallery(galleryContainer, slideId);
				this.props.currentSlide = slideId;
			}
		});
	}

	markerHandler() {
		const {currentSlide} = this.props,
			galleryButtons = document.querySelectorAll('.preview__area');
		
		galleryButtons[currentSlide].classList.add('preview__gallery_checked');

		for (let button of galleryButtons) {
			if (currentSlide !== +button.dataset.imageId && button.classList.contains('preview__gallery_checked')) {
				button.classList.remove('preview__gallery_checked');
			}
		}
	}

	clickHandler() {
		const galleryContainer = document.querySelector('.preview__images'),
			button = document.querySelector('.preview__right-button');

		button.addEventListener('click', () => {
			this.props.currentSlide += 1;
			if (this.props.currentSlide > this.props.data.length - 1)
				this.props.currentSlide = 0;

			// this.renderGallery(galleryContainer, this.props.currentSlide);
			this.animateRender(galleryContainer, this.props.currentSlide);
		});
	}

	createElement(tagName, className, attributes) {
		const element = document.createElement(tagName),
			classList = className.split(' ');
		if (classList.length >= 1) {
			classList.forEach(cl => {
				element.classList.add(cl);
			});
		}

		if (attributes) {
			attributes.map(attribute => {
				for (let key in attribute) {
					element.setAttribute(key, attribute[key]);
				}
			});
		}
		return element;
	}
}

const previewSlider = new PreviewSlider(previewSliderContainer, previewDataToShow);