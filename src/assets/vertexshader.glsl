uniform float time;
uniform float size;
uniform float scale;
attribute float type;
varying float vType;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
  #include <color_vertex>
  #include <begin_vertex>
  float v0 = 1.5;
  float a = 1.5;
  float v = v0 - time * a;
  float d = 0.0;
  if (v > 0.0){
    d = (v + v0) * time * 0.5;
  }else{
    d = v0 * v0 / a * 0.5;
  }
  transformed.x = transformed.x + position.x * d;
  transformed.z = transformed.z + position.z * d;
  transformed.y = transformed.y -(0.25 + 0.4* rand(position.xy))*time;
  // if (transformed.y < -2.0) transformed.y = -2.0;
  #include <morphtarget_vertex>
  #include <project_vertex>
  gl_PointSize = size;
  #ifdef USE_SIZEATTENUATION
    bool isPerspective = isPerspectiveMatrix( projectionMatrix );
    if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
  #endif
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <worldpos_vertex>
  #include <fog_vertex>
  vType = type;
}