vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
float mid = 0.5;
float rotation = time;
vec2 rotate_uv = vec2(
  cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
  cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
);
vec4 mapTexel = texture2D( map, rotate_uv );
diffuseColor *= mapTexelToLinear( mapTexel );