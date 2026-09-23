namespace $ {

	const faces = [
		[ [ 0, 0, 1 ], [ 1, 0, 0 ], [ 0, 1, 0 ] ],
		[ [ 1, 0, 0 ], [ 0, 0, -1 ], [ 0, 1, 0 ] ],
		[ [ 0, 0, -1 ], [ -1, 0, 0 ], [ 0, 1, 0 ] ],
		[ [ -1, 0, 0 ], [ 0, 0, 1 ], [ 0, 1, 0 ] ],
		[ [ 0, 1, 0 ], [ 1, 0, 0 ], [ 0, 0, -1 ] ],
		[ [ 0, -1, 0 ], [ 1, 0, 0 ], [ 0, 0, 1 ] ],
	]

	const corners = [ [ -1, -1 ], [ 1, -1 ], [ -1, 1 ], [ 1, 1 ] ]

	const strip: [ number, number ][] = []
	for( let face = 0; face < faces.length; ++ face ) {
		if( face > 0 ) strip.push([ face, 0 ])
		for( let corner = 0; corner < corners.length; ++ corner ) strip.push([ face, corner ])
		if( face < faces.length - 1 ) strip.push([ face, 3 ])
	}

	export class $bog_gamengine_shape_box extends $bog_gamengine_shape {

		@ $mol_memo.method
		geometry() {
			const geometry = new Float32Array( strip.length * 3 )
			for( let i = 0; i < strip.length; ++ i ) {
				const [ normal, u, v ] = faces[ strip[ i ][ 0 ] ]
				const [ cx, cy ] = corners[ strip[ i ][ 1 ] ]
				for( let axis = 0; axis < 3; ++ axis ) {
					geometry[ i * 3 + axis ] = ( normal[ axis ] + u[ axis ] * cx + v[ axis ] * cy ) / 2
				}
			}
			return geometry
		}

		@ $mol_memo.method
		skin() {
			const skin = new Float32Array( strip.length * 2 )
			for( let i = 0; i < strip.length; ++ i ) {
				const [ cx, cy ] = corners[ strip[ i ][ 1 ] ]
				skin[ i * 2 ] = cx > 0 ? 1 : 0
				skin[ i * 2 + 1 ] = cy > 0 ? 0 : 1
			}
			return skin
		}

		@ $mol_memo.method
		normals() {
			const normals = new Float32Array( strip.length * 3 )
			for( let i = 0; i < strip.length; ++ i ) {
				const normal = faces[ strip[ i ][ 0 ] ][ 0 ]
				for( let axis = 0; axis < 3; ++ axis ) normals[ i * 3 + axis ] = normal[ axis ]
			}
			return normals
		}

		count() {
			return faces.length * corners.length
		}

	}

}
