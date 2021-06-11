const SiteDetails = ( { apikey, postsToTrack, pagesToTrack, phpVersion, pluginVersion } ) => (
	<div className="site-details-container container">
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
				<p className="copy-cta">Copy to Clipboard</p>
			</div>
		</div>
	</div>
);

export default SiteDetails;
