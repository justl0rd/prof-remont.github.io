const feedbackData = [
	{
		name: 'Юлия Колесник',
		text: `Мы делали ремонт в трехкомнатной квартире в ноябре прошлого года. Ремонт сделан качественно, все пожелания учтены! У нас было много вопросов по этапам и срокам, все терпеливо разъясняли и помогали ориентироваться в разнообразии отделочных материалов.`,
		title: 'Ремонт для нас стал - приятными хлопотами',
		date: '22.02.2019'
	},
	{
		name: 'Владимир "Доктор" Попов',
		text: `Мы делали ремонт в трехкомнатной квартире в ноябре прошлого года. Ремонт сделан качественно, все пожелания учтены! У нас было много вопросов по этапам и срокам, все терпеливо разъясняли и помогали ориентироваться в разнообразии отделочных материалов.`,
		title: 'Ремонт для нас стал - приятными хлопотами',
		date: '12.02.2019'
	},
	{
		name: 'Марфа Ивановна',
		text: `Внучку лень было делать ремонт и он его заказал, супостат! Но ремонт хороший`,
		title: 'Ремонт для нас стал - приятными хлопотами',
		date: '02.01.2019'
	}
];

const feedBackContainer = document.getElementById('feedback__slider');

class FeddbackSlider {
	constructor(container, data) {
		this.props = {
			data: [...data]
		}
		console.log(container)
	}

	//

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

feedbackSlider = new FeddbackSlider(feedBackContainer, feedbackData);


// <section class="feedback">
// 	<div class="container">
		
// 		<h2 class="feedback__title">
// 		<span class="title-small">
// 			Что о нас говорят клиенты
// 		</span>
// 			Отзывы
// 		</h2>
// 		<div class="feedback__slider" id="feedback__slider">
// 			<!-- // -->
// 		</div>

// 	</div>
// </section>