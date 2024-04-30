import { selectBlock } from '@wordpress/block-editor/store/actions';
import { BlockInstance, createBlock, serialize } from '@wordpress/blocks';
import { Button, __experimentalDivider as Divider } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { arrowLeft, arrowRight, check, close } from '@wordpress/icons';
import { LinkSuggestion } from '../provider';
import {
	// @ts-ignore
	BlockEditorProvider, WritingFlow, ObserveTyping, BlockList, BlockPreview as BlockPreviewComponent,
} from '@wordpress/block-editor';

type ReviewSuggestionProps = {
	link: LinkSuggestion | null,
	block?: BlockInstance,
};

const SuggestionBreadcrumb = ( { link, block }: ReviewSuggestionProps ): JSX.Element => {
	return (
		<div>
			[Parent] / [Parent] /
			<span>
				[Block Name] [Attribute]
			</span>
		</div>
	);
};

const BlockPreview = ( { block }: { block?: BlockInstance } ) => {
	if ( ! block ) {
		return <></>;
	}

	return (
		<div className="wp-block-editor editor-styles-wrapper wp-parsely-preview-editor">
			<BlockEditorProvider
				value={ [ block ] }
				settings={ {
					templateLock: 'all',
					postLock: {
						isLocked: true,
						user: null,
					},
				} } // You can specify editor settings here
			>
				<BlockList />
			</BlockEditorProvider>
		</div>
	);
};

export const ReviewSuggestion = ( {
	link,
	block,
}: ReviewSuggestionProps ): JSX.Element => {
	if ( ! link ) {
		return <></>;
	}

	return (
		<div className="smart-linking-review-suggestion">
			<SuggestionBreadcrumb link={ link } block={ block } />
			<div className="review-suggestion-preview">
				<BlockPreview block={ block } />
			</div>
			<Divider />
			<div className="smart-linking-review-suggestion-url">{ link.href }</div>
			<div className="review-controls">
				<Button icon={ arrowLeft }>Previous</Button>
				<Button icon={ close } variant={ 'secondary' }>
					Reject
				</Button>
				<Button icon={ check } variant="secondary">
					Accept
				</Button>
				<Button icon={ arrowRight }>Next</Button>
			</div>
		</div>
	);
};
