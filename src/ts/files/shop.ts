import { deleteMoney, noMoney, checkRemoveAddClass, getDigFormat } from "./functions";
import { startData } from "./startData";
import { updateSpeedHero } from './script';

const hero = document.querySelector('.field__hero img') as HTMLElement;

const dataPrice1 = document.querySelector('[data-price="1"]');
const dataPrice2 = document.querySelector('[data-price="2"]');
const dataPrice3 = document.querySelector('[data-price="3"]');
const dataPrice4 = document.querySelector('[data-price="4"]');
const dataPrice5 = document.querySelector('[data-price="5"]');
const dataPrice6 = document.querySelector('[data-price="6"]');
const dataPrice7 = document.querySelector('[data-price="7"]');
const dataPrice8 = document.querySelector('[data-price="8"]');

const dataItem1 = document.querySelector('[data-item="1"]') as HTMLElement;
const buttonItem1 = dataItem1?.querySelector('[data-shop-button]');

const dataItem2 = document.querySelector('[data-item="2"]') as HTMLElement;
const buttonItem2 = dataItem2?.querySelector('[data-shop-button]');

const dataItem3 = document.querySelector('[data-item="3"]') as HTMLElement;
const buttonItem3 = dataItem3?.querySelector('[data-shop-button]');

const dataItem4 = document.querySelector('[data-item="4"]') as HTMLElement;
const buttonItem4 = dataItem4?.querySelector('[data-shop-button]');

const dataItem5 = document.querySelector('[data-item="5"]') as HTMLElement;
const buttonItem5 = dataItem5?.querySelector('[data-shop-button]');

const dataItem6 = document.querySelector('[data-item="6"]') as HTMLElement;
const buttonItem6 = dataItem6?.querySelector('[data-shop-button]');

const dataItem7 = document.querySelector('[data-item="7"]') as HTMLElement;
const buttonItem7 = dataItem7?.querySelector('[data-shop-button]');

const dataItem8 = document.querySelector('[data-item="8"]') as HTMLElement;
const buttonItem8 = dataItem8?.querySelector('[data-shop-button]');



if (document.querySelector('.shop')) {
	drawStartItem();
	drawStartCurrentItem();
	drawPrices();

	checkBoughtItems();
	removeSelectedItems();
	writeSelected();
}

export const shopConfig = {
	buster: 0
}

function drawStartItem() {
	if (!localStorage.getItem('item-1')) localStorage.setItem('item-1', '1');
}
function drawStartCurrentItem() {
	if (!localStorage.getItem('current-item')) localStorage.setItem('current-item', '1');
}

function drawPrices() {
	if (dataPrice1) {
		if (startData.prices.price_1 === 0) dataPrice1.textContent = 'free';
		else dataPrice1.textContent = startData.prices.price_1.toString();
	}
	if (dataPrice2) {
		if (startData.prices.price_2 === 0) dataPrice2.textContent = 'free';
		else dataPrice2.textContent = startData.prices.price_2.toString();
	}
	if (dataPrice3) {
		if (startData.prices.price_3 === 0) dataPrice3.textContent = 'free';
		else dataPrice3.textContent = startData.prices.price_3.toString();
	}
	if (dataPrice4) {
		if (startData.prices.price_4 === 0) dataPrice4.textContent = 'free';
		else dataPrice4.textContent = startData.prices.price_4.toString();
	}
	if (dataPrice5) {
		if (startData.prices.price_5 === 0) dataPrice5.textContent = 'free';
		else dataPrice5.textContent = startData.prices.price_5.toString();
	}
	if (dataPrice6) {
		if (startData.prices.price_6 === 0) dataPrice6.textContent = 'free';
		else dataPrice6.textContent = startData.prices.price_6.toString();
	}
	if (dataPrice7) {
		if (startData.prices.price_7 === 0) dataPrice7.textContent = 'free';
		else dataPrice7.textContent = startData.prices.price_7.toString();
	}
	if (dataPrice8) {
		if (startData.prices.price_8 === 0) dataPrice8.textContent = 'free';
		else dataPrice8.textContent = startData.prices.price_8.toString();
	}
}

