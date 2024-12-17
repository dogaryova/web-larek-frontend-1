import { Component } from './base/component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		// Инициализация DOM-элементов
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		// Добавление обработчика событий
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	// Обновление счётчика корзины
	set counter(value: number) {
		this.setText(this._counter, value.toString());
	}

	// Обновление каталога
	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	// Блокировка/разблокировка страницы
	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}

	// Метод для переключения классов (публичный, чтобы соответствовать базовому классу)
	public toggleClass(element: HTMLElement, className: string, condition: boolean) {
		element.classList.toggle(className, condition);
	}
}
