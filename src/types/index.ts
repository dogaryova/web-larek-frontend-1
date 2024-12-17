export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export type IApiResponseList<Type> = {
	total: number;
	items: Type[];
};

export interface IBasketState {
	items: HTMLElement[];
	price: number;
	selected: string[];
}

export interface IApplicationState {
	products: IProduct[];
	basket: IProduct[];
	order: IOrderDetails;
	orderResponse: IOderResult | null;
	prewiew: string | null;
}

export interface IDeliveryInfo {
	address: string;
	payment: string;
}

export interface IContactInfo {
	phone: string;
	email: string;
}

export interface IOrderDetails extends IDeliveryInfo, IContactInfo {
	total: number;
	items: string[];
}

export interface IOderResult {
	id: string;
	total: number;
}

export type IOrderFormErrors = Partial<Record<keyof IOrderDetails, string>>;

export interface ISuccessResponse {
	total: number;
}

export interface ICardEventHandlers {
	onClick?: (event: MouseEvent) => void;
	onAddToBasket?: (item: IProduct) => void;
	onRemoveFromBasket?: (item: IProduct) => void;
}
