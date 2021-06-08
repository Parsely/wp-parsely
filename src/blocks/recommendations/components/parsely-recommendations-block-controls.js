/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	ToggleControl,
	PanelBody,
	PanelRow,
	RadioControl,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';

const ParselyRecommendationsBlockControls = ( {
	attributes: { boost, displayDirection, personalized, pubStart, sortRecs, tag },
	setAttributes,
} ) => (
	<InspectorControls>
		<PanelBody title="Settings" initialOpen={ true }>
			<PanelRow>
				<ToggleControl
					label={ __( 'Personalize to Visitor', 'wp-parsely' ) }
					help={
						personalized ? __( 'Personalized', 'wp-parsely' ) : __( 'Not Personalized', 'wp-parsely' )
					}
					checked={ personalized }
					onChange={ () => setAttributes( { personalized: ! personalized } ) }
				/>
			</PanelRow>
			<PanelRow>
				<RadioControl
					label={ __( 'Display Direction', 'wp-parsely' ) }
					help={ __( 'Show the list of recommended content horizontally or vertically', 'wp-parsely' ) }
					selected={ displayDirection }
					options={ [
						{ label: __( 'Horizontal', 'wp-parsely' ), value: 'horizontal' },
						{ label: __( 'Vertical', 'wp-parsely' ), value: 'vertical' },
					] }
					onChange={ ( newval ) =>
						setAttributes( {
							displayDirection: newval === 'vertical' ? 'vertical' : 'horizontal',
						} )
					}
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					label={ __( 'Tag' ) }
					value={ tag }
					onChange={ ( newval ) => setAttributes( { tag: newval } ) }
				/>
			</PanelRow>
			<PanelRow>
				<SelectControl
					label={ __( 'Sort Recommendations', 'wp-parsely' ) }
					value={ sortRecs }
					options={ [
						{ label: 'Score', value: 'score' },
						{
							label: __( 'Publication Date', 'wp-parsely' ),
							value: 'pub_date',
						},
					] }
					onChange={ ( newval ) => setAttributes( { sortRecs: newval } ) }
				/>
			</PanelRow>
			<PanelRow>
				<RangeControl
					label={ __( 'Publication Start', 'wp-parsely' ) }
					min="7"
					max="365"
					onChange={ ( newnumber ) => setAttributes( { pubStart: newnumber } ) }
					value={ pubStart }
				/>
			</PanelRow>
			<PanelRow>
				<SelectControl
					label={ __( 'Boost' ) }
					value={ boost }
					options={ [
						{ label: __( 'Views' ), value: 'views' },
						{
							label: __( 'Mobile Views', 'wp-parsely' ),
							value: 'mobile_views',
						},
						{
							label: __( 'Tablet Views', 'wp-parsely' ),
							value: 'tablet_views',
						},
						{
							label: __( 'Desktop Views', 'wp-parsely' ),
							value: 'desktop_views',
						},
						{
							label: __( 'Tablet Views', 'wp-parsely' ),
							value: 'tablet_views',
						},
						{
							label: __( 'Visitors', 'wp-parsely' ),
							value: 'visitors',
						},
						{
							label: __( 'Visitors New', 'wp-parsely' ),
							value: 'visitors_new',
						},
						{
							label: __( 'Visitors Returning', 'wp-parsely' ),
							value: 'visitors_returning',
						},
						{
							label: __( 'Engaged Minutes', 'wp-parsely' ),
							value: 'engaged_minutes',
						},
						{
							label: __( 'Avergae Engaged', 'wp-parsely' ),
							value: 'avg_engaged',
						},
						{
							label: __( 'Avergae Engaged New', 'wp-parsely' ),
							value: 'avg_engaged_new',
						},
						{
							label: __( 'Avergae Engaged Returning', 'wp-parsely' ),
							value: 'avg_engaged_returning',
						},
						{
							label: __( 'Social Interactions', 'wp-parsely' ),
							value: 'social_interactions',
						},
						{
							label: __( 'Facebook Interactions', 'wp-parsely' ),
							value: 'fb_interactions',
						},
						{
							label: __( 'Twitter Interactions', 'wp-parsely' ),
							value: 'tw_interactions',
						},
						{
							label: __( 'LinkedIn Interactions', 'wp-parsely' ),
							value: 'li_interactions',
						},
						{
							label: __( 'Pinterest Interactions', 'wp-parsely' ),
							value: 'pi_interactions',
						},
						{
							label: __( 'Facebook Referrals', 'wp-parsely' ),
							value: 'fb_referrals',
						},
						{
							label: __( 'Twitter Referrals', 'wp-parsely' ),
							value: 'tw_referrals',
						},
						{
							label: __( 'LinkedIn Referrals', 'wp-parsely' ),
							value: 'li_referrals',
						},
						{
							label: __( 'Pinterest Referrals', 'wp-parsely' ),
							value: 'pi_referrals',
						},
					] }
					onChange={ ( newval ) => setAttributes( { boost: newval } ) }
				/>
			</PanelRow>
		</PanelBody>
	</InspectorControls>
);
export default ParselyRecommendationsBlockControls;
