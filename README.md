# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Данные и типы данных, используемые в приложении

Приложение **"Web-Larek"** использует интерфейсы и типы данных для описания структуры данных, состояния приложения и взаимодействий с API.

## `IProduct`

Описывает структуру товара в каталоге.

- **Поля:**
  - `id: string` — Уникальный идентификатор товара.
  - `description: string` — Описание товара.
  - `image: string` — Ссылка на изображение.
  - `title: string` — Название товара.
  - `category: string` — Категория товара.
  - `price: number | null` — Цена товара.

---

## `IApiResponseList<Type>`

Тип для описания ответа API, возвращающего список элементов.

- **Поля:**
  - `total: number` — Общее количество элементов.
  - `items: Type[]` — Массив элементов.

---

## `IBasketState`

Описывает состояние корзины покупок.

- **Поля:**
  - `items: HTMLElement[]` — Список DOM-элементов товаров в корзине.
  - `price: number` — Общая стоимость товаров в корзине.
  - `selected: string[]` — Идентификаторы выбранных товаров.

---

## `IApplicationState`

Глобальное состояние приложения.

- **Поля:**
  - `products: IProduct[]` — Список доступных товаров.
  - `basket: IProduct[]` — Товары, добавленные в корзину.
  - `order: IOrderDetails` — Детали текущего заказа.
  - `orderResponse: IOderResult | null` — Ответ сервера на заказ.
  - `prewiew: string | null` — Предварительный просмотр данных.

---

## `IDeliveryInfo`

Описывает информацию о доставке.

- **Поля:**
  - `address: string` — Адрес доставки.
  - `payment: string` — Способ оплаты.

---

## `IContactInfo`

Описывает контактную информацию пользователя.

- **Поля:**
  - `phone: string` — Номер телефона.
  - `email: string` — Электронная почта.

---

## `IOrderDetails`

Расширяет `IDeliveryInfo` и `IContactInfo`. Описывает детали заказа.

- **Поля:**
  - `address: string` — Адрес доставки.
  - `payment: string` — Способ оплаты.
  - `phone: string` — Номер телефона.
  - `email: string` — Электронная почта.
  - `total: number` — Итоговая сумма заказа.
  - `items: string[]` — Список идентификаторов товаров.

---

## `IOderResult`

Описывает результат обработки заказа.

- **Поля:**
  - `id: string` — Уникальный идентификатор заказа.
  - `total: number` — Итоговая сумма заказа.

---

## `IOrderFormErrors`

Тип для описания ошибок формы заказа.

- **Тип:**
  - `Partial<Record<keyof IOrderDetails, string>>` — Карта полей формы и соответствующих ошибок.

---

## `ISuccessResponse`

Тип для успешного ответа сервера.

- **Поля:**
  - `total: number` — Итоговая сумма.

---

## `ICardEventHandlers`

Описывает обработчики событий для карточек товаров.

- **Поля:**
  - `onClick?: (event: MouseEvent) => void` — Обработчик клика.
  - `onAddToBasket?: (item: IProduct) => void` — Обработчик добавления товара в корзину.
  - `onRemoveFromBasket?: (item: IProduct) => void` — Обработчик удаления товара из корзины.

---

# Дополнительные интерфейсы и типы данных

## `IUserProfile`

Описывает профиль пользователя.

- **Поля:**
  - `id: string` — Уникальный идентификатор пользователя.
  - `name: string` — Имя пользователя.
  - `email: string` — Электронная почта.
  - `phone?: string` — Номер телефона (опционально).

---

## `IAuthResponse`

Определяет структуру данных, возвращаемую сервером при успешной авторизации.

- **Поля:**
  - `token: string` — JWT-токен для авторизации.
  - `user: IUserProfile` — Информация о пользователе.

---

## `ILoginData`

Описывает данные для входа пользователя.

- **Поля:**
  - `email: string` — Электронная почта.
  - `password: string` — Пароль.

---

## `ISignupData`

