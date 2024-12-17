import { IBasketState } from '../types';
import { Component } from './base/component';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

export class Basket extends Component<IBasketState> {
	private _list: HTMLElement;
	private _price: HTMLElement;
	private _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._price = ensureElement<HTMLElement>('.basket__price', this.container);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.container
		);

		this._initializeButton();
		this.items = [];
	}

	// Инициализация кнопки с обработчиком события
	private _initializeButton(): void {
		this._button.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	// Установка списка элементов корзины
	set items(items: HTMLElement[]) {
		if (!items || items.length === 0) {
			this._renderEmptyBasket();
		} else {
			this._list.replaceChildren(...items);
			this._button.disabled = false;
		}
	}

	// Отображение пустой корзины
	private _renderEmptyBasket(): void {
		this._list.innerHTML = '<p>Корзина пуста</p>';
		this._button.disabled = true;
	}

	// Установка общей стоимости корзины
	set priceTotal(price: number) {
		this.setText(this._price, `${price} синапсов`);
	}

	// Рендеринг данных корзины
	public render(data?: Partial<IBasketState>): HTMLElement {
		if (data?.items) {
			this.items = data.items;
		}

		if (typeof data?.price === 'number') {
			this.priceTotal = data.price;
		}

		return this.container;
	}

	// Получение контейнера
	public getContainer(): HTMLElement {
		return this.container;
	}
}
