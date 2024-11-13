/**
 * Internal dependencies
 */
import { PARSELY_DASHBOARD_MAX_PAGE_WIDTH } from '../dashboard-page';

/**
 * Props for the PageHeader component
 *
 * @since 3.18.0
 */
type PageHeaderProps = {
	className?: string;
	children: React.ReactNode;
	maxWidth?: number;
}

/**
 * Page header component.
 *
 * Used to wrap the header content of a dashboard page.
 *
 * @since 3.18.0
 *
 * @param {PageHeaderProps} props The component props.
 */
export const PageHeader = ( {
	className,
	children,
	maxWidth = PARSELY_DASHBOARD_MAX_PAGE_WIDTH,
}: Readonly<PageHeaderProps> ): React.JSX.Element => {
	return (
		<header
			className={ 'parsely-dashboard-page-header' + ( className ? ' ' + className : '' ) }
			style={ { maxWidth: maxWidth + 'px' } }
		>
			{ children }
		</header>
	);
};
