import '../css/common.scss';

/**
 * Properties for the BetaBadge component.
 */
type BetaBadgeProps = {
	/**
	 * The text to display in the badge. If not provided, defaults to 'Beta'.
	 */
	text?: string;

	/**
	 * The color of the badge. If not provided, defaults to 'var(--parsely-green)'.
	 */
	color?: string;

	/**
	 * The size of the badge text. If not provided, defaults to '0.75rem'.
	 */
	size?: string;
};

/**
 * The BetaBadge component displays a badge with the specified text, color, and size.
 *
 * @param {BetaBadgeProps} props - The properties for the BetaBadge component.

 * @return {JSX.Element} The BetaBadge component.
 */
export const BetaBadge = ( {
	text = 'Beta',
	color = 'var(--parsely-green)',
	size = '0.75rem',
}: BetaBadgeProps ): JSX.Element => {
	const badgeStyle = {
		backgroundColor: color,
		fontSize: size,
	};

	return (
		<div className="wp-parsely-beta-badge" style={ badgeStyle }>
			{ text }
		</div>
	);
};
