import { IProduct } from '../types';
import { Component } from './base/component';
import { ensureElement } from '../utils/utils';
import { settings } from '../utils/constants';

interface ICardEventHandlers {
	onClick?: (event: MouseEvent) => void;
	onAddToBasket?: (item: IProduct) => void;
	onRemoveFromBasket?: (item: IProduct) => void;
}

interface ICard extends IProduct {
	identifierCard?: string;
}

export class Card extends Component<ICard> {
	private _identifierCard?: HTMLElement;
	private _description?: HTMLElement;
	private _image?: HTMLImageElement;
	private _title: HTMLElement;
	private _category?: HTMLElement;
	private _price: HTMLElement;
	private _button?: HTMLButtonElement;

	private _item: IProduct;
	private _isInBasket: boolean;

	constructor(
		container: HTMLElement,
		item: IProduct,
		actions: ICardEventHandlers
	) {
		super(container);

		this._item = item;
		this._isInBasket = false;

		this._identifierCard = container.querySelector('.basket__item-index');
		this._description = container.querySelector('.card__text');
		this._image = container.querySelector('.card__image');
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._category = container.querySelector('.card__category');
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);

		if (actions.onClick) {
			this.container.addEventListener('click', actions.onClick);
		}

		if (this._button) {
			this._button.addEventListener('click', (event) => {
				event.stopPropagation();
				this.toggleBasket(actions);
			});
		}

		this.render(item);
	}

	private toggleBasket(actions: ICardEventHandlers) {
		if (this._isInBasket) {
			actions.onRemoveFromBasket?.(this._item);
		} else {
			actions.onAddToBasket?.(this._item);
		}
		this.updateButtonState(!this._isInBasket);
	}

	// Изменённый метод с новым названием
	public updateButtonState(isInBasket: boolean): void {
		this._isInBasket = isInBasket;
		if (this._button) {
			this._button.textContent = isInBasket
				? 'Удалить из корзины'
				: 'Добавить в корзину';
		}
	}

	render(item: IProduct): HTMLElement {
		this.id = item.id;
		this.title = item.title;
		this.image = item.image;
		this.description = item.description;
		this.category = item.category;
		this.price = item.price || 0;

		return this.container;
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		if (this._category) {
			this._category.classList.add(settings[value] || '');
		}
	}

	set price(value: number) {
		this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
		this.disableButton(value);
	}

	disableButton(value: number | null) {
		if (!value && this._button) {
			this._button.disabled = true;
		}
	}

	getContainer(): HTMLElement {
		if (!this.container) {
			throw new Error('Container for Card component is undefined.');
		}
		return this.container;
	}
}
