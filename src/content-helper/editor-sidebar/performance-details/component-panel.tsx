/**
 * WordPress dependencies
 */
import {
	__experimentalHeading as Heading,
	__experimentalHStack as HStack,
	Button,
	DropdownMenu, Spinner,
} from '@wordpress/components';
import type { ReactNode } from 'react';

/**
 * PerformanceStatPanel component props.
 */
type PerformanceStatPanelProps = {
	title: string;
	icon: JSX.Element;
	subtitle?: string;
	level?: Parameters<typeof Heading>[0]['level'];
	children: ReactNode;
	controls?: Parameters<typeof DropdownMenu>[0]['controls'];
	dropdownChildren?: Parameters<typeof DropdownMenu>[0]['children'];
	onClick?: () => void;
	isOpen?: boolean;
	isLoading?: boolean;
}

/**
 * The PerformanceStatPanel component.
 * This component is the raw panel used to display performance stats.
 *
 * If `dropdownChildren` is set, it will be used as the DropdownMenu.
 * if `controls` is set, it will be used to render the DropdownMenu.
 *
 * @since 3.14.0
 *
 * @param { PerformanceStatPanelProps } props The component's props.
 */
export const PerformanceStatPanel = (
	{ title,
		icon,
		subtitle,
		level = 2,
		children,
		controls,
		onClick,
		isOpen,
		isLoading,
		dropdownChildren }: PerformanceStatPanelProps
) => {
	return (
		<div className="performance-stat-panel">
			<HStack className={ 'panel-header level-' + level }>
				<Heading level={ level }>{ title }</Heading>
				{ subtitle && ! isOpen &&
					<span className="panel-subtitle">{ subtitle }</span>
				}
				{ ( controls && ! dropdownChildren ) && (
					<DropdownMenu
						icon={ icon }
						label="Select a direction"
						toggleProps={ {
							isSmall: true,
						} }
						controls={ controls }
					/>
				) }
				{ dropdownChildren && (
					<DropdownMenu
						icon={ icon }
						label="Select a direction"
						toggleProps={ {
							isSmall: true,
						} }
						children={ dropdownChildren }
					/>
				) }
				{ ! dropdownChildren && ! controls && (
					<Button
						icon={ icon }
						isSmall
						isPressed={ isOpen }
						onClick={ onClick }
					/>
				) }
			</HStack>
			<div className="panel-body">
				{ isLoading ? (
					<div className="parsely-spinner-wrapper" data-testid="parsely-spinner-wrapper">
						<Spinner />
					</div>
				) : ( children ) }
			</div>
		</div>
	);
};
