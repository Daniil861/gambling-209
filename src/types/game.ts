export interface IStore {
	countBuying: number;
	health: number;
	speed: number;
	capacity: number;
}

export interface IPrices {
	price_1: number;
	price_2: number;
	price_3: number;
	price_4: number;
	price_5: number;
	price_6: number;
	price_7: number;
	price_8: number;
}

export interface IStartData {
	bank: number;

	countBet: number;
	maxBet: number;

	nameItemScore: string;
	nameItemBet: string;

	store: IStore;

	prices: IPrices

}