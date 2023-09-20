import { configFlyGame, startFlyGame, stopFlyGame, animateFly } from './script';

const buttonDown = document.querySelector('[data-button="move-down"]') as HTMLElement;
const buttonUp = document.querySelector('[data-button="move-up"]') as HTMLElement;

const hero = document.querySelector('.field__hero') as HTMLElement;
const gameBody = document.querySelector('.game__body') as HTMLElement;

// Объявляем слушатель событий "клик"
document.addEventListener('click', (e) => {

	const wrapper = document.querySelector('.wrapper');

	const targetElement = e.target as HTMLElement;

	const money = Number(localStorage.getItem('money'));
	const bet = Number(localStorage.getItem('current-bet'));

	// privacy screen
	if (targetElement.closest('.preloader__button')) {
		location.href = 'main.html';
	}

	// main screen
	if (targetElement.closest('[data-button="privacy"]')) {
		location.href = 'index.html';
	}

	if (targetElement.closest('[data-button="game"]')) {
		wrapper?.classList.add('_game');
		setTimeout(() => {
			startFlyGame();
		}, 250);
	}

	if (targetElement.closest('[data-button="game-home"]')) {
		wrapper?.setAttribute('class', 'wrapper');
		setTimeout(() => {
			configFlyGame.state = 1;
			stopFlyGame();
		}, 500);
	}

	if (targetElement.closest('[data-button="pause"]')) {
		configFlyGame.isPausedGame = !configFlyGame.isPausedGame;


		if (!configFlyGame.isPausedGame) {
			configFlyGame.state = 2;
			animateFly(0);
			hero.classList.add('_anim');
			gameBody.setAttribute('class', 'game__body');
		} else {
			configFlyGame.state = 1;
			hero.classList.remove('_anim');
			gameBody.setAttribute('class', 'game__body _paused');
		}
	}

})

if (buttonDown) {
	buttonDown.addEventListener('touchstart', (e) => {
		configFlyGame.user.isDownTouchHold = true;
	})
	buttonDown.addEventListener('touchend', (e) => {
		configFlyGame.user.isDownTouchHold = false;
	})
}

if (buttonUp) {
	buttonUp.addEventListener('touchstart', (e) => {
		configFlyGame.user.isUpTouchHold = true;
	})
	buttonUp.addEventListener('touchend', (e) => {
		configFlyGame.user.isUpTouchHold = false;
	})

}

