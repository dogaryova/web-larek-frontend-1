export function pascalToKebab(value: string): string {
	return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function isSelector(input: any): input is string {
	return typeof input === 'string' && input.trim().length > 0;
}

export function isEmpty(value: any): boolean {
	return value === null || value === undefined;
}

export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

/**
 * Находит все элементы по селектору
 */
export function ensureAllElements<T extends HTMLElement>(
	selectorElement: SelectorCollection<T>,
	context: HTMLElement = document.body
): T[] {
	if (isSelector(selectorElement)) {
		return Array.from(context.querySelectorAll(selectorElement)) as T[];
	}
	if (selectorElement instanceof NodeList) {
		return Array.from(selectorElement) as T[];
	}
	if (Array.isArray(selectorElement)) {
		return selectorElement;
	}
	throw new Error('Unknown selector element provided.');
}

export type SelectorElement<T> = T | string;

/**
 * Гарантированно находит один элемент по селектору или возвращает ошибку
 */
export function ensureElement<T extends HTMLElement>(
	selectorElement: SelectorElement<T>,
	context?: HTMLElement
): T {
	if (isSelector(selectorElement)) {
		const elements = ensureAllElements<T>(selectorElement, context);
		if (elements.length === 0) {
			throw new Error(
				`Selector '${selectorElement}' did not match any elements.`
			);
		}
		return elements[0];
	}
	if (selectorElement instanceof HTMLElement) {
		return selectorElement as T;
	}
	throw new Error('Invalid selector or element provided.');
}

/**
 * Клонирует элемент из шаблона и возвращает его
 */
export function cloneTemplate<T extends HTMLElement>(
	query: string | HTMLTemplateElement
): T {
	const template = ensureElement<HTMLTemplateElement>(query);
	const clonedElement = template.content.firstElementChild?.cloneNode(
		true
	) as T;
	if (!clonedElement) {
		throw new Error(`Template '${query}' not found or cloning failed.`);
	}
	return clonedElement;
}

/**
 * Генерация BEM-классов
 */
export function bem(
	block: string,
	element?: string,
	modifier?: string
): { name: string; class: string } {
	const name = [block, element && `__${element}`, modifier && `_${modifier}`]
		.filter(Boolean)
		.join('');
	return { name, class: `.${name}` };
}

/**
 * Устанавливает dataset атрибуты для элемента
 */
export function setElementData<T extends Record<string, unknown>>(
	el: HTMLElement,
	data: T
): void {
	Object.keys(data).forEach((key) => {
		el.dataset[key] = String(data[key]);
	});
}

/**
 * Фабричная функция для создания DOM-элементов
 */
export function createElement<T extends HTMLElement>(
	tag: keyof HTMLElementTagNameMap,
	props?: Partial<Record<keyof T, any>>,
	children?: HTMLElement | HTMLElement[]
): T {
	const element = document.createElement(tag) as T;

	if (props) {
		Object.keys(props).forEach((key) => {
			const propKey = key as keyof T; // Явно приводим ключ
			const value = props[propKey];

			if (key === 'dataset' && typeof value === 'object') {
				setElementData(element, value as Record<string, unknown>);
			} else if (value !== undefined) {
				// Безопасно устанавливаем значение для ключа
				(element as any)[propKey] = value;
			}
		});
	}

	if (children) {
		const childNodes = Array.isArray(children) ? children : [children];
		childNodes.forEach((child) => element.append(child));
	}

	return element;
}
