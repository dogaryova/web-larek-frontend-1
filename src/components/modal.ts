import { Component } from './base/component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	private readonly _closeButton: HTMLButtonElement;
	private readonly _contentContainer: HTMLElement;

	constructor(container: HTMLElement, private readonly events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._contentContainer = ensureElement<HTMLElement>(
			'.modal__content',
			container
		);

		// Обработчики событий
		this.addEventListeners();
	}

	// Добавление всех событий в одном методе
	private addEventListeners(): void {
		this._closeButton.addEventListener('click', () => this.close());
		this.container.addEventListener('click', () => this.close());
		this._contentContainer.addEventListener('click', (event) =>
			event.stopPropagation()
		);
	}

	// Геттер и сеттер для контента модального окна
	set content(value: HTMLElement | null) {
		this._contentContainer.replaceChildren(value || document.createTextNode(''));
	}

	get content(): HTMLElement {
		return this._contentContainer;
	}

	// Открыть модальное окно
	open(): void {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	// Закрыть модальное окно
	close(): void {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	// Отрендерить и открыть модалку
	render(data: IModalData): HTMLElement {
		this.content = data.content;
		this.open();
		return this.container;
	}
}
