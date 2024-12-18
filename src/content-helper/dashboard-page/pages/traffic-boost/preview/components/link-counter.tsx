/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useDispatch } from '@wordpress/data';
import { LinkType, PostLinks } from '../../provider';
import { TrafficBoostStore } from '../../store';

/**
 * The shape of the link counter object.
 *
 * @since 3.18.0
 */
type LinkCount = {
	[key in LinkType]: number;
}

/**
 * Props for the LinkCounter component.
 *
 * @since 3.18.0
 */
interface LinkCounterProps {
	postLinks: PostLinks;
	onLinkTypeClick?: ( type: LinkType | null ) => void;
	selectedLinkType: LinkType | null;
}

/**
 * Component that displays a counter for different types of links.
 *
 * @since 3.18.0
 *
 * @param {LinkCounterProps} props The component's props.
 */
export const LinkCounter = ( {
	postLinks,
	onLinkTypeClick,
	selectedLinkType: initialSelectedLinkType,
}: LinkCounterProps ): React.JSX.Element => {
	const [ selectedLinkType, setSelectedLinkType ] = useState<LinkType | null>( initialSelectedLinkType );
	const [ links, setLinks ] = useState<LinkCount>( {
		external: 0,
		internal: 0,
		smart: 0,
	} );

	const { setPreviewLinkType } = useDispatch( TrafficBoostStore );

	useEffect( () => {
		setSelectedLinkType( initialSelectedLinkType );
		setPreviewLinkType( initialSelectedLinkType );
	}, [ initialSelectedLinkType, setPreviewLinkType ] );

	/**
	 * Updates the link counts when postLinks changes.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const newLinks = {
			external: postLinks.external.length,
			internal: postLinks.internal.length,
			smart: postLinks.smart.length,
		};

		setLinks( newLinks );
	}, [ postLinks ] );

	/**
	 * Handles click events on link type buttons.
	 *
	 * @since 3.18.0
	 *
	 * @param {LinkType} type The type of link that was clicked.
	 */
	const handleLinkTypeClick = ( type: LinkType ) => {
		let newSelectedLinkType: LinkType | null = type;

		// If the same link type is clicked again, reset the selected link type.
		if ( selectedLinkType === type ) {
			newSelectedLinkType = null;
		}

		setSelectedLinkType( newSelectedLinkType );
		setPreviewLinkType( newSelectedLinkType );

		onLinkTypeClick?.( newSelectedLinkType );
	};

	/**
	 * Checks if a link type is currently selected.
	 *
	 * @since 3.18.0
	 *
	 * @param {LinkType} type The type to check.
	 *
	 * @return {boolean} Whether the type is selected.
	 */
	const isSelected = ( type: LinkType ) => selectedLinkType === type;

	return (
		<div className="traffic-boost-preview-info-links">
			<div className="traffic-boost-preview-info-links-summary">
				{ postLinks.total > 0 ? (
					<>
						Contains { postLinks.total } outbound links:
					</>
				) : (
					<>
						This post has no outbound links.
					</>
				) }
			</div>
			<div className="traffic-boost-preview-info-links-counter">
				{ links.external > 0 && (
					<Button
						variant="secondary"
						isPressed={ isSelected( 'external' ) }
						onClick={ () => handleLinkTypeClick( 'external' ) }
					>
						{ links.external } external
					</Button>
				) }
				{ links.internal > 0 && (
					<Button
						variant="secondary"
						isPressed={ isSelected( 'internal' ) }
						onClick={ () => handleLinkTypeClick( 'internal' ) }
					>
						{ links.internal } internal
					</Button>
				) }
				{ links.smart > 0 && (
					<Button
						variant="secondary"
						isPressed={ isSelected( 'smart' ) }
						onClick={ () => handleLinkTypeClick( 'smart' ) }
					>
						{ links.smart } smart links
					</Button>
				) }
			</div>
		</div>
	);
};
