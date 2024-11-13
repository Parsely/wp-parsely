/**
 * Props for the PageContainerProps component
 */
type PageContainerProps = {
	className?: string;
	name: string
	children: React.ReactNode;
}

/**
 * Page container component.
 *
 * Used to wrap the main content of a dashboard page, including the
 * header and body.
 *
 * @since 3.18.0
 *
 * @param {PageContainerProps} props The component props.
 */
export const PageContainer = ( {
	className,
	name,
	children,
}: Readonly<PageContainerProps> ): React.JSX.Element => {
	return (
		<div
			className={
				'parsely-menu-page parsely-menu-page-' + name +
				( className ? ' ' + className : '' ) }
		>
			{ children }
		</div>
	);
};
