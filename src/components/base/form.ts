import { Component } from './component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from './events';

interface IFormState<T> {
	valid: boolean;
	errors: Partial<Record<keyof T, string>>; // Ошибки по каждому полю
}

export class Form<T> extends Component<IFormState<T>> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	private validators: Partial<
		Record<string, (value: string) => string | null>
	> = {
		email: (value) =>
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Некорректный email',
		address: (value) =>
			value.trim().length >= 5 ? null : 'Адрес должен быть не менее 5 символов',
	};

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', this.handleInputChange.bind(this));
		this.container.addEventListener('submit', this.handleFormSubmit.bind(this));
	}

	private handleInputChange(e: Event): void {
		const target = e.target as HTMLInputElement;
		const field = target.name as keyof T;
		const value = target.value;

		this.onInputChange(field, value);
	}

	private handleFormSubmit(e: Event): void {
		e.preventDefault(); // Остановка стандартного поведения
		this.events.emit(`${this.container.name}:submit`);
	}

	private validateField(field: string, value: string): string | null {
		const validator = this.validators[field];
		return validator ? validator(value) : null;
	}

	protected updateFormState(): void {
		const errors: Partial<Record<keyof T, string>> = {};

		Array.from(this.container.elements).forEach((element) => {
			if (element instanceof HTMLInputElement) {
				const error = this.validateField(element.name, element.value);
				if (error) errors[element.name as keyof T] = error;
			}
		});

		this.valid = Object.keys(errors).length === 0;
		this.errors = errors;
	}

	protected onInputChange(field: keyof T, value: string): void {
		const error = this.validateField(field as string, value);
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
			error,
		});
		this.updateFormState();
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(errors: Partial<Record<keyof T, string>>) {
		const errorMessages = Object.values(errors).filter(Boolean).join('; ');
		this.setText(this._errors, errorMessages);
	}

	render(state: Partial<T> & IFormState<T>): HTMLFormElement {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });

		Object.entries(inputs).forEach(([key, value]) => {
			const input = this.container.querySelector<HTMLInputElement>(
				`[name="${key}"]`
			);
			if (input) input.value = value as string;
		});

		return this.container;
	}
}
