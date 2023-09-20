import { getRandom, addMoney, checkCollision } from './functions';
import { showFinalScreen } from './finalScreen';

interface IUserConfigGame {
	width: number;
	height: number;
	isDownTouchHold: boolean;
	isUpTouchHold: boolean;
}

interface IConfigFlyGame {
	state: number;
	stepVy: number;
	weightVy: number;
	vy: number;
	yOffset: number;

	maxTopBorder: number;

	isCreatedCoins: boolean;
	startY: number;
	coins: Coin[];
	maxCoins: number;
	score: number;
	coeff: number;

	currentPath: number;
	upStepPath: number;

	time: number;
	timeLimit: number;


	timeConst: number;
	timeCurrent: number;
	timeSecLimit: number;
	timer: boolean;
	user: IUserConfigGame;

	isPausedGame: boolean;
}

export const configFlyGame: IConfigFlyGame = {
	state: 1, // 1 - no playing, 2 - play

	stepVy: 1,
	weightVy: 0.02,
	vy: 1.5,
	yOffset: 0,

	maxTopBorder: 0,

	isCreatedCoins: false,

	startY: 100,

	coins: [],
	maxCoins: 50,

	score: 0,
	coeff: 10,

	currentPath: 0,
	upStepPath: 0.01,

	time: 0,
	timeLimit: 4000,

	timeConst: 30, // 30
	timeCurrent: 30,
	timeSecLimit: 0,
	timer: false,

	isPausedGame: false,

	user: {
		width: 66,
		height: 120,
		isDownTouchHold: false,
		isUpTouchHold: false,
	}
}

class Coin {
	public width: number = 85;
	public height: number = 120;
	public x: number = window.innerWidth + this.width + 20;
	public y: number = 0;
	public isActive: boolean = false;
	public isCoin: number = getRandom(1, 9);
	public speed?: number = 1;
	public coin?: HTMLDivElement;

	constructor() {
		this.drawStartSpeed();
		this.draw();
	}

	draw() {
		this.coin = document.createElement('div');
		this.coin.setAttribute('class', 'field__coin');

		this.coin.style.transform = `translate(${this.x}px, 0)`;

		this.drawCurrentAttrName();

		document.querySelector('.field__body')?.append(this.coin);
	}

	drawStartSpeed() {
		if (this.isCoin < 4) this.speed = getRandom(1, 10) / 10;
		else if (this.isCoin >= 4 && this.isCoin < 7) this.speed = getRandom(1, 15) / 10;
		else if (this.isCoin >= 7) this.speed = getRandom(5, 20) / 10;
	}

	drawCurrentAttrName() {
		if (!this.coin) return;
		this.coin.setAttribute('data-element', `${this.isCoin}`);
	}

	generateYOffset() {
		const fieldHeight = field.getBoundingClientRect().height;

		this.y = getRandom(configFlyGame.maxTopBorder, fieldHeight - this.height);
	}

	update() {
		if (this.isActive) {
			if (this.coin && this.x > -this.width && this.speed && !this.coin.classList.contains('_get')) {
				this.x -= this.speed;
				this.coin.style.transform = `translate(${this.x}px, ${this.y}px)`;
			} else if (this.coin && this.x > -this.width && this.coin.classList.contains('_get')) {
				this.coin.style.transform = `translate(${this.x}px, ${this.y}px) scale(1.1)`;
			} else {
				this.reset();
			}
		}
	}

	reset() {
		this.isActive = false;
		this.isCoin = getRandom(1, 9);

		this.x = window.innerWidth + this.width + 20;
		this.generateYOffset();

		if (this.coin) this.coin.style.transform = `translate(${this.x}px, ${this.y}px)`;

		if (this.coin && this.coin.classList.contains('_get')) {
			this.coin.classList.remove('_get');
		}

		this.drawCurrentAttrName();
		// this.drawStartSpeed();
	}

}

const hero = document.querySelector('.field__hero') as HTMLElement;
const field = document.querySelector('.field') as HTMLElement;
const dataPath = document.querySelector('[data-path] span') as HTMLElement;

function drawStartPosHero() {
	const fieldHeight = field.getBoundingClientRect().height;
	const heroHeight = hero.getBoundingClientRect().height;

	configFlyGame.yOffset = (fieldHeight * 0.8) - (heroHeight * 0.5);

	hero.style.transform = `translateY(${configFlyGame.yOffset}px)`;
}

if (hero) drawStartPosHero();
if (field && !configFlyGame.isCreatedCoins) {
	creatCoins();
	configFlyGame.isCreatedCoins = true;
}


export function startFlyGame() {
	configFlyGame.state = 2;
	calculateMaxTopBorder();
	updateYPositionForItems();
	hero.classList.add('_anim');

	animateFly(0);
}

