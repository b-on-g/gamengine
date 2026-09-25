if( process.argv.length < 3 ) {
	console.error( 'Pass module paths to audit, otherwise a dev server starts instead of a build' )
	process.exit( 1 )
}

const $ = require( 'mam' )

$.$mol_build.prototype.bundleAll = function( path ) {
	this.bundleAllNodeAudit( path )
	return null
}

$.$mol_build.prototype.bundleAndRunTestJS = function( { path, exclude, bundle } ) {
	const target = this.bundle_test_js( [ path, exclude, bundle ] )
	if( !target ) return []
	return [ target.js, target.map ]
}
