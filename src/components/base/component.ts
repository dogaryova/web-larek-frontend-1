/**
 * Базовый компонент
 */
export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	/**
	 * Переключение класса элемента
	 */
	toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		if (element) {
			element.classList.toggle(className, force);
		}
	}

	/**
	 * Установка текста элемента
	 */
	protected setText(element: HTMLElement | null, value: unknown): void {
		if (element) {
			element.textContent = String(value ?? '');
		}
	}

	/**
	 * Установка состояния disabled
	 */
	setDisabled(element: HTMLElement | null, state: boolean): void {
		if (element) {
			element.toggleAttribute('disabled', state);
		}
	}

	/**
	 * Скрыть элемент
	 */
	protected setHidden(element: HTMLElement | null): void {
		if (element) {
			element.style.display = 'none';
		}
	}

	/**
	 * Показать элемент
	 */
	protected setVisible(element: HTMLElement | null): void {
		if (element) {
			element.style.removeProperty('display');
		}
	}

	/**
	 * Установка изображения с альтернативным текстом
	 */
	protected setImage(
		element: HTMLImageElement | null,
		src: string,
		alt?: string
	): void {
		if (element) {
			element.src = src;
			if (alt) element.alt = alt;
		}
	}

	/**
	 * Вернуть корневой DOM-элемент после обновления состояния
	 */
	render(data?: Partial<T>): HTMLElement {
		if (data) {
			Object.keys(data).forEach((key) => {
				if (key in this) {
					(this as any)[key] = data[key as keyof T];
				}
			});
		}
		return this.container;
	}
}
