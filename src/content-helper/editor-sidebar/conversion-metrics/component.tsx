import { useEffect } from "@wordpress/element";
import { ConversionMetricsProvider } from "./provider";

export const ConversionMetricsPanel = (): JSX.Element => {

		const fetchMetrics = async ( retries: number ) => {
			ConversionMetricsProvider.getInstance().getConversionMetrics()
				.then( ( result ): void => {
					console.log( result );
				} )
				.catch( async ( err ) => {
					if ( retries > 0 && err.retryFetch ) {
						await new Promise( ( r ) => setTimeout( r, 500 ) );
						await fetchMetrics( retries - 1 );
					} else {
						console.error( err );
					}
				} );
		};

	useEffect(() => {
		fetchMetrics(3);
	}, []);

	return (
		<div className="conversion-metrics-panel">
			Open the console to view the conversions data.
		</div>
	)
};
