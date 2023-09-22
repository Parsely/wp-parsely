/**
 * Internal dependencies
 */
import { Select } from '../../common/select';

/**
 * Defines the props structure for TopPostsFilters.
 *
 * @since 3.10.0
 */
interface TopPostsFiltersProps {
	selectedPeriod: string;
	onPeriodChange: ( event: React.ChangeEvent<HTMLSelectElement> ) => void;
	selectedMetric: string;
	onMetricChange: ( event: React.ChangeEvent<HTMLSelectElement> ) => void;
}

/**
 * Returns a div element containing filter controls for the Top Posts widget.
 *
 * @since 3.10.0
 *
 * @param {TopPostsFiltersProps} props The component's props.
 */
export function TopPostsFilters(
	{ selectedPeriod, onPeriodChange, selectedMetric, onMetricChange }: TopPostsFiltersProps
): JSX.Element {
	return (
		<div className="parsely-top-posts-filters">
			<Select
				defaultValue={ selectedPeriod }
				items={ [
					[ '1', 'Last 24 hours' ],
					[ '7', 'Last 7 days' ],
					[ '30', 'Last 30 days' ],
				] }
				onChange={ onPeriodChange }
			/>
			<Select
				defaultValue={ selectedMetric }
				items={ [
					[ 'views', 'Page views' ],
					[ 'avg_engaged', 'Avg. Time' ] ] }
				onChange={ onMetricChange }
			/>
		</div>
	);
}
