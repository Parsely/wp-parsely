export interface RelatedTopPostData {
	author: string;
	date: string;
	id: number;
	statsUrl: string;
	title: string;
	url: string;
	views: number;
}

export interface RelatedTopPostApiError {
	message :string;
	errors: {
		parsely_site_id_not_set: string;
		parsely_api_secret_not_set: string;
	};
}
