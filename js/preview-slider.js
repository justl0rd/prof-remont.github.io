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
			prevSlide = (slide > 0 ? slide - 1 : data.length - 1),
			backImage = this.createElement('div', 'preview__back-image'),
			frontImage = this.createElement('div', 'preview__front-image');

		backImage.style.background = `url(${data[prevSlide].path})`;
		frontImage.style.background = `url(${data[slide].path})`;

		container.append(backImage, frontImage);
	}

	galleryHandler() {
		const galleryButtons = document.querySelector('.preview__arias'),
			galleryContainer = document.querySelector('.preview__images');

		galleryButtons.addEventListener('click', (e)=> {
			const {target} = e,
				slideId = target.dataset.imageId;
				
			if (target.tagName === 'SPAN') {
				this.renderGallery(galleryContainer, slideId);
				this.props.currentSlide = slideId;
			}
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