Описывает данные для регистрации нового пользователя.

- **Поля:**
  - `name: string` — Имя пользователя.
  - `email: string` — Электронная почта.
  - `password: string` — Пароль.

---

## `IApiError`

Тип для описания ошибки, возвращаемой API.

- **Поля:**
  - `code: number` — Код ошибки.
  - `message: string` — Сообщение об ошибке.

---

## `IPageConfig`

Определяет настройки для страницы.

- **Поля:**
  - `title: string` — Заголовок страницы.
  - `description?: string` — Описание страницы (опционально).
  - `metaTags?: Record<string, string>` — Метатеги страницы (опционально).

---

## `IProductFilters`

Описывает фильтры для каталога товаров.

- **Поля:**
  - `category?: string` — Фильтр по категории.
  - `minPrice?: number` — Минимальная цена.
  - `maxPrice?: number` — Максимальная цена.
  - `search?: string` — Поисковый запрос.

---

## `ISortOptions`

Описывает параметры сортировки для каталога товаров.

- **Поля:**
  - `field: 'price' | 'title' | 'category'` — Поле для сортировки.
  - `order: 'asc' | 'desc'` — Направление сортировки.

---

## `IUserAction`

Описывает действия пользователя в приложении.

- **Поля:**
  - `type: string` — Тип действия.
  - `payload?: any` — Дополнительные данные, связанные с действием.

---

"Web-Larek" использует интерфейсы для определения структуры данных и взаимодействий в приложении.

### `ITotalElementsList<T>`

Представляет общее количество элементов и их список.

- **Поля:**
  - `total: number` — Общее количество элементов.
  - `items: T[]` — Массив элементов.

### `ICartElementData`

Описывает отдельный товар в корзине.

- **Поля:**
  - `title: string` — Название товара.
  - `price: number` — Цена товара.

### `ProductApiService`

Определяет методы API для работы с товарами и заказами.

- **Методы:**
  - `getProductItem(id: string): Promise<IProduct>` — Получает информацию о товаре по ID.
  - `getProductList(): Promise<IProduct[]>` — Получает список товаров.
  - `orderProduct(order: OrderForm): Promise<IOrderResult>` — Отправляет данные заказа на сервер.

### `IModal`

Управляет отображением модальных окон.

- **Поля:**
  - `content: HTMLElement` — Содержимое модального окна.

### `IProduct`

Описывает структуру данных товара в каталоге.

- **Поля:**
  - `id: string` — Уникальный идентификатор.
  - `description: string` — Описание товара.
  - `image?: string` — URL изображения.
  - `index?: number` — Порядковый номер (опционально).
  - `title: string` — Название.
  - `category: string` — Категория.
  - `price: number | null` — Цена.
  - `button?: string` - кнопка добавить/Удалить.

### `IPageContentConfig`

Интерфейс страницы, описывающий элементы управления и содержимое.

- **Поля:**
  - `counter: number` — Счетчик товаров в корзине.
  - `catalog: HTMLElement[]` — Массив элементов каталога.
  - `locked: boolean` — Статус блокировки страницы.

### `ICartItemData`

Описывает структуру данных корзины покупок.

- **Поля:**
  - `items: HTMLElement[]` — Список товаров в корзине.
  - `total: number` — Общая стоимость товаров.

### `IOperationResultSummary`

Описывает данные для отображения успешного завершения операции.

- **Поля:**
  - `total: number` — Итоговая сумма.

### `IOperationHandlers`

Определяет действия в случае успешного выполнения операции.

- **Поля:**
  - `onClick: () => void` — Функция, вызываемая при клике на элемент.

### `ICustomerDetails`

Определяет структуру формы для контактных данных.

- **Поля:**
  - `phone: string` — Номер телефона.
  - `email: string` — Электронная почта.

### `IFormOrderStructure`

Описывает форму заказа.

