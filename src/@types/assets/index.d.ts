declare module '\*.svg' {
	import React = require( 'react' );
	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

declare module '@wordpress/e2e-test-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const page: any;
