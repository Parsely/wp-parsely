/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const AD_BLOCKER_HINT: string = __(
	'This error can be sometimes caused by ad-blockers or browser tracking protections. Please whitelist this website where needed and try again.',
	'wp-parsely',
);

export function ErrorHint(): JSX.Element {
	return (
		<p className="parsely-error-hint" data-testid="parsely-error-hint">
			<strong>{ __( 'Hint: ', 'wp-parsely' ) }</strong>
			{ AD_BLOCKER_HINT }
		</p>
	);
}

export default ErrorHint;
