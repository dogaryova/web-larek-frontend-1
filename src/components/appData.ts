import { Model } from './base/modal';
import {
	IProduct,
	IOrderDetails,
	IApplicationState,
	IOrderFormErrors,
	IDeliveryInfo,
	IContactInfo,
} from '../types';
import { EventEmitter } from './base/events';

export interface CatalogChangeEvent {
	products: IProduct[];
}

export class AppState extends Model<IApplicationState> {
	catalog: IProduct[] = [];
	basket: string[] = [];
	order: Omit<IOrderDetails, 'items'> = {
		total: 0,
		phone: '',
		email: '',
		payment: '',
		address: '',
	};

	orderError: IOrderFormErrors = {};
	preview: string | null = null;

	constructor(
		initialState: Partial<IApplicationState>,
		protected events: EventEmitter
	) {
		super(initialState, events);
		this.catalog = initialState.products || [];
		this.preview = initialState.prewiew || null;
		this.basket = [];
	}

	addBasket(productId: string) {
		if (!this.basket.includes(productId)) {
			this.basket.push(productId);
			this.updateBasket();
		}
	}

	removeBasket(productId: string) {
		const index = this.basket.indexOf(productId);
		if (index !== -1) {
			this.basket.splice(index, 1);
			this.updateBasket();
		}
	}

	clearBasket() {
		this.basket = [];
		this.updateBasket();
	}

	updateBasket() {
		this.events.emit('basket:change', {
			products: this.getBasketProducts(),
			total: this.getTotal(),
		});
	}
	getBasketProducts(): IProduct[] {
		return this.catalog.filter((item) => this.basket.includes(item.id));
	}

	getTotal(): number {
		return this.getBasketProducts().reduce(
			(sum, product) => sum + (product.price || 0),
			0
		);
	}
	setCatalog(products: IProduct[]) {
		this.catalog = products;
		this.events.emit('items:changed', { products: this.catalog });
	}

	setOrderField(field: keyof IDeliveryInfo, value: string) {
		this.order[field] = value;
		this.validateOrder();
	}

	setContactField(field: keyof IContactInfo, value: string) {
		this.order[field] = value;
		this.validateContact();
	}

	validateOrder(): boolean {
		const errors: IOrderFormErrors = {};
		if (!this.order.payment) errors.payment = 'Укажите способ оплаты';
		if (!this.order.address) errors.address = 'Укажите адрес';
		this.orderError = errors;
		this.events.emit('orderIOrderFormErrors:change', errors);
		return Object.keys(errors).length === 0;
	}

	validateContact(): boolean {
		const errors: IOrderFormErrors = {};
		if (!this.order.email) errors.email = 'Укажите email';
		if (!this.order.phone) errors.phone = 'Укажите телефон';
		this.orderError = errors;
		this.events.emit('contactsIOrderFormErrors:change', errors);
		return Object.keys(errors).length === 0;
	}

	setPreview(item: IProduct) {
		this.preview = item.id;
		this.events.emit('preview:changed', item);
	}

	orderReset() {
		this.order.payment = '';
		this.order.address = '';
		this.events.emit('order:reset', this.order);
	}

	contactReset() {
		this.order.email = '';
		this.order.phone = '';
		this.events.emit('contact:reset', this.order);
	}
}
