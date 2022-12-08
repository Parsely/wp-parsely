document.querySelector( '.media-single-image button.browse' )?.addEventListener( 'click', selectImage );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function selectImage( this: any ) {
	const optionName = this.dataset.option;

	const imageFrame = window.wp.media( {
		multiple: false,
		library: {
			type: 'image',
		},
	} );

	imageFrame.on( 'select', function() {
		const url = imageFrame.state().get( 'selection' ).first().toJSON().url;
		const inputSelector: string = '#media-single-image-' + optionName + ' input.file-path';

		const inputElement: HTMLInputElement | null = document.querySelector( inputSelector );
		if ( inputElement ) {
			inputElement.value = url;
		}
	} );

	imageFrame.open();
}
