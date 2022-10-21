export interface PostPerformanceData {
	author: string;
	date: string;
	id: number;
	statsUrl: string;
	title: string;
	url: string;
	views: string;
	visitors: string;
	avgEngaged: string;
	referrers: PostPerformanceReferrerData;
}

export interface PostPerformanceReferrerData {
	top: {
		views: string;
		viewsPercentage: string;
		datasetViewsPercentage: string;
	}[];
	types: {
		views: string;
		viewsPercentage: string;
	}[];
}
