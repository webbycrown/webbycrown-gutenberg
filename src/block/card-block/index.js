/**
 * BLOCK: demo-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { PlainText, RichText, MediaUpload } = wp.editor;
const { Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/card-block', {

	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'VK Card Block' ), // Block title.
	description: __( 'This is a card block' ),
	icon: 'shield-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'card' ),
		__( 'card block' ),
		__( 'custom card block' ),
	],

	attributes: {
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
		title: {
			type: 'string',
			source: 'text',
			selector: '.card-title',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.card-content',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const onFileSelect = ( img ) => {
			props.setAttributes( {
				imgURL: img.url,
				imgID: img.id,
				imgAlt: img.alt,
			} );
		}

		const onRemoveImage = () => {
			props.setAttributes( {
				imgURL: null,
				imgID: null,
				imgAlt: null,
			} );
		}

		return (
			<div className={ props.className }>
				<div className="media-wrapper">
					{
						(props.attributes.imgURL) ? (
							<div>
								<img
									src={props.attributes.imgURL}
									alt={props.attributes.imgAlt}
									width="150"
									height="150"
								/>
								{
									(props.isSelected) ? (
										<div>
											<Button
												onClick={ onRemoveImage }
												className="button media-remove"
											>Remove</Button>
										</div>
									) : null
								}
							</div>
						) : (
						<MediaUpload
							onSelect={ onFileSelect }
							value={props.attributes.imgID}
							allowedTypes={[ 'image' ]}
							render={ ({open}) =>
								<Button onClick={open} className="button">
									Choose an Image
								</Button>
							}
						/>
						)
					}
				</div>

				<div className="card-information">
					<PlainText
						onChange={ newTitle => { props.setAttributes( { title: newTitle } ) } }
						value={props.attributes.title}
						className="heading"
						placeholder="Type your card title here"
					/>
					<RichText
						onChange={ newContent => { props.setAttributes( { content: newContent } ) } }
						value={props.attributes.content}
						multiline="p"
						placeholder="Type your card title here"
					/>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="img-wrapper">
					<img
						src={props.attributes.imgURL}
						alt={props.attributes.imgAlt}
					/>
				</div>

				<div className="card-details">
					<h2 className="card-title">{props.attributes.title}</h2>
					<div className="card-content">
						{props.attributes.content}
					</div>
				</div>
			</div>
		);
	},
} );