function checkBoughtItems() {

	if (localStorage.getItem('item-1')) {
		if (dataItem1 && !dataItem1.classList.contains('_selected') && buttonItem1) {
			buttonItem1.textContent = 'Select';
		}
		dataItem1.classList.add('_bought');
	}
	if (localStorage.getItem('item-2')) {
		if (dataItem2 && !dataItem2.classList.contains('_selected') && buttonItem2) {
			buttonItem2.textContent = 'Select';
		}
		dataItem2.classList.add('_bought');
	}
	if (localStorage.getItem('item-3')) {
		if (dataItem3 && !dataItem3.classList.contains('_selected') && buttonItem3) {
			buttonItem3.textContent = 'Select';
		}
		dataItem3.classList.add('_bought');
	}
	if (localStorage.getItem('item-4')) {
		if (dataItem4 && !dataItem4.classList.contains('_selected') && buttonItem4) {
			buttonItem4.textContent = 'Select';
		}
		dataItem4.classList.add('_bought');
	}
	if (localStorage.getItem('item-5')) {
		if (dataItem5 && !dataItem5.classList.contains('_selected') && buttonItem5) {
			buttonItem5.textContent = 'Select';
		}
		dataItem5.classList.add('_bought');
	}
	if (localStorage.getItem('item-6')) {
		if (dataItem6 && !dataItem6.classList.contains('_selected') && buttonItem6) {
			buttonItem6.textContent = 'Select';
		}
		dataItem6.classList.add('_bought');
	}
	if (localStorage.getItem('item-7')) {
		if (dataItem7 && !dataItem7.classList.contains('_selected') && buttonItem7) {
			buttonItem7.textContent = 'Select';
		}
		dataItem7.classList.add('_bought');
	}
	if (localStorage.getItem('item-8')) {
		if (dataItem8 && !dataItem8.classList.contains('_selected') && buttonItem8) {
			buttonItem8.textContent = 'Select';
		}
		dataItem8.classList.add('_bought');
	}

}

function removeSelectedItems() {
	const blocks = document.querySelectorAll('[data-item]');

	blocks.forEach(block => {
		if (block.classList.contains('_selected')) block.classList.remove('_selected');
	})
}

function writeSelected() {
	const currentItem = Number(localStorage.getItem('current-item'));

	document.querySelectorAll('[data-shop-button]').forEach(btn => {
		if (btn.closest('._bought') && !btn.closest('._selected')) {
			btn.textContent = 'Select';
		}
	})

	if (currentItem === 1 && buttonItem1) {
		buttonItem1.textContent = 'Selected';
		dataItem1.classList.add('_selected');
	}
	if (currentItem === 2 && buttonItem2) {
		buttonItem2.textContent = 'Selected';
		dataItem2.classList.add('_selected');
	}
	if (currentItem === 3 && buttonItem3) {
		buttonItem3.textContent = 'Selected';
		dataItem3.classList.add('_selected');
	}
	if (currentItem === 4 && buttonItem4) {
		buttonItem4.textContent = 'Selected';
		dataItem4.classList.add('_selected');
	}
	if (currentItem === 5 && buttonItem5) {
		buttonItem5.textContent = 'Selected';
		dataItem5.classList.add('_selected');
	}
	if (currentItem === 6 && buttonItem6) {
		buttonItem6.textContent = 'Selected';
		dataItem6.classList.add('_selected');
	}
	if (currentItem === 7 && buttonItem7) {
		buttonItem7.textContent = 'Selected';
		dataItem7.classList.add('_selected');
	}
	if (currentItem === 8 && buttonItem8) {
		buttonItem8.textContent = 'Selected';
		dataItem8.classList.add('_selected');
	}

	drawCurrentItem(currentItem);
	updateSpeedHero(currentItem);
}

export function checkBoughtBuster() {
	const buster = localStorage.getItem('buster');

	if (buster == '1' && buttonItem1) {
		buttonItem1.classList.add('_hold');
	} else if (buster == '0' && buttonItem1 && buttonItem1.classList.contains('_hold')) {
		buttonItem1.classList.remove('_hold');
	}
}

function drawCurrentItem(currentItem: number) {
	if (!hero) return;

	hero.setAttribute('src', `img/shop/shop-${currentItem}.png`);

	if (currentItem < 5 || currentItem > 6) hero.style.transform = 'rotateY(180deg)';
	else if (currentItem === 5 || currentItem === 6) hero.style.transform = 'rotateY(0deg)';

}


