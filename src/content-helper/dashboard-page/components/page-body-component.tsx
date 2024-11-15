/**
 * Internal dependencies
 */
import { PARSELY_DASHBOARD_MAX_PAGE_WIDTH } from '../dashboard-page';

/**
 * Props for the PageBody component.
 *
 * @since 3.18.0
 */
type PageBodyProps = {
	className?: string;
	children: React.ReactNode;
	maxWidth?: number;
}

/**
 * Page body component.
 *
 * Used to wrap the main content of a dashboard page.
 *
 * @since 3.18.0
 *
 * @param {PageBodyProps} props The component's props.
 */
export const PageBody = ( {
	className,
	children,
	maxWidth = PARSELY_DASHBOARD_MAX_PAGE_WIDTH,
}: Readonly<PageBodyProps> ): React.JSX.Element => {
	return (
		<main
			className={ 'parsely-dashboard-page-body' + ( className ? ' ' + className : '' ) }
			style={ { maxWidth: maxWidth + 'px' } }
		>
			{ children }
		</main>
	);
};
