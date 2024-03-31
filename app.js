const textAreas =
	document.querySelectorAll('textarea');

const formSubmitBtn = document.querySelector(
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

formSubmitBtn.setAttribute('disabled', true);


const addFormSubmitBtnStyles = ()=>{
    formSubmitBtn.style.cursor = 'pointer';
    formSubmitBtn.style.border = '2px solid rgb(87, 80, 187)';
    formSubmitBtn.style.color = 'rgb(87, 80, 187)';
    formSubmitBtn.style.backgroundColor = 'transparent';
}

const handleMouseOver = ()=>{
    formSubmitBtn.style.filter = 'brightness(1.3)';
    formSubmitBtn.style.color = 'aliceblue';
    formSubmitBtn.style.backgroundColor = 'rgb(87, 80, 187)'; 
}

const handleMouseOut = ()=>{
    formSubmitBtn.style.filter = 'none';
    formSubmitBtn.style.color = 'rgb(87, 80, 187)';
    formSubmitBtn.style.backgroundColor = 'transparent';
}


activitySelect.addEventListener('change', (e) => {
	if (e.target.value !== '') {
		formSubmitBtn.removeAttribute('disabled');

        addFormSubmitBtnStyles()

		formSubmitBtn.addEventListener(
			'mouseout',handleMouseOut
		);
		formSubmitBtn.addEventListener(
			'mouseover',
			handleMouseOver
		);

        textAreas.forEach(textArea => {
            textArea.style.display = 'flex';
            textArea.style.opacity = '1';
        })

		textAreaLabels[0].style.display = 'flex';
		textAreaLabels[1].style.display = 'flex';

        positionWordCountDisplay()
	}

    else{
        formSubmitBtn.setAttribute('disabled', true);
        formSubmitBtn.removeEventListener('mouseover',handleMouseOver);
        formSubmitBtn.removeEventListener('mouseout',handleMouseOut);
        formSubmitBtn.removeAttribute('style');

        textAreas.forEach(textArea => {
            textArea.style.display = 'none';
            textArea.style.opacity = '0';
        })

		textAreaLabels[0].style.display = 'none';
		textAreaLabels[1].style.display = 'none';

        positionWordCountDisplay()
    }
});

let numWords = [0, 0];

let wordCountDisplay;

textAreas.forEach((textArea, index) => {
	wordCountDisplay = document.querySelectorAll(
		'.word-count-display'
	)[index];

	// Create the word count display element if it doesn't exist
	if (!wordCountDisplay) {
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

	textArea.addEventListener('input', (e) =>{
		countWords(e, index)
    });
});

const countWords = (event, index) => {
	const text = event.target.value.trim();

	numWords[index] = event.target.value==""?0:text.split(/\s+/).length;

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