- **Поля:**
  - `payment: PaymentOption` - Выбор способа оплаты.
  - `email: string` - Электронная почта.
  - `phone: string` - Контактный телефон.
  - `address: string` - Адрес доставки.
  - `total: number` - Стоимость выбранных товаров.
  - `items: string[]` - Выбранные товары.

### `IOrderTransactionResult`

Описывает результат обработки заказа.

- **Поля:**
  - `id: string` — Идентификатор заказа.
  - `total: number` — Итоговая сумма заказа.

# Архитектура приложения

```

Проект реализован на основе архитектурного паттерна **Model-View-Presenter (MVP)**, который обеспечивает четкое разделение логики, интерфейса и взаимодействий между ними, что делает приложение устойчивым и легко поддерживаемым.

- **Model** — отвечает за бизнес-логику, обработку данных и взаимодействие с серверным API.
- **View** — занимается визуализацией данных и управлением пользовательским интерфейсом.
- **Presenter** — выступает связующим звеном между Model и View, обрабатывая действия пользователя и синхронизируя данные между моделью и представлением.

```

# Базовый код

## `class Api`

Класс `Api` реализует функционал для выполнения HTTP-запросов к серверу.

### Конструктор

- **Аргументы:**
  - `baseUrl: string` — Базовый URL для API-запросов.
  - `options: RequestInit` — Настройки запросов по умолчанию.

### Методы

- **`get(uri: string): Promise<object>`**  
  Выполняет GET-запрос к указанному URI.

- **`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>`**  
  Выполняет POST-запрос с передачей данных.

- **`handleResponse(response: Response): Promise<object>`**  
  Обрабатывает ответ от сервера, возвращает данные или ошибку.

---

## `class EventEmitter`

Класс `EventEmitter` предоставляет механизм подписки и обработки событий.

### Конструктор

- **Инициализация:** Создаёт структуру хранения событий.

### Методы

- **`on(event: EventName, callback: (data: T) => void): void`**  
  Подписывает обработчик на указанное событие.

- **`emit(event: string, data?: T): void`**  
  Триггерит событие с переданными данными.

- **`off(eventName: EventName, callback: Subscriber): void`**  
  Удаляет обработчик события.

- **`onAll(callback: (event: EmitterEvent) => void): void`**  
  Подписывает обработчик на все события.

---

## `abstract class Component`

Базовый абстрактный класс для всех компонентов интерфейса.

### Конструктор

- **Аргументы:**
  - `container: HTMLElement` — Корневой DOM-элемент компонента.

### Методы

- **`toggleClass(element: HTMLElement, className: string, force?: boolean): void`**  
  Переключает класс элемента.

- **`setText(element: HTMLElement, value: unknown): void`**  
  Устанавливает текстовое содержимое элемента.

- **`render(data?: Partial<T>): HTMLElement`**  
  Обновляет состояние компонента и возвращает DOM-элемент.

---

## `abstract class Model`

Абстрактный класс для управления состоянием данных.

### Конструктор

- **Аргументы:**
  - `data: Partial<T>` — Исходное состояние данных.
  - `events: IEvents` — Экземпляр событийного менеджера.

### Методы

- **`emitChanges(event: string, payload?: Partial<T>): void`**  
  Генерирует событие об изменении состояния.

- **`getState(): Partial<T>`**  
  Возвращает текущее состояние модели.

- **`setState(updates: Partial<T>, event?: string): void`**  
  Обновляет состояние и инициирует событие.

---

## Пример использования

### `App`

Класс `App` управляет основным жизненным циклом приложения, включая загрузку данных, работу с событиями и взаимодействие компонентов.

- **Поля:**

  - `api: AppApi` — Класс для работы с API.
  - `events: EventEmitter` — Менеджер событий.
  - `page: Page` — Управление отображением страниц.
  - `modal: Modal` — Модальные окна.
  - `appData: AppState` — Глобальное состояние приложения.

