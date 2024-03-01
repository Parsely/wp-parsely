/**
 * WordPress dependencies
 */
import { Panel, PanelBody } from '@wordpress/components';
// eslint-disable-next-line import/named
import { store as coreStore, Taxonomy, User } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { SidebarSettings, useSettings } from '../../common/settings';
import { VerifyCredentials } from '../../common/verify-credentials';
import { SidebarPostData } from '../editor-sidebar';
import { RelatedPostList } from '../related-posts/component-list';
import { SmartLinkingPanel, SmartLinkingPanelContext } from '../smart-linking/component';
import { TitleSuggestionsPanel } from '../title-suggestions/component';

/**
 * SidebarToolsTab component props.
 *
 * @since 3.14.0
 */
type SidebarToolsTabProps = {
	trackToggle: ( panel: string, next: boolean ) => void
}

/**
 * SidebarToolsTab component.
 * Renders the Tools tab in the Content Helper sidebar.
 *
 * @since 3.14.0
 *
 * @param { SidebarToolsTabProps } props The component's props.
 */
export const SidebarToolsTab = (
	{ trackToggle }: Readonly<SidebarToolsTabProps>
): JSX.Element => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	const [ postData, setPostData ] = useState<SidebarPostData>( {
		authors: [], categories: [], tags: [],
	} );

	/**
	 * Returns the current Post's ID, tags and categories.
	 *
	 * @since 3.11.0
	 * @since 3.14.0 Moved from `editor-sidebar.tsx`
	 */
	const { authors, categories, tags } = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( editorStore ) as GutenbergFunction;
		const { getEntityRecords } = select( coreStore );

		const authorRecords: User[] | null = getEntityRecords(
			'root', 'user', { include: getEditedPostAttribute( 'author' ) }
		);

		const categoryRecords: Taxonomy[] | null = getEntityRecords(
			'taxonomy', 'category', { include: getEditedPostAttribute( 'categories' ) }
		);

		const tagRecords: Taxonomy[]|null = getEntityRecords(
			'taxonomy', 'post_tag', { include: getEditedPostAttribute( 'tags' ) }
		);

		return {
			authors: authorRecords,
			categories: categoryRecords,
			tags: tagRecords,
		};
	}, [] );

	useEffect( () => {
		// Set the post data only when all required properties have become
		// available.
		if ( authors && categories && tags ) {
			setPostData( {
				authors: authors.map( ( a ) => a.name ),
				categories: categories.map( ( c ) => c.name ),
				tags: tags.map( ( t ) => t.name ),
			} );
		}
	}, [ authors, categories, tags ] );

	return (
		<Panel>
			<PanelBody
				title={ __( 'Title Suggestions (Beta)', 'wp-parsely' ) }
				initialOpen={ settings.TitleSuggestionsOpen }
				onToggle={ ( next ) => {
					setSettings( {
						TitleSuggestionsOpen: next,
					} );
					trackToggle( 'title_suggestions', next );
				} }
			>
				<VerifyCredentials>
					<TitleSuggestionsPanel />
				</VerifyCredentials>
			</PanelBody>

			<PanelBody
				title={ __( 'Smart Linking (Beta)', 'wp-parsely' ) }
				initialOpen={ settings.SmartLinkingOpen }
				onToggle={ ( next ) => {
					setSettings( {
						SmartLinkingOpen: next,
					} );
					trackToggle( 'smart_linking', next );
				} }
			>
				<VerifyCredentials>
					<SmartLinkingPanel
						context={ SmartLinkingPanelContext.ContentHelperSidebar }
					/>
				</VerifyCredentials>
			</PanelBody>

			<PanelBody
				title={ __( 'Related Posts', 'wp-parsely' ) }
				initialOpen={ settings.RelatedPostsOpen }
				onToggle={ ( next ) => {
					setSettings( {
						RelatedPostsOpen: next,
					} );
					trackToggle( 'related_top_posts', next );
				} }
			>
				{
					<VerifyCredentials>
						<RelatedPostList
							metric={ settings.RelatedPostsMetric }
							period={ settings.RelatedPostsPeriod }
							postData={ postData }
						/>
					</VerifyCredentials>
				}
			</PanelBody>
		</Panel>
	);
};
