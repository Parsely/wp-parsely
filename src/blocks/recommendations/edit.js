import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { ServerSideRender } from '@wordpress/editor';

const ParselyRecommendationsEdit = ( { attributes, setAttributes } ) => (
	<div>
		<InspectorControls>
			<PanelBody title="Settings" initialOpen={ true }>
				<PanelRow>
					<TextControl
						label="Tag"
						value={ attributes.tag }
						onChange={ ( newval ) => setAttributes( { tag: newval } ) }
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Sort Recommendations"
						value={ attributes.sortRecs }
						options={ [
							{ label: 'Score', value: 'score' },
							{
								label: 'Publication Date',
								value: 'pub_date',
							},
						] }
						onChange={ ( newval ) => setAttributes( { sortRecs: newval } ) }
					/>
				</PanelRow>
				<PanelRow>
					<RangeControl
						label="Publication Start"
						min="7"
						max="365"
						onChange={ ( newnumber ) => setAttributes( { pubStart: newnumber } ) }
						value={ attributes.pubStart }
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Boost"
						value={ attributes.boost }
						options={ [
							{ label: 'Views', value: 'views' },
							{
								label: 'Mobile Views',
								value: 'mobile_views',
							},
							{
								label: 'Tablet Views',
								value: 'tablet_views',
							},
							{
								label: 'Desktop Views',
								value: 'desktop_views',
							},
							{
								label: 'Tablet Views',
								value: 'tablet_views',
							},
							{
								label: 'Visitors',
								value: 'visitors',
							},
							{
								label: 'Visitors New',
								value: 'visitors_new',
							},
							{
								label: 'Visitors Returning',
								value: 'visitors_returning',
							},
							{
								label: 'Engaged Minutes',
								value: 'engaged_minutes',
							},
							{
								label: 'Avergae Engaged',
								value: 'avg_engaged',
							},
							{
								label: 'Avergae Engaged New',
								value: 'avg_engaged_new',
							},
							{
								label: 'Avergae Engaged Returning',
								value: 'avg_engaged_returning',
							},
							{
								label: 'Social Interactions',
								value: 'social_interactions',
							},
							{
								label: 'Facebook Interactions',
								value: 'fb_interactions',
							},
							{
								label: 'Twitter Interactions',
								value: 'tw_interactions',
							},
							{
								label: 'LinkedIn Interactions',
								value: 'li_interactions',
							},
							{
								label: 'Pinterest Interactions',
								value: 'pi_interactions',
							},
							{
								label: 'Facebook Referrals',
								value: 'fb_referrals',
							},
							{
								label: 'Twitter Referrals',
								value: 'tw_referrals',
							},
							{
								label: 'LinkedIn Referrals',
								value: 'li_referrals',
							},
							{
								label: 'Pinterest Referrals',
								value: 'pi_referrals',
							},
						] }
						onChange={ ( newval ) => setAttributes( { boost: newval } ) }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<ServerSideRender block={ 'wp-parsely/recommendations' } />
	</div>
);

registerBlockType( 'wp-parsely/recommendations', {
	title: __( 'Parse.ly Recommendations', 'wp-parsely' ),
	icon: 'smiley',
	category: 'widgets',
	attributes: {
		title: {
			type: 'string',
		},
		tag: {
			type: 'string',
		},
		sortRecs: {
			type: 'string',
			default: 'score',
		},
		pubStart: {
			type: 'number',
			default: 7,
		},
		boost: {
			type: 'string',
			default: 'views',
		},
	},
	edit: ParselyRecommendationsEdit,
	save: () => {
		return null;
	},
} );
