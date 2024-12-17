import {
	IOrderDetails,
	IOderResult,
	IProduct,
	IApiResponseList,
} from '../types';
import { Api } from './base/api';

export interface IAppAPI {
	getProductList: () => Promise<IProduct[]>;
	order: (orderDetails: IOrderDetails) => Promise<IOderResult>;
}

export class AppApi extends Api implements IAppAPI {
	readonly cdnUrl: string;

	constructor(cdnUrl: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdnUrl = cdnUrl;
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((responseData: IApiResponseList<IProduct>) =>
			responseData.items.map((productItem) => ({
				...productItem,
				image: `${this.cdnUrl}${productItem.image}`,
			}))
		);
	}

	order(orderDetails: IOrderDetails): Promise<IOderResult> {
		return this.post('/order', orderDetails).then((orderResponse: IOderResult) => orderResponse);
	}
}
