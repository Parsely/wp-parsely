import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const SiteDetails = ( { apikey, postsToTrack, pagesToTrack, phpVersion, pluginVersion } ) => {
	const [ isCopied, setIsCopied ] = useState( false );
	const copyToClipboard = () => {
		const el = document.createElement( 'textarea' );
		el.value = `Site ID: ${ apikey }, PHP Version: ${ phpVersion }, Post Types to track: ${ postsToTrack }, Pages to Track: ${ pagesToTrack }, Plugin Version: ${ pluginVersion }`;
		el.setAttribute( 'readonly', '' );
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild( el );
		el.select();
		document.execCommand( 'copy' );
		document.body.removeChild( el );
		setIsCopied( true );
	};
	return (
		<div className="site-details-container">
			<div className="site-detail">
				<div className="details-label">
					<span>{ __( 'Site Details', 'wp-parsely' ) }</span>
				</div>
				<div className="details-info">
					<span className="details-info-item">
						{ __( 'Parsely Site ID: ', 'wp-parsely' ) } { apikey }
					</span>
					<span className="details-info-item">
						{ __( 'PHP Version: ', 'wp-parsely' ) } { phpVersion }
					</span>
					<span className="details-info-item">
						{ __( 'Post Types to Track: ', 'wp-parsely' ) } { postsToTrack }
					</span>
					<span className="details-info-item">
						{ __( 'Page Types to Track: ', 'wp-parsely' ) } { pagesToTrack }
					</span>
					<span className="details-info-item">
						{ __( 'Plugin Version: ', 'wp-parsely' ) } { pluginVersion }
					</span>
					<div className="site-details-controls">
						<button type="button" onClick={ () => copyToClipboard() } className="copy-cta">
							{ __( 'Copy to Clipboard', 'wp-parsely' ) }
						</button>
						{
							isCopied ? ( <span className="copy-confirmation">{ __( 'Copied!', 'wp-parsely' ) }</span> )
								: ''
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SiteDetails;
