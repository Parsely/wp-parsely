import {
	__experimentalHeading as Heading,
	__experimentalHStack as HStack,
	Button,
	DropdownMenu, Spinner,
} from '@wordpress/components';
import type { ReactNode } from 'react';

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
