import { Form } from './base/form';
import { IOrderDetails, IContactInfo } from '../types';
import { IEvents } from './base/events';
import { ensureAllElements, ensureElement } from '../utils/utils';

export class Order extends Form<IOrderDetails> {
	private _payment: HTMLButtonElement[];
	private _addressInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._payment = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			this.container
		);
		this._addressInput = ensureElement<HTMLInputElement>(
			'input[name="address"]',
			this.container
		);

		this._payment.forEach((button) => {
			button.addEventListener('click', () => {
				this.payment = button.name;
				this.onInputChange('payment', button.name);
			});
		});
	}

	set address(value: string) {
		this._addressInput.value = value;
	}

	set payment(name: string) {
		this._payment.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

	clearFieldPayment() {
		this._payment.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', false);
		});
	}

	set valid(value: boolean) {
		this._submit.disabled =
			!value ||
			!this._payment.some((button) =>
				button.classList.contains('button_alt-active')
			);
	}

	updateErrors(errors: Partial<IOrderDetails>): void {
		const errorMessages = Object.values(errors).filter(Boolean).join('; ');
		const errorContainer = this.container.querySelector('.form__errors');
		if (errorContainer) {
			errorContainer.textContent = errorMessages;
		}
	}
}

export class Contact extends Form<IContactInfo> {
	private _phoneInput: HTMLInputElement;
	private _emailInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._phoneInput = ensureElement<HTMLInputElement>(
			'input[name="phone"]',
			this.container
		);
		this._emailInput = ensureElement<HTMLInputElement>(
			'input[name="email"]',
			this.container
		);
	}

	set phone(value: string) {
		this._phoneInput.value = value;
	}

	set email(value: string) {
		this._emailInput.value = value;
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	updateErrors(errors: Partial<IContactInfo>): void {
		const errorMessages = Object.values(errors).filter(Boolean).join('; ');
		const errorContainer = this.container.querySelector('.form__errors');
		if (errorContainer) {
			errorContainer.textContent = errorMessages;
		}
	}
}