- **Методы:**
  - `initialize(): void` — Основная инициализация приложения.
  - `registerEvents(): void` — Регистрация обработчиков событий.
  - `loadData(): void` — Загрузка данных из API.
  - `updateCatalog(): void` — Обновление каталога товаров.
  - `updateBasketView(): void` — Обновление корзины.

---

## Полный список компонентов

### `Modal`

Компонент для работы с модальными окнами.

### `Card`

Компонент карточки товара с обработчиками событий.

### `Basket`

Компонент корзины покупок.

### `Order`

Компонент формы заказа.

### `Contact`

Компонент формы контактной информации.

---

## События в приложении

- `items:changed` — Изменение каталога товаров.
- `basket:change` — Обновление корзины.
- `order:submit` — Отправка заказа.
- `contacts:submit` — Подтверждение контактной информации.
- `modal:open` — Открытие модального окна.
- `modal:close` — Закрытие модального окна.

## `class Api`

Класс `Api` предоставляет основные возможности для выполнения HTTP-запросов к серверу.

- **Конструктор:**

  - `baseUrl: string` — Базовый URL для API запросов.
  - `options: RequestInit` — Настройки запросов по умолчанию.

- **Методы:**
  - `get(uri: string): Promise<object>` — Выполняет GET-запрос.
  - `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` — Выполняет POST-запрос.
  - `handleResponse(response: Response): Promise<object>` — Обрабатывает и возвращает ответ от сервера.

## `class EventEmitter`

Класс `EventEmitter` реализует механизм подписки и уведомления об изменениях, что позволяет управлять событиями в приложении.

- **Конструктор:**

  - Инициализирует структуру хранения событий.

- **Методы:**
  - `on(event: EventName, callback: (data: T) => void)` — Подписывает на событие.
  - `emit(event: string, data?: T)` — Инициирует событие.
  - `off(eventName: EventName, callback: Subscriber)` — Отписывает от события.
  - `onAll(callback: (event: EmitterEvent) => void)` — Подписывает на все события.

## `abstract class Component`

Базовый абстрактный класс `Component` предоставляет общую функциональность для всех компонентов пользовательского интерфейса.

- **Конструктор:**

  - Принимает DOM-элемент, представляющий контейнер компонента.

- **Методы:**
  Методы для работы с DOM, такие как `setText`, `setVisible`, `setDisabled`, и `render`.

## `abstract class Model`

Абстрактный класс `Model` служит основой для создания моделей данных, управляющих состоянием и взаимодействиями.

- **Конструктор:**

  - `constructor(data: Partial<T>, protected events: IEvents)` - Инициализирует модель данными и событийному менеджеру.

- **Методы:**
  - `emitChanges(event: string, payload?: object): void` — Генерирует событие об изменении модели.
  - `getData(): T` — возвращает текущие данные модели.

# Model-View-Presenter (MVP)

## Модель (Model)

### `class ProductModel`

Класс `ProductModel` описывает модель товара и предоставляет методы для работы с его данными.

- **Поля:**
  - `id: string` — Уникальный идентификатор товара.
  - `description: string` — Описание товара.
  - `image: string` — Изображение товара.
  - `title: string` — Название товара.
  - `category: string` — Категория товара.
  - `price: number | null` — Цена товара.

---

### `class AppStateModel`

Класс `AppStateModel` управляет глобальным состоянием приложения, включая каталог, корзину и заказы.

- **Поля:**

  - `catalog: ProductModel[]` — Список товаров в каталоге.
  - `basket: string[]` — Идентификаторы товаров в корзине.
  - `order: IOrderDetails` — Информация о текущем заказе.
  - `formErrors: IOrderFormErrors` — Ошибки валидации формы.
  - `preview: string | null` — Идентификатор товара для предварительного просмотра.

