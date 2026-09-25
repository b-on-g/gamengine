if( process.argv.length < 3 ) {
	console.error( 'Pass module paths to audit, otherwise a dev server starts instead of a build' )
	process.exit( 1 )
}

const $ = require( 'mam' )

$.$mol_build.prototype.bundleAll = function( path ) {
	this.bundleAllNodeAudit( path )
	return null
}
