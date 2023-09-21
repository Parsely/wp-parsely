/**
 * Defines the props structure for FilterSelect.
 *
 * @since 3.10.0
 */
interface FilterSelectProps {
	defaultValue?: string;
	items: [value: string, label: string][];
	onChange: ( event: React.ChangeEvent<HTMLSelectElement> ) => void;
}

/**
 * Defines the props structure for prefilled FilterSelect elements.
 *
 * @since 3.10.0
 */
type PrefilledFilterSelectProps = Omit<FilterSelectProps, 'items'>;

/**
 * Returns a select element according to the passed props.
 *
 * @since 3.10.0
 *
 * @param {FilterSelectProps} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
export const FilterSelect = (
	{ defaultValue, items, onChange }: FilterSelectProps
): JSX.Element => {
	return (
		<select onChange={ onChange } value={ defaultValue }>
			{ items.map( ( item ) => (
				<option
					key={ item[ 0 ] }
					value={ item[ 0 ] }>{ item[ 1 ] }
				</option>
			) ) }
		</select>
	);
};

/**
 * Returns a prefilled FilterSelect containing time options.
 *
 * @since 3.10.0
 *
 * @param {PrefilledFilterSelectProps} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
export const FilterSelectTime = (
	{ defaultValue, onChange }: PrefilledFilterSelectProps
):JSX.Element => {
	const items: [value: string, label: string][] = [
		[ '1', 'Last 24 hours' ],
		[ '7', 'Last 7 days' ],
		[ '30', 'Last 30 days' ],
	];

	return (
		<FilterSelect
			defaultValue={ defaultValue }
			items={ items }
			onChange={ onChange }
		/>
	);
};

/**
 * Returns a prefilled FilterSelect containing metric options.
 *
 * @since 3.10.0
 *
 * @param {PrefilledFilterSelectProps} props The component's props.
 *
 * @return {JSX.Element} The JSX Element.
 */
export const FilterSelectMetric = (
	{ defaultValue, onChange }: PrefilledFilterSelectProps
):JSX.Element => {
	const items: [value: string, label: string][] = [
		[ 'views', 'Page Views' ],
		[ 'avg_engaged', 'Avg. Time' ],
	];

	return (
		<FilterSelect
			defaultValue={ defaultValue }
			items={ items }
			onChange={ onChange }
		/>
	);
};
