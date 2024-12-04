import { HydratedPost } from '../../../common/base-wordpress-provider';

export type TrafficBoostSuggestion = {
    source_post: HydratedPost;
    destination_post: HydratedPost;
    // TODO: Add more fields as needed
};
