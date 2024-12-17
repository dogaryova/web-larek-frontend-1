import { IEvents } from './events';

/**
 * Проверка, является ли объект экземпляром Model
 */
export const isModel = <T>(obj: unknown): obj is Model<T> => {
	return obj instanceof Model;
};

/**
 * Базовая модель, чтобы можно было отличить ее от простых объектов с данными
 */
export abstract class Model<T> {
	protected state: Partial<T>;

	constructor(data: Partial<T>, protected events: IEvents) {
		this.state = { ...data }; // Храним состояние в `state`
	}

	/**
	 * Эмит события об изменениях
	 */
	protected emitChanges(event: string, payload: Partial<T> = {}): void {
		this.events.emit(event, payload);
	}

	/**
	 * Получение текущего состояния модели
	 */
	getState(): Partial<T> {
		return { ...this.state }; // Возвращаем копию текущего состояния
	}

	/**
	 * Обновление состояния модели и эмит событий
	 */
	setState(updates: Partial<T>, event?: string): void {
		this.state = { ...this.state, ...updates };
		if (event) {
			this.emitChanges(event, updates);
		}
	}
}
