const feedbackData = [
	{
		id: 0,
		name: 'Юлия Колесник',
		text: `Мы делали ремонт в трехкомнатной квартире в ноябре прошлого года. Ремонт сделан качественно, все пожелания учтены! У нас было много вопросов по этапам и срокам, все терпеливо разъясняли и помогали ориентироваться в разнообразии отделочных материалов.`,
		title: 'Ремонт для нас стал - приятными хлопотами',
		date: '22.02.2019'
	},
	{
		id: 1,
		name: 'Владимир Попов',
		name: 'Владимир "Доктор" Попов',
		text: `Мы делали ремонт в трехкомнатной квартире в ноябре прошлого года. Ремонт сделан качественно, все пожелания учтены! У нас было много вопросов по этапам и срокам, все терпеливо разъясняли и помогали ориентироваться в разнообразии отделочных материалов.`,
		title: 'Ремонт для нас стал - приятными хлопотами',
		date: '12.02.2019'
	},
	{
		id: 2,
		name: 'Ольга Иванова',
		text: `Мы делали ремонт в трехкомнатной квартире в ноябре прошлого года. Ремонт сделан качественно, все пожелания учтены! У нас было много вопросов по этапам и срокам, все терпеливо разъясняли и помогали ориентироваться в разнообразии отделочных материалов.`,
		title: 'Ремонт для нас стал - приятными хлопотами',
		date: '12.02.2019'
	},
	{
		id: 3,
		name: 'Галина Колесник',
		text: `Мы делали ремонт в трехкомнатной квартире в ноябре прошлого года. Ремонт сделан качественно, все пожелания учтены! У нас было много вопросов по этапам и срокам, все терпеливо разъясняли и помогали ориентироваться в разнообразии отделочных материалов.`,
		title: 'Ремонт для нас стал - приятными хлопотами',
		date: '12.12.2018'
	}
];

const feedBackContainer = document.getElementById('feedback__slider');

class FeedbackSlider {
	constructor(container, data) {
		this.props = {
			data: [...data],
			currentPerson: 0
		}

		this.render(container);
		// this.dataUpdateHandler(7000);
		this.dataHandler();
		this.markerHandler();
	}

	render(container) {

		const {data} = this.props,
			feedbackTextWrapper = this.createElement('div', 'feedback__reviews'),
			infoTitleBlock = this.createElement('div', 'feedback__info'),
			textBlock = this.createElement('div', 'feedback__text'),
			pointersWrapper = this.createElement('div', 'feedback__pointers_wrapper'),
			ul = this.createElement('ul', 'feedback__pointers'),
			title = this.createElement('h3', 'feedback__name'),
			date = this.createElement('span', 'feedback__date'),
			personName = this.createElement('h4', 'feedback__persons-name'),
			personText = this.createElement('p', 'feedback__persons-comment');

			data.map(obj => {
				const li = this.createElement('li', 'feedback__pointer', [{'data-comment-id': obj.id}])
				ul.append(li);
			});

		infoTitleBlock.append(title, date);
		textBlock.append(personName, personText);
		feedbackTextWrapper.append(infoTitleBlock, textBlock);
		pointersWrapper.append(ul);
		container.append(feedbackTextWrapper, pointersWrapper);

		this.renderData(infoTitleBlock, textBlock)
	}

	renderData() {
		const {data, currentPerson} = this.props,
			title = document.querySelector('.feedback__name'),
			date = document.querySelector('.feedback__date'),
			name = document.querySelector('.feedback__persons-name'),
			comment = document.querySelector('.feedback__persons-comment');

		title.innerText = data[currentPerson].title;
		date.innerText = data[currentPerson].date;	
		name.innerText = data[currentPerson].name;	
		comment.innerText = data[currentPerson].text;
	}

	dataUpdateHandler(time) {

		setInterval( ()=> {
			this.props.currentPerson +=1;
			if (this.props.currentPerson >= this.props.data.length) {
				this.props.currentPerson = 0;
			}
			setTimeout( ()=> {
				this.renderData();
				this.markerHandler();
			}, 10);
		}, time);
	}

	dataHandler() {
		const buttons = document.querySelectorAll('.feedback__pointer'),
			buttonsWrapper = document.querySelector('.feedback__pointers');

		buttonsWrapper.addEventListener('click', (e) => {
			const {target} = e,
				id = +target.dataset.commentId;
			
			if (target.tagName !== 'LI') {
				return;
			}

			this.props.currentPerson = id;
			setTimeout(()=>{
				this.renderData();
				this.markerHandler();
			}, 10)
		});
	}

	markerHandler() {
		const {currentPerson} = this.props,
			buttons = document.querySelectorAll('.feedback__pointer');
		
		buttons[currentPerson].classList.add('feedback__gallery_checked');

		for (let button of buttons) {
			if (currentPerson !== +button.dataset.commentId && button.classList.contains('feedback__gallery_checked')) {
				button.classList.remove('feedback__gallery_checked');
			}
		}
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

const feedbackSlider = new FeedbackSlider(feedBackContainer, feedbackData);