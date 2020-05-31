uniform float time;
uniform vec3 diffuse;
uniform float opacity;
varying float vType;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
  #include <clipping_planes_fragment>
  vec3 outgoingLight = vec3( 0.0 );
  vec4 diffuseColor = vec4( diffuse, opacity );
  #include <logdepthbuf_fragment>

  float w = 512.0;
  float h = 512.0;
  // Normalize sprite size (0.0-1.0)
  float dx = 1.0 / 3.0;
  float dy = 1.0 / 3.0;
  // Figure out number of tile cols of sprite sheet
  float cols = 3.0;
  // From linear index to row/col pair
  float index = floor(vType + 0.5);
  float row = floor(index / cols + 0.001);
  float col = index - (cols * row); //mod(index, cols);
  // Finally to UV texture coordinates
  mat3 spriteTransform = mat3(dx, 0.0, 0.0, 0.0, -dy, 0.0, dx*col, 1.0-row*dy, 1.0);
  //vec2 uv = vec2(dx * gl_PointCoord.x + col * dx, 1.0 - dy - row * dy + dy * gl_PointCoord.y);
  vec2 uv = ( uvTransform * spriteTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
  vec2 mid = vec2(1.0 / 3.0 * col + 1.0 / 6.0, 1.0 - 1.0 / 3.0 * row - 1.0 / 6.0);
  float rotation = time + rand(mid);
  vec2 rotate_uv = vec2(
    cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
    cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
  );
  vec4 mapTexel = texture2D( map, rotate_uv );
  diffuseColor *= mapTexelToLinear( mapTexel );
  #include <color_fragment>
  #include <alphatest_fragment>
  outgoingLight = diffuseColor.rgb;
  gl_FragColor = vec4( outgoingLight, diffuseColor.a );
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
}