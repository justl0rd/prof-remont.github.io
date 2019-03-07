'use strict'

const previewDataToShow = [
	{
		id: 0,
		areaName:'Спальня',
		path: 'img/preview/0.jpg',

	},
	{
		id: 1,
		areaName:'Коридор',
		path: 'img/preview/1.jpg',

	},
	{
		id: 2,
		areaName:'Кухня',
		path: 'img/preview/2.jpg',

	},
	{
		id: 3,
		areaName:'Ванна',
		path: 'img/preview/3.jpg',

	},
	{
		id: 4,
		areaName:'Балкон',
		path: 'img/preview/4.jpg',

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
			previewAreas = this.createElement('div', 'preview__arias');

		data.forEach(el => {
			const areaEl = this.createElement('span', 'preview__area', [{'data-image-id': el.id}]);
			areaEl.innerText = el.areaName;
			previewAreas.append(areaEl);
		});

		galleryContainer.append();
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

		frontImage.style.animation = 'fade-out-left 1.5s ease';
		backImage.style.animation = 'unblur-scale 1.5s ease'

		setTimeout(() => {
			this.renderGallery(container, slide);
			frontImage.style.animation = '';
			backImage.style.animation = '';
		}, 1000);
	}

	galleryHandler() {
		const galleryButtons = document.querySelector('.preview__arias'),
			galleryContainer = document.querySelector('.preview__images');

		galleryButtons.addEventListener('click', (e)=> {
			const {target} = e,
				slideId = +target.dataset.imageId;
				
			if (target.tagName === 'SPAN') {
				this.animateRender(galleryContainer, slideId)
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