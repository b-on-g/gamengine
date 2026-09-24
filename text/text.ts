namespace $ {

	export type $bog_gamengine_text_align = 'left' | 'center' | 'right'

	export class $bog_gamengine_text_pool extends $mol_object2 {

		cap = 0
		count = 0
		trans = new Float32Array( 0 )
		tint = new Float32Array( 0 )
		layer = new Float32Array( 0 )
		uv = new Float32Array( 0 )
		aabb = new Float32Array( 0 )

		fit( need: number ) {
			if( need <= this.cap ) return this.cap
			let cap = Math.max( this.cap, 16 )
			while( cap < need ) cap *= 2
			this.cap = cap
			this.trans = new Float32Array( cap * 16 )
			this.tint = new Float32Array( cap * 4 )
			this.layer = new Float32Array( cap )
			this.uv = new Float32Array( cap * 4 )
			this.aabb = new Float32Array( cap * 6 )
			const uv = this.uv
			for( let i = 0; i < cap; ++i ) {
				uv[ i * 4 + 2 ] = 1
				uv[ i * 4 + 3 ] = 1
			}
			return cap
		}

	}

	export class $bog_gamengine_text extends $bog_gamengine_node {

		@ $mol_mem
		pool( next?: $bog_gamengine_text_pool ) {
			return next ?? new $bog_gamengine_text_pool
		}

		is_source() {
			return true
		}

		source() {
			return this.pool() as $bog_gamengine_batch_source
		}

		@ $mol_mem
		font( next?: $bog_gamengine_text_font ) {
			return next ?? new $bog_gamengine_text_font
		}

		@ $mol_mem
		atlas( next?: $bog_gamengine_atlas | null ) {
			return next ?? null
		}

		@ $mol_mem
		value( next = '' ) {
			return next
		}

		@ $mol_mem
		height( next = 0.5 ) {
			return next
		}

		@ $mol_mem
		align( next?: $bog_gamengine_text_align ): string {
			return next ?? 'left'
		}

		@ $mol_mem
		color( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1, 1, 1 ])
		}

		@ $mol_mem
		billboard( next = false ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'value', kind: 'text', get: ()=> this.value(), set: next => this.value( next as string ) },
				{ name: 'height', kind: 'number', get: ()=> this.height(), set: next => this.height( next as number ) },
				{ name: 'align', kind: 'text', get: ()=> this.align(), set: next => this.align( next as $bog_gamengine_text_align ) },
				{ name: 'color', kind: 'vec4', get: ()=> this.color(), set: next => this.color( next as ArrayLike< number > ) },
				{ name: 'billboard', kind: 'flag', get: ()=> this.billboard(), set: next => this.billboard( next as boolean ) },
			]
		}

		width() {
			const value = this.value()
			const font = this.font()
			let total = 0
			for( let i = 0; i < value.length; ++i ) total += font.advance( value[ i ] )
			return total * this.height()
		}

		axes = new Float32Array( 16 )
		done_world = new Float32Array( 16 )
		done_color = new Float32Array( 4 )
		done_value = null as string | null
		done_height = NaN
		done_align = ''

		fresh( value: string, world: Float32Array, height: number, align: string, color: Float32Array ) {
			let same = value === this.done_value && height === this.done_height && align === this.done_align
			const done_world = this.done_world
			for( let i = 0; i < 16; ++i ) {
				if( world[ i ] !== done_world[ i ] ) same = false
				done_world[ i ] = world[ i ]
			}
			const done_color = this.done_color
			for( let i = 0; i < 4; ++i ) {
				if( color[ i ] !== done_color[ i ] ) same = false
				done_color[ i ] = color[ i ]
			}
			this.done_value = value
			this.done_height = height
			this.done_align = align
			return same
		}

		emit() {
			const pool = this.pool()
			const value = this.value()
			const world = this.world()
			const height = this.height()
			const align = this.align()
			const color = this.color()
			const billboard = this.billboard()
			const cam = billboard ? this.scene()?.cam() ?? null : null
			if( this.fresh( value, world, height, align, color ) && !cam ) return pool.count

			const axes = this.axes
			if( cam ) {
				const view = cam.world()
				for( let c = 0; c < 3; ++c ) {
					const x = view[ c * 4 ]
					const y = view[ c * 4 + 1 ]
					const z = view[ c * 4 + 2 ]
					const k = 1 / ( Math.sqrt( x * x + y * y + z * z ) || 1 )
					axes[ c * 4 ] = x * k
					axes[ c * 4 + 1 ] = y * k
					axes[ c * 4 + 2 ] = z * k
					axes[ c * 4 + 3 ] = 0
				}
				axes[ 12 ] = world[ 12 ]
				axes[ 13 ] = world[ 13 ]
				axes[ 14 ] = world[ 14 ]
				axes[ 15 ] = 1
			} else {
				for( let k = 0; k < 16; ++k ) axes[ k ] = world[ k ]
			}

			pool.fit( value.length )
			const font = this.font()
			const names = this.atlas()?.names() ?? null
			const unknown = names?.get( '?' ) ?? 0
			const trans = pool.trans
			const tint = pool.tint
			const layer = pool.layer
			const aabb = pool.aabb
			const radius = height * $bog_gamengine_batch_scale_max( axes ) * Math.SQRT1_2

			let total = 0
			for( let i = 0; i < value.length; ++i ) total += font.advance( value[ i ] )
			let pen = align === 'center' ? - total * height / 2 : align === 'right' ? - total * height : 0

			let count = 0
			for( let i = 0; i < value.length; ++i ) {
				const char = value[ i ]
				const step = font.advance( char ) * height
				const dx = pen + step / 2
				pen += step
				if( char === ' ' ) continue
				const at = count * 16
				for( let r = 0; r < 4; ++r ) {
					trans[ at + r ] = axes[ r ] * height
					trans[ at + 4 + r ] = axes[ 4 + r ] * height
					trans[ at + 8 + r ] = axes[ 8 + r ]
					trans[ at + 12 + r ] = axes[ 12 + r ] + axes[ r ] * dx
				}
				for( let k = 0; k < 4; ++k ) tint[ count * 4 + k ] = color[ k ]
				layer[ count ] = names ? names.get( char ) ?? unknown : 0
				const x = trans[ at + 12 ]
				const y = trans[ at + 13 ]
				const z = trans[ at + 14 ]
				aabb[ count * 6 ] = x - radius
				aabb[ count * 6 + 1 ] = y - radius
				aabb[ count * 6 + 2 ] = z - radius
				aabb[ count * 6 + 3 ] = x + radius
				aabb[ count * 6 + 4 ] = y + radius
				aabb[ count * 6 + 5 ] = z + radius
				++count
			}

			pool.count = count
			return count
		}

		step( dt: number ) {
			this.emit()
		}

	}

}
