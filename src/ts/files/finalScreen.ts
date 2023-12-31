import { configFlyGame, stopFlyGame } from './script';

const finalSc = document.querySelector('[data-final="score"].final');
const finalScore = document.querySelector('[data-final="score"] .final__score span');


export function showFinalScreen(score: number = 0, status: string = 'lose') {

	score = Math.floor(score);
	// if (status === 'win') {
	// 	if (finalTitle) finalTitle.textContent = 'You Win!';
	// 	if (finalScore) finalScore.textContent = `${score}`;
	// 	if (finalSc) finalSc.classList.add('_win');
	// } else if (status === 'lose') {
	// 	if (finalTitle) finalTitle.textContent = 'You lose';
	// 	if (finalSc) finalSc.classList.add('_lose');
	// 	if (finalScore) finalScore.textContent = `-${score}`;
	// }
	if (finalScore) finalScore.textContent = `${score}`;
	setTimeout(() => {
		finalSc?.classList.add('_visible');
	}, 50);
}

document.addEventListener('click', (e) => {

	const targetElement = e.target as Element;
	const wrapper = document.querySelector('.wrapper');

	if (targetElement?.closest('[data-button="final-next"]')) {
		setTimeout(() => {
			finalSc?.setAttribute('class', 'wrapper__final final');
		}, 250);
		// запускаем функцию перезагрузки игры
	}

	if (targetElement.closest('[data-button="final-home"]')) {
		finalSc?.classList.remove('_visible');
		wrapper?.classList.remove('_game');
		setTimeout(() => {
			configFlyGame.state = 1;
			stopFlyGame();
		}, 500);

	}
	// if (targetElement.closest('[data-button="final-repeat"]')) {


	// 	setTimeout(() => {
	// 		finalSc?.classList.remove('_visible');
	// 	}, 550);
	// }
	// if (targetElement.closest('[data-button="final-bet"]')) {
	// 	finalBt?.classList.remove('_visible');
	// }
})





