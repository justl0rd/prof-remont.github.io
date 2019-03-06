'use strict'

const dataToShow = [
	{
		title: 'Капитальный ремонт',
		location: 'Одинцово',
		square: '16 м',
		images: {
			smallImage: {
				alt: '#', // attribute name
				src: 'img/projects/preview/odintsovo-img-1-sm.jpg'
			},
			largeImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-3-sm.jpg'
			},
			cardImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-2-sm.jpg'
			}
		},
		link: '#'
	},
	{
		title: 'Супер ремонт',
		location: 'масква',
		square: '100 м',
		images: {
			smallImage: {
				alt: '#', // attribute name
				src: 'img/projects/preview/odintsovo-img-1-sm.jpg'
			},
			largeImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-3-sm.jpg'
			},
			cardImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-2-sm.jpg'
			}
		},
		link: '#'
	},
	{
		title: 'Просто ремонт',
		location: 'Иваново',
		square: '24 м',
		images: {
			smallImage: {
				alt: '#', // attribute name
				src: 'img/projects/preview/odintsovo-img-1-sm.jpg'
			},
			largeImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-3-sm.jpg'
			},
			cardImage: {
				alt: '#',
				src: 'img/projects/preview/odintsovo-img-2-sm.jpg'
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
		const leftButton = document.querySelector('.projects__left-button'),
			rightButton = document.querySelector('.projects__right-button');

		leftButton.addEventListener('click', e => {
			this.props.slideIndex -= 1;
			if (this.props.slideIndex < 0)
				this.props.slideIndex = this.props.data.length - 1;
			this.renderSlide(container, this.props.slideIndex);
			container.style.animation = 'fade-left 0.5s ease';
			setTimeout(()=> {
				this.renderSlide(container, this.props.slideIndex);
			},200);
			
			setTimeout(()=> {
				container.style.animation = 'none';
			},600);
		});
		rightButton.addEventListener('click', e => {
			this.props.slideIndex += 1;
			if (this.props.slideIndex > this.props.data.length - 1)
				this.props.slideIndex = 0;

			container.style.animation = 'fade-right 0.5s ease';
			setTimeout(()=> {
				this.renderSlide(container, this.props.slideIndex);

			},200);
			setTimeout(()=> {
				container.style.animation = 'none';
			},600);
		});

		window.addEventListener('click', this.modalHandler());
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
			buttonlink = this.createElement('a', 'price-card__button btn', [{link}]);

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

	createModal(src, modalWindow) {
		modalWindow.innerText = '';

		const body = document.getElementsByTagName('body')[0],
			imageSrc = src.replace('-sm', ''),
			image = this.createElement('img', 'projects__modal-image', [{alt: '#',src: imageSrc}]);
			modalWindow.append(image);
			body.append(modalWindow);
	}

	modalHandler() {

		const modalWindow = this.createElement('div', 'projects__modal-window');

		return (e) => {
			const {target} = e,
				imagePath = target.src;
			
			if (container.contains(target) && target.tagName === 'IMG') {
				this.createModal(imagePath, modalWindow);
			}
			else modalWindow.remove();
		}
	}
}

const roomSlider = new RoomSlider(container, dataToShow);