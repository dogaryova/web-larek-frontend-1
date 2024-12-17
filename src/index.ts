import './scss/styles.scss';
import { ensureElement, cloneTemplate } from './utils/utils';
import { IProduct, IDeliveryInfo, IContactInfo } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/web';
import { CatalogChangeEvent, AppState } from './components/appData';
import { EventEmitter } from './components/base/events';
import { Card } from './components/card';
import { Page } from './components/page';
import { Order, Contact } from './components/order';
import { Modal } from './components/modal';
import { Basket } from './components/basket';
import { Success } from './components/succes';

class App {
	private api: AppApi;
	private events: EventEmitter;
	private page: Page;
	private modal: Modal;
	private appData: AppState;
	private basket: Basket;
	private order: Order;
	private contacts: Contact;
	private successModal: Success;

	constructor() {
		// Инициализация зависимостей
		this.api = new AppApi(CDN_URL, API_URL);
		this.events = new EventEmitter();
		this.page = new Page(document.body, this.events);

		this.modal = new Modal(
			ensureElement<HTMLElement>('#modal-container'),
			this.events
		);
		this.appData = new AppState({}, this.events);

		// Составляющие интерфейса
		this.basket = new Basket(
			cloneTemplate(ensureElement<HTMLTemplateElement>('#basket-template')),
			this.events
		);
		this.order = new Order(
			cloneTemplate(ensureElement<HTMLTemplateElement>('#order-form-template')),
			this.events
		);
		this.contacts = new Contact(
			cloneTemplate(
				ensureElement<HTMLTemplateElement>('#contact-form-template')
			),
			this.events
		);
		this.successModal = this.createSuccessModal();

		this.initialize();
	}

	// Отдельный метод для создания SuccessModal
	private createSuccessModal() {
		return new Success(
			cloneTemplate(ensureElement<HTMLTemplateElement>('#success-template')),
			{
				onClick: () => {
					this.modal.close();
					this.appData.orderReset();
					this.appData.contactReset();
					this.events.emit('basket:change');
				},
			}
		);
	}

	// Главная инициализация
	private initialize(): void {
		this.registerEvents();
		this.loadData();
	}

	// Регистрация событий
	private registerEvents(): void {
		this.events.onAll(({ eventName, data }) => console.log(eventName, data));

		this.events.on<CatalogChangeEvent>(
			'items:changed',
			this.updateCatalog.bind(this)
		);
		this.events.on('basket:change', this.updateBasketView.bind(this));

		this.events.on('card:select', (item: IProduct) => this.openCard(item));
		this.events.on('card:toBasket', (item: IProduct) =>
			this.toggleBasketItem(item)
		);

		this.events.on('basket:open', () => this.openBasket());
		this.events.on('order:open', () => this.openOrder());
		this.events.on('order:submit', () => this.openContacts());
		this.events.on('contacts:submit', () => this.submitOrder());

		this.events.on(/^order\..*:change/, this.updateOrderField.bind(this));
		this.events.on(/^contacts\..*:change/, this.updateContactField.bind(this));
	}

	// Загрузка данных о товарах
	private loadData(): void {
		this.api
			.getProductList()
			.then((products) => {
				this.appData.setCatalog(products);
				this.updateCatalog();
			})
			.catch((error) => console.error('Error loading product list:', error));
	}

	private updateCatalog(): void {
		this.page.catalog = this.appData.catalog.map((item) =>
			this.createCatalogCard(item)
		);
	}

	private createCatalogCard(item: IProduct): HTMLElement {
		const card = new Card(
			cloneTemplate(
				ensureElement<HTMLTemplateElement>('#card-catalog-template')
			),
			item,
			{
				onClick: () => this.events.emit('card:select', item),
				onAddToBasket: () => this.toggleBasketItem(item),
				onRemoveFromBasket: () => this.toggleBasketItem(item),
			}
		);
		card.updateButtonState(this.appData.basket.includes(item.id));
		return card.getContainer();
	}
	private updateCard(itemId: string): void {
		const cardElement = document.querySelector(`[data-id="${itemId}"]`);
		if (!cardElement) return;

		const button =
			cardElement.querySelector<HTMLButtonElement>('.card__button');
		const isInBasket = this.appData.basket.includes(itemId);

		if (button) {
			button.textContent = isInBasket
				? 'Удалить из корзины'
				: 'Добавить в корзину';
		}
	}

	// Корзина и её обновления
	private updateBasketView(): void {
		this.updateBasket();
		this.updateBasketCounter();
		this.appData.basket.forEach((id) => this.updateCard(id));
	}

	private updateBasket(): void {
		const basketItems = this.appData
			.getBasketProducts()
			.map((item) => this.createBasketItem(item));
		this.basket.render({ items: basketItems, price: this.appData.getTotal() });
	}

	private updateBasketCounter(): void {
		this.page.counter = this.appData.basket.length;
	}

	private createBasketItem(product: IProduct): HTMLElement {
		return new Card(
			cloneTemplate(
				ensureElement<HTMLTemplateElement>('#card-basket-template')
			),
			product,
			{
				onRemoveFromBasket: () => this.toggleBasketItem(product),
			}
		).getContainer();
	}

	private toggleBasketItem(item: IProduct): void {
		this.appData.basket.includes(item.id)
			? this.appData.removeBasket(item.id)
			: this.appData.addBasket(item.id);

		this.events.emit('basket:change');
	}

	// Модальные окна
	private openCard(item: IProduct): void {
		const card = new Card(
			cloneTemplate(
				ensureElement<HTMLTemplateElement>('#card-preview-template')
			),
			item,
			{
				onAddToBasket: () => this.toggleBasketItem(item),
				onRemoveFromBasket: () => this.toggleBasketItem(item),
			}
		);
		this.modal.render({ content: card.getContainer() });
		this.modal.open();
	}

	private openBasket(): void {
		this.modal.render({ content: this.basket.getContainer() });
		this.modal.open();
	}

	private openOrder(): void {
		this.modal.render({
			content: this.order.render({
				payment: '',
				address: '',
				valid: false,
				errors: {},
			}),
		});
	}

	private openContacts(): void {
		this.modal.render({
			content: this.contacts.render({
				phone: '',
				email: '',
				valid: false,
				errors: {},
			}),
		});
	}

	// Обновление полей формы
	private updateOrderField({
		field,
		value,
	}: {
		field: keyof IDeliveryInfo;
		value: string;
	}): void {
		this.appData.setOrderField(field, value);
	}

	private updateContactField({
		field,
		value,
	}: {
		field: keyof IContactInfo;
		value: string;
	}): void {
		this.appData.setContactField(field, value);
	}

	// Отправка заказа
	private submitOrder(): void {
		const { payment } = this.appData.order;

		if (!payment) {
			this.order.updateErrors({
				payment: 'Пожалуйста, выберите способ оплаты',
			});
			return;
		}

		this.api
			.order({
				...this.appData.order,
				total: this.appData.getTotal(),
				items: this.appData.basket,
			})
			.then((res) => {
				this.modal.render({
					content: this.successModal.render({ total: res.total }),
				});
				this.appData.clearBasket();
				this.events.emit('basket:change');
			})
			.catch(console.error);
	}
}

new App();