function calculateMaxTopBorder() {
	const fieldHeight = field.getBoundingClientRect().height;
	const fieldWidth = field.getBoundingClientRect().width;
	const ratio = fieldHeight / fieldWidth;

	if (fieldWidth < 600) {
		if (ratio < 1.25) configFlyGame.maxTopBorder = fieldHeight * 0.37;
		else if (ratio >= 1.25 && ratio < 1.35) configFlyGame.maxTopBorder = fieldHeight * 0.43;
		else if (ratio >= 1.35 && ratio < 1.5) configFlyGame.maxTopBorder = fieldHeight * 0.45;
		else if (ratio >= 1.5 && ratio < 1.7) configFlyGame.maxTopBorder = fieldHeight * 0.48;
		else if (ratio >= 1.7 && ratio < 1.9) configFlyGame.maxTopBorder = fieldHeight * 0.5;
	} else {
		configFlyGame.maxTopBorder = fieldHeight * 0.55;
	}






}

function updateYPositionForItems() {
	configFlyGame.coins.forEach(item => {
		item.generateYOffset();
	})
}

export function updateSpeedHero(currentItem: number) {
	if (currentItem < 4) configFlyGame.vy = 1.5;
	else if (currentItem === 4) configFlyGame.vy = 2;
	else if (currentItem === 5 || currentItem === 6) configFlyGame.vy = 2.5;
	else if (currentItem === 7) configFlyGame.vy = 3;
	else if (currentItem === 8) configFlyGame.vy = 4;
}

function moveWhenHold() {
	if (configFlyGame.user.isDownTouchHold) {
		const fieldwHeight = field.getBoundingClientRect().height;
		const heroWidth = hero.getBoundingClientRect().height;
		const maxYOffset = fieldwHeight - heroWidth;
		if (configFlyGame.yOffset < maxYOffset) configFlyGame.yOffset += configFlyGame.vy;
	}
	if (configFlyGame.user.isUpTouchHold && configFlyGame.yOffset > configFlyGame.maxTopBorder) {
		configFlyGame.yOffset -= configFlyGame.vy;
	}
}

function drawCurrentHeroPosition() {
	hero.style.transform = `translateY(${configFlyGame.yOffset}px)`;
}



function creatCoins() {
	for (let i = 0; i < configFlyGame.maxCoins; i++) {
		const newCoin = new Coin();
		configFlyGame.coins.push(newCoin);
	}
}

let lastTime = 0;

export function animateFly(timeStamp: number) {
	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;

	addNewFreeCoin(deltaTime);

	const planeInfo = hero.getBoundingClientRect();
	const coinsDom = document.querySelectorAll('[data-element');

	if (coinsDom.length) {
		coinsDom.forEach(coin => {
			const coinInfo = coin.getBoundingClientRect();
			if (checkCollision(planeInfo, coinInfo) && !coin.classList.contains('_get')) {
				coin.classList.add('_get');
				hero.classList.remove('_anim');
				gameOver();
			}
		})
	}

	configFlyGame.coins.forEach(coin => {
		coin.update();
		if (coin.coin?.classList.contains('_get')) {

			setTimeout(() => {
				coin.reset();
			}, 500);
		}
	})

	// Движение игрока
	moveWhenHold();
	drawCurrentHeroPosition();

	// Обновляем пройденный путь
	updatePath();
	drawCurrentPath();

	// Условие работы анимации
	if (configFlyGame.state === 2) window.requestAnimationFrame(animateFly);

}



function updatePath() {
	configFlyGame.currentPath += configFlyGame.upStepPath;
}

function drawCurrentPath() {
	dataPath.textContent = Math.round(configFlyGame.currentPath).toString();
}


function gameOver() {
	configFlyGame.state = 1;

	hero.setAttribute('class', 'field__hero _gameOver');

	setTimeout(() => {
		addMoney(configFlyGame.currentPath, '.score', 0, 1000);
		showFinalScreen(configFlyGame.currentPath);
	}, 500);

}

function addNewFreeCoin(deltaTime: number) {
	if (configFlyGame.time > configFlyGame.timeLimit) {
		configFlyGame.time = 0;

		for (let i = 0; i < configFlyGame.coins.length; i++) {
			if (configFlyGame.coins[i].isActive) continue;
			else if (!configFlyGame.coins[i].isActive) configFlyGame.coins[i].isActive = true;
			break;
		}

	} else {
		configFlyGame.time += deltaTime;
	}
}

export function stopFlyGame() {
	configFlyGame.coins.forEach(coin => {
		coin.reset();
	})
	resetDataFlyGame();
	drawStartPosHero();
	hero.setAttribute('class', 'field__hero');
}

function resetDataFlyGame() {
	configFlyGame.currentPath = 0;
	configFlyGame.timeCurrent = configFlyGame.timeConst;
}






// export { };