import '../css/common.scss';

type BetaBadgeProps = {
	text?: string;
	color?: string;
	size?: string;
};

export const BetaBadge = ( {
	text = 'Beta',
	color = 'var(--parsely-green)', // Default orange color
	size = '0.75rem', // Default font size
}: BetaBadgeProps ): JSX.Element => {
	// Inline style object without explicit type
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
