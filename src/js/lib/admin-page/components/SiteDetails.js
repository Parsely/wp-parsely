const SiteDetails = ( { apikey, postsToTrack, pagesToTrack, phpVersion, pluginVersion } ) => {
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
	};
	return (
		<div className="site-details-container">
			<div className="site-detail">
				<div className="details-label">
					<span>Site Details</span>
				</div>
				<div className="details-info">
					<span className="details-info-item">
						Parsely Site ID: { apikey }
					</span>
					<span className="details-info-item">
						PHP Version: { phpVersion }
					</span>
					<span className="details-info-item">
						Post Types to Track: { postsToTrack }
					</span>
					<span className="details-info-item">
						Page Types to Track: { pagesToTrack }
					</span>
					<span className="details-info-item">
						Plugin Version: { pluginVersion }
					</span>
					<p onClick={ () => copyToClipboard() } className="copy-cta">Copy to Clipboard</p>
				</div>
			</div>
		</div>
	);
};

export default SiteDetails;
