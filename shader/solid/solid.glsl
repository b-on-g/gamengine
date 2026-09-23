float bog_gamengine_pbr_ggx( float ndh, float alpha ) {
	float a2 = alpha * alpha;
	float d = ndh * ndh * ( a2 - 1.0 ) + 1.0;
	return a2 / max( d * d, 0.0000001 );
}

float bog_gamengine_pbr_smith( float ndl, float ndv, float alpha ) {
	float a2 = alpha * alpha;
	float shadowv = ndl * sqrt( ndv * ndv * ( 1.0 - a2 ) + a2 );
	float shadowl = ndv * sqrt( ndl * ndl * ( 1.0 - a2 ) + a2 );
	return 0.5 / max( shadowv + shadowl, 0.0001 );
}

vec3 bog_gamengine_pbr_fresnel( vec3 f0, float vdh ) {
	float fade = pow( 1.0 - vdh, 5.0 );
	return f0 + ( 1.0 - f0 ) * fade;
}

vec3 bog_gamengine_pbr_brdf( vec3 normal, vec3 eye, vec3 light, vec3 diffuse, vec3 f0, float roughness ) {
	vec3 mid = normalize( eye + light );
	float ndl = max( dot( normal, light ), 0.001 );
	float ndv = max( dot( normal, eye ), 0.001 );
	float ndh = max( dot( normal, mid ), 0.0 );
	float vdh = max( dot( eye, mid ), 0.0 );
	float alpha = roughness * roughness;
	vec3 fresnel = bog_gamengine_pbr_fresnel( f0, vdh );
	vec3 spec = fresnel * bog_gamengine_pbr_ggx( ndh, alpha ) * bog_gamengine_pbr_smith( ndl, ndv, alpha );
	return ( 1.0 - fresnel ) * diffuse + spec;
}

float bog_gamengine_pbr_window( float dist, float range ) {
	float ratio = dist / max( range, 0.0001 );
	float fade = clamp( 1.0 - ratio * ratio * ratio * ratio, 0.0, 1.0 );
	return fade * fade / max( dist * dist, 0.01 );
}

float bog_gamengine_pbr_cone( float cosine, float edge ) {
	return smoothstep( edge, mix( edge, 1.0, 0.2 ), cosine );
}
