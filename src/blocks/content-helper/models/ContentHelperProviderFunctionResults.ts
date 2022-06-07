/**
 * Internal dependencies
 */
import { SuggestedPost } from './SuggestedPost';

export interface GetTopPostsResult {
	message: string;
	posts: SuggestedPost[];
}

export interface BuildFetchDataQueryResult {
	message: string;
	query: object;
}
