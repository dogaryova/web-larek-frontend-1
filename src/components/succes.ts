import { ISuccessResponse } from '../types';
import { Component } from './base/component';
import { ensureElement } from './../utils/utils';

interface ISuccessResponseActions {
	onClick: () => void;
}

export class Success extends Component<ISuccessResponse> {
	private totalElement: HTMLElement;
	private closeButtonElement: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		private readonly callbacks?: ISuccessResponseActions
	) {
		super(container);

		// Использование ensureElement с предопределёнными селекторами
		this.totalElement = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);
		this.closeButtonElement = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);

		// Деструктуризация для коллбэков
		const { onClick } = this.callbacks || {};
		if (onClick) {
			this.closeButtonElement.addEventListener('click', onClick);
		}
	}

	set total(value: number) {
		this.totalElement.textContent = `Списано ${value} синапсов`;
	}

	render(data: ISuccessResponse): HTMLElement {
		this.total = data.total; // Использование сеттера
		return this.container;
	}
}