//========================================================================================================================================================
document.addEventListener('click', (e) => {

	const wrapper = document.querySelector('.wrapper');
	const targetElement = e.target as HTMLElement;
	const money = Number(localStorage.getItem('money'));

	if (targetElement.closest('[data-button="shop-home"]')) {
		wrapper?.classList.remove('_shop');
	}

	if (targetElement.closest('[data-button="shop"]')) {
		wrapper?.classList.add('_shop');
	}

	//===============
	// if (targetElement.closest('[data-shop-button="1"]')) {
	// 	if (money > startData.prices.price_1) {
	// 		deleteMoney(startData.prices.price_1, '.score');
	// 		localStorage.setItem('buster', '1');
	// 		checkBoughtBuster();
	// 	} else noMoney('.score');
	// }

	// if (targetElement.closest('[data-shop-button="2"]')) {
	// 	if (money > startData.prices.price_2) {
	// 		deleteMoney(startData.prices.price_2, '.score');
	// 		localStorage.setItem('thing-4', true);
	// 	} else noMoney('.score');
	// }

	// if (targetElement.closest('[data-shop-button="3"]') && !configGame.busters.isBonus_3_Buying) {
	// 	if (money > startData.prices.price_3) {
	// 		deleteMoney(startData.prices.price_3, '.score');
	// 		configGame.busters.isBonus_3_Buying = true;
	// 		addHoldIfBuyingBonus();
	// 	} else noMoney('.score');
	// }

	// if (targetElement.closest('.buster-item__button')) {
	// 	if (money >= startData.prices.price_5) {
	// 		deleteMoney(startData.prices.price_5, '.score');
	// 		let buster_5 = +localStorage.getItem('buster-5');
	// 		localStorage.setItem('buster-5', buster_5 + 1);
	// 		writeBusters();
	// 	} else noMoney('.score');
	// }

	//========================================================================================================================================================


	if (targetElement.closest('[data-shop-button="1"]') && !dataItem1?.classList.contains('_bought')) {
		if (money >= startData.prices.price_1) {
			if (startData.prices.price_1 > 0) deleteMoney(startData.prices.price_1, '.score');
			localStorage.setItem('item-1', 'true');
			checkBoughtItems();
			writeSelected();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="1"]') && dataItem1?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem1);
		localStorage.setItem('current-item', '1');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="2"]') && !dataItem2?.classList.contains('_bought')) {
		if (money >= startData.prices.price_2) {
			if (startData.prices.price_2 > 0) deleteMoney(startData.prices.price_2, '.score');
			localStorage.setItem('item-2', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="2"]') && dataItem2?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem2);
		localStorage.setItem('current-item', '2');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="3"]') && !dataItem3?.classList.contains('_bought')) {
		if (money >= startData.prices.price_3) {
			if (startData.prices.price_3 > 0) deleteMoney(startData.prices.price_3, '.score');
			localStorage.setItem('item-3', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="3"]') && dataItem3?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem3);
		localStorage.setItem('current-item', '3');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="4"]') && !dataItem4?.classList.contains('_bought')) {
		if (money >= startData.prices.price_4) {
			if (startData.prices.price_4 > 0) deleteMoney(startData.prices.price_4, '.score');
			localStorage.setItem('item-4', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="4"]') && dataItem4?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem4);
		localStorage.setItem('current-item', '4');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="5"]') && !dataItem5?.classList.contains('_bought')) {
		if (money >= startData.prices.price_5) {
			if (startData.prices.price_5 > 0) deleteMoney(startData.prices.price_5, '.score');
			localStorage.setItem('item-5', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="5"]') && dataItem5?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem5);
		localStorage.setItem('current-item', '5');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="6"]') && !dataItem6?.classList.contains('_bought')) {
		if (money >= startData.prices.price_6) {
			if (startData.prices.price_6 > 0) deleteMoney(startData.prices.price_6, '.score');
			localStorage.setItem('item-6', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="6"]') && dataItem6?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem6);
		localStorage.setItem('current-item', '6');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="7"]') && !dataItem7?.classList.contains('_bought')) {
		if (money >= startData.prices.price_7) {
			if (startData.prices.price_7 > 0) deleteMoney(startData.prices.price_7, '.score');
			localStorage.setItem('item-7', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="7"]') && dataItem7?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem7);
		localStorage.setItem('current-item', '7');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="8"]') && !dataItem8?.classList.contains('_bought')) {
		if (money >= startData.prices.price_8) {
			if (startData.prices.price_8 > 0) deleteMoney(startData.prices.price_8, '.score');
			localStorage.setItem('item-8', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="8"]') && dataItem8?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem8);
		localStorage.setItem('current-item', '8');
		writeSelected();
	}


})


