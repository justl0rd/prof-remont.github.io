'use strict'

const dataToShow = [
	{
		title: 'Капитальный ремонт',
		location: 'Одинцово',
		square: '16 м',
		images: {
			smallImage: {
				alt: '#', // attribute name
				src: 'img/projects/preview/odintsovo-img-1_sm.jpg' // attribute value
			},
			largeImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-3_sm.jpg'
			},
			cardImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-2_sm.jpg'
			}
		},
		link: '#'
	},
	{
		title: 'Капитальный ремонт',
		location: 'Одинцово',
		square: '16 м',
		images: {
			smallImage: {
				alt: '#', // attribute name
				src: 'img/projects/preview/odintsovo-img-1_sm.jpg' // attribute value
			},
			largeImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-1_sm.jpg'
			},
			cardImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-1_sm.jpg'
			}
		},
		link: '#'
	}
];

const container = document.getElementById('room-slider');

class RoomSlider {
	constructor(container, dataToShow) {
		this.props = {
			data: [...dataToShow],
			slideIndex: 0
		}

		this.renderSlide(container, this.props.slideIndex);
	}

	renderSlide(container, idx) {
		const {images, link, location, square, title} = this.props.data[idx];

		container.innerText = '';

		const tileBlock = this.createElement('div', 'projects__tile'),
			infoBlock = this.createElement('div', 'projects__info'),
			projectsInfoBlock = this.createElement('div', 'projects__info_wrapper'),
			titleInfo = this.createElement('h4', 'projects__title-info'),
			locationInfo = this.createElement('p', 'projects__location'),
			squareInfo = this.createElement('span', 'projects__square'),
			smallImage = this.createElement('img', 'projects__image_small', [images.smallImage]),
			largeImage = this.createElement('img', 'projects__image_large', [images.largeImage]),
			priceCard = this.createElement('div', 'projects__price-card'),
			priceImage = this.createElement('img', 'price-card__image', [images.cardImage]),
			buttonlink = this.createElement('a', 'price-card__button', [{link}]);

		titleInfo.innerText = title;
		locationInfo.innerText = location;
		squareInfo.innerText = square;
		buttonlink.innerText = 'Узнать стоимость';
		projectsInfoBlock.append(infoBlock, smallImage);
		infoBlock.append(titleInfo, locationInfo, squareInfo);
		tileBlock.append(projectsInfoBlock, largeImage);
		priceCard.append(priceImage, buttonlink);
		container.append(tileBlock, priceCard);
	}

	createElement(tagName, className, attributes) {
		const element = document.createElement(tagName);
		element.classList.add(className);

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

const roomSlider = new RoomSlider(container, dataToShow);