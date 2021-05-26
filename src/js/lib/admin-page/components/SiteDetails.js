const SiteDetails = ({ apikey, postsToTrack, pagesToTrack, phpVersion, pluginVersion }) => (
	<div className="site-details-container">
		<div className="details-label">
			<h2>Site Details</h2>
		</div>
		<div className="details-info">
			<p>
				Parsely Site ID: {apikey}
			</p>
			<p>
				PHP Version: {phpVersion}
			</p>
			<p>
				Post Types to Track: {postsToTrack}
			</p>
			<p>
				Page Types to Track: {pagesToTrack}
			</p>
			<p>
				Plugin Version: {pluginVersion}
			</p>
			<span>Copy to Clipboard</span>
		</div>
	</div>
);

export default SiteDetails;