- **Методы:**
  - `addToBasket(productId: string): void` — Добавляет товар в корзину.
  - `removeFromBasket(productId: string): void` — Удаляет товар из корзины.
  - `clearBasket(): void` — Очищает корзину.
  - `setCatalog(products: ProductModel[]): void` — Устанавливает список товаров.
  - `getBasketProducts(): ProductModel[]` — Возвращает товары из корзины.
  - `validateOrder(): boolean` — Проверяет валидность заказа.
  - `validateContactForm(): boolean` — Проверяет валидность формы контактов.
  - `setOrderField(field: keyof IOrderDetails, value: string): void` — Обновляет поле заказа.

---

## Представление (View)

### `class PageComponent`

Компонент `PageComponent` управляет отображением основных элементов интерфейса.

- **Поля:**

  - `counterElement: HTMLElement` — Счётчик товаров в корзине.
  - `catalogElement: HTMLElement` — Элемент для отображения каталога.
  - `lockWrapper: HTMLElement` — Элемент для блокировки интерфейса.

- **Методы:**
  - `setCounter(value: number): void` — Обновляет счётчик товаров.
  - `updateCatalog(items: HTMLElement[]): void` — Обновляет список товаров в каталоге.
  - `toggleLock(state: boolean): void` — Блокирует или разблокирует интерфейс.

---

### `class ProductCardComponent`

Компонент `ProductCardComponent` представляет карточку товара.

- **Поля:**

  - `titleElement: HTMLElement` — Название товара.
  - `imageElement: HTMLImageElement` — Изображение товара.
  - `priceElement: HTMLElement` — Цена товара.
  - `actionButton: HTMLButtonElement` — Кнопка для взаимодействия с товаром.

- **Методы:**
  - `setTitle(value: string): void` — Устанавливает название товара.
  - `setImage(src: string): void` — Устанавливает изображение товара.
  - `setPrice(value: number): void` — Устанавливает цену товара.
  - `toggleButtonState(isInBasket: boolean): void` — Обновляет состояние кнопки.

---

### `class BasketComponent`

Компонент `BasketComponent` управляет корзиной покупок.

- **Поля:**

  - `itemList: HTMLElement` — Список товаров в корзине.
  - `totalPriceElement: HTMLElement` — Общая стоимость товаров.
  - `orderButton: HTMLButtonElement` — Кнопка оформления заказа.

- **Методы:**
  - `updateItems(items: HTMLElement[]): void` — Обновляет список товаров.
  - `updateTotal(price: number): void` — Обновляет общую стоимость товаров.

---

### `class ModalComponent`

Компонент `ModalComponent` отвечает за управление модальными окнами.

- **Поля:**

  - `closeButton: HTMLButtonElement` — Кнопка закрытия окна.
  - `contentElement: HTMLElement` — Контент модального окна.

- **Методы:**
  - `open(): void` — Открывает модальное окно.
  - `close(): void` — Закрывает модальное окно.
  - `setContent(content: HTMLElement): void` — Устанавливает содержимое окна.

---

### `class OrderFormComponent`

Компонент `OrderFormComponent` управляет формой оформления заказа.

- **Поля:**

  - `paymentButtons: HTMLButtonElement[]` — Кнопки выбора способа оплаты.
  - `addressInput: HTMLInputElement` — Поле для ввода адреса.

- **Методы:**
  - `setPaymentMethod(method: string): void` — Устанавливает способ оплаты.
  - `validateFields(): boolean` — Проверяет корректность данных формы.

---

## Презентер (Presenter)

Презентер управляет связью между моделью и представлением. Основные задачи выполняются в классе `App`:

- **Инициализация приложения.**
- **Загрузка данных каталога.**
- **Обработка пользовательских действий:**
  - Добавление/удаление товаров из корзины.
  - Открытие модальных окон.
  - Отправка заказа.

---

## Список событий приложения

- `catalog:loaded` — Загрузка каталога товаров.
- `basket:updated` — Обновление содержимого корзины.
- `order:validated` — Проверка валидности заказа.
- `modal:open` — Открытие модального окна.
- `modal:close` — Закрытие модального окна.
- `order:submitted` — Отправка заказа.
- `payment:changed` — Изменение способа оплаты.
