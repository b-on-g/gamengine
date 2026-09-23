namespace $ {

	export type $bog_gamengine_text_font_glyphs = {
		sources: readonly $bog_gamengine_atlas_source[]
		advance: ReadonlyMap< string, number >
	}

	export const $bog_gamengine_text_font_chars =
		' !"#%&\'()*+,-./0123456789:;<=>?@'
		+ 'ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_'
		+ 'abcdefghijklmnopqrstuvwxyz{|}~'
		+ 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
		+ 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'

	export function $bog_gamengine_text_font_render(
		context: typeof globalThis,
		family: string,
		size: number,
		chars: string,
	): $bog_gamengine_text_font_glyphs {

		const advance = new Map< string, number >()
		const sources = [] as $bog_gamengine_atlas_source[]
		const view = context as unknown as { document?: Document, CanvasRenderingContext2D?: unknown }
		if( !view.document || !view.CanvasRenderingContext2D ) return { sources, advance }

		const canvas = view.document.createElement( 'canvas' )
		canvas.width = size
		canvas.height = size
		const paint = canvas.getContext( '2d', { willReadFrequently: true } )
		if( !paint ) return { sources, advance }

		paint.font = `${ Math.round( size * 0.75 ) }px ${ family }`
		paint.textAlign = 'center'
		paint.textBaseline = 'middle'
		paint.fillStyle = '#ffffff'

		for( let i = 0; i < chars.length; ++i ) {
			const char = chars[ i ]
			advance.set( char, paint.measureText( char ).width / size )
			if( char === ' ' ) continue
			paint.clearRect( 0, 0, size, size )
			paint.fillText( char, size / 2, size / 2 )
			sources.push({ name: char, image: paint.getImageData( 0, 0, size, size ) })
		}

		return { sources, advance }
	}

	export class $bog_gamengine_text_font extends $mol_object2 {

		@ $mol_mem
		family( next = 'sans-serif' ) {
			return next
		}

		@ $mol_mem
		size( next = 64 ) {
			return next
		}

		@ $mol_mem
		chars( next = $bog_gamengine_text_font_chars ) {
			return next
		}

		@ $mol_mem_key
		static glyphs( key: string ): $bog_gamengine_text_font_glyphs {
			$mol_wire_solid()
			const at = key.indexOf( '\n' )
			const to = key.indexOf( '\n', at + 1 )
			return $bog_gamengine_text_font_render(
				this.$.$mol_dom_context,
				key.slice( 0, at ),
				Number( key.slice( at + 1, to ) ),
				key.slice( to + 1 ),
			)
		}

		glyphs() {
			const cls = this.constructor as typeof $bog_gamengine_text_font
			return cls.glyphs( `${ this.family() }\n${ this.size() }\n${ this.chars() }` )
		}

		sources() {
			return this.glyphs().sources
		}

		advance( char: string ) {
			return this.glyphs().advance.get( char ) ?? 0.6
		}

	}

}
