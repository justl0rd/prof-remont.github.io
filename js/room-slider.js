'use strict'

const dataToShow = [
	{
		title: 'Капитальный ремонт',
		location: 'Одинцово',
		square: '16 м',
		image: {
			smallImage: {
				alt: '',
				url: ''
			},
			largeImage: {
				alt: '',
				url: ''
			},
			cardImage: {
				alt: '',
				url: ''
			}
		}
	}
];

const container = document.getElementById('room-slider');

class RoomSlider {
	constructor() {
		//
	}
}

const roomSlider = new RoomSlider(container, dataToShow);