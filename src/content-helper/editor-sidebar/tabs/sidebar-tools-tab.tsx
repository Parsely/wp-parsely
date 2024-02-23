/**
 * WordPress dependencies
 */
import { Panel, PanelBody } from '@wordpress/components';
// eslint-disable-next-line import/named
import { store as coreStore, Taxonomy, User } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { BetaBadge } from '../../common/components/beta-badge';
import { VerifyCredentials } from '../../common/verify-credentials';
import { SidebarSettings, useSettings } from '../../common/settings';
import { SidebarPostData } from '../editor-sidebar';
import { RelatedTopPostList } from '../related-top-posts/component-list';
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
export const SidebarToolsTab = ( { trackToggle }: SidebarToolsTabProps ) => {
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

	/**
	 * Returns the current Post's tag names.
	 *
	 * @since 3.11.0
	 * @since 3.14.0 Moved from `editor-sidebar.tsx`
	 */
	const tagNames = useMemo( () => {
		return tags ? tags.map( ( t ) => t.name ) : [];
	}, [ tags ] );

	/**
	 * Returns the current Post's category names.
	 *
	 * @since 3.11.0
	 * @since 3.14.0 Moved from `editor-sidebar.tsx`
	 */
	const categoryNames = useMemo( () => {
		return categories ? categories.map( ( c ) => c.name ) : [];
	}, [ categories ] );

	/**
	 * Returns the current Post's author names.
	 *
	 * @since 3.11.0
	 * @since 3.14.0 Moved from `editor-sidebar.tsx`
	 */
	const authorNames = useMemo( () => {
		return authors ? authors.map( ( a ) => a.name ) : [];
	}, [ authors ] );

	useEffect( () => {
		setPostData( {
			authors: authorNames,
			tags: tagNames,
			categories: categoryNames,
		} );
	}, [ authorNames, tagNames, categoryNames ] );

	return (
		<Panel>
			<PanelBody
				icon={ <BetaBadge /> }
				title={ __( 'Title Suggestions', 'wp-parsely' ) }
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
				icon={ <BetaBadge /> }
				title={ __( 'Smart Linking', 'wp-parsely' ) }
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
				title={ __( 'Related Top Posts', 'wp-parsely' ) }
				initialOpen={ settings.RelatedTopPostsOpen }
				onToggle={ ( next ) => {
					setSettings( {
						RelatedTopPostsOpen: next,
					} );
					trackToggle( 'related_top_posts', next );
				} }
			>
				{
					<VerifyCredentials>
						<RelatedTopPostList
							metric={ settings.SettingsMetric }
							period={ settings.SettingsPeriod }
							postData={ postData }
						/>
					</VerifyCredentials>
				}
			</PanelBody>
		</Panel>
	);
};
