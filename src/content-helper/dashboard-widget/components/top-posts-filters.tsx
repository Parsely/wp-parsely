/**
 * Internal dependencies
 */
import { FilterSelectMetric, FilterSelectTime } from '../../common/filter-select';

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
			<FilterSelectTime defaultValue={ selectedPeriod }
				onChange={ onPeriodChange }
			/>
			<FilterSelectMetric defaultValue={ selectedMetric }
				onChange={ onMetricChange }
			/>
		</div>
	);
}
