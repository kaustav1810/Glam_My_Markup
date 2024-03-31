const textAreas =
	document.querySelectorAll('textarea');

const submitBtn = document.querySelector(
	'#camp-activities-inquiry button'
);

const activitySelect = document.querySelector(
	'#activity-select'
);

const textAreaLabels = document.querySelectorAll(
	'#camp-activities-inquiry label:not(:nth-child(1))'
);

const form = document.querySelector('form');

form.addEventListener('submit', (e) =>
	e.preventDefault()
);

submitBtn.setAttribute('disabled', true);

activitySelect.addEventListener('change', (e) => {
	if (e.target.value !== '') {
		submitBtn.removeAttribute('disabled');

		// Hover styles
		submitBtn.addEventListener(
			'mouseover',
			function () {
				this.style.transition =
					'background-color 0.5s ease, filter 0.5s ease';
				this.style.filter = 'brightness(1.3)';
				this.style.color = 'aliceblue';
				this.style.backgroundColor =
					'rgb(87, 80, 187)';
			}
		);

		submitBtn.addEventListener(
			'mouseout',
			function () {
				this.style.transition =
					'background-color 0.5s ease, filter 0.5s ease';
				this.style.filter = 'none';
				this.style.color = 'rgb(87, 80, 187)';
				this.style.backgroundColor =
					'transparent';
			}
		);

		textAreas[0].style.display = 'flex';
		textAreas[1].style.display = 'flex';

		textAreas[0].style.opacity = '1';
		textAreas[1].style.opacity = '1';

		textAreaLabels[0].style.display = 'flex';
		textAreaLabels[1].style.display = 'flex';
	}
});

let numWords = [0, 0];

let wordCountDisplay;

textAreas.forEach((textArea, index) => {
	wordCountDisplay = document.querySelectorAll(
		'.word-count-display'
	)[index];

	console.log(
		'wordCountDisplay',
		wordCountDisplay
	);

	// Create the word count display element if it doesn't exist
	if (!wordCountDisplay) {
		console.log('purnota');
		wordCountDisplay =
			document.createElement('div');
		const textareaRect =
			textAreas[index].getBoundingClientRect();
		wordCountDisplay.style.position = 'absolute';
		wordCountDisplay.style.top = `${
			textareaRect.bottom - 2
		}px`;
		wordCountDisplay.style.left = `${
			textareaRect.right - 50
		}px`;
		wordCountDisplay.classList.add(
			'word-count-display'
		);
		wordCountDisplay.textContent = `${numWords[index]} words`;
		textAreas[index].insertAdjacentElement(
			'afterend',
			wordCountDisplay
		);
	}

	textArea.addEventListener('keypress', (e) =>
		countWords(e, index)
	);
});

const countWords = (event, index) => {
	const text = event.target.value.trim();

	numWords[index] = text.split(/\s+/).length;

	console.log(numWords[index]);

	wordCountDisplay = document.querySelectorAll(
		'.word-count-display'
	)[index];

	// Update the word count display
	wordCountDisplay.textContent = `${numWords[index]} words`;
};

const positionWordCountDisplay = () => {
	let textAreas =
		document.querySelectorAll('textarea');

	let wordCountSpans = document.querySelectorAll(
		'.word-count-display'
	);

	wordCountSpans.forEach((span, index) => {
		const textareaRect =
			textAreas[index].getBoundingClientRect();
		span.style.position = 'absolute';
		span.style.top = `${
			textareaRect.bottom - 2
		}px`;
		span.style.left = `${
			textareaRect.right - 50
		}px`;
	});
};

window.addEventListener(
	'load',
	positionWordCountDisplay
);
window.addEventListener(
	'resize',
	positionWordCountDisplay
);
