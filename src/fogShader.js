export const VS=`#version 300 es
  void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0,1);}`;
export const FS=`#version 300 es
  precision highp float;
  uniform vec2 R;uniform float T,S,K;out vec4 O;
  float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){float a=.5,s=0.;mat2 m=mat2(1.6,1.2,-1.2,1.6);p=mat2(.8,.6,-.6,.8)*p+5.3;for(int i=0;i<5;i++){s+=a*n(p);p=m*p;a*=.5;}return s;}
  void main(){
    vec2 uv=gl_FragCoord.xy/R;uv.y=1.-uv.y;
    float asp=R.x/R.y;vec2 p=vec2(uv.x*asp,uv.y);
    float t=T*.05;
    vec2 w=vec2(fbm(p*1.3+vec2(t,-t*.6)),fbm(p*1.3+vec2(-t*.8,t)+7.));
    float d=fbm(p*1.9+w*1.7+vec2(t*1.6,-t*1.1+S*.5));
    float e=fbm(p*.9-w+vec2(-t,t*.5)+3.);
    float low=smoothstep(.70,1.04,uv.y+(d-.5)*.34);
    float side=smoothstep(.2,.0,uv.x+(e-.5)*.28)+smoothstep(.8,1.,uv.x+(e-.5)*.28);
    side*=smoothstep(.25,.6,uv.y)*.2;
    float wisps=smoothstep(.5,.78,d)*smoothstep(.22,.5,uv.y)*smoothstep(.86,.6,uv.y)*.18;
    float rest=clamp(low+side+wisps,0.,1.);
    float front=1.02-S*.68;
    float rise=smoothstep(front-.02,front+.26,uv.y+(d-.5)*.5);
    float haze=S*(.3+.46*d);
    float a=clamp(max(rest,max(rise*.97,haze)),0.,1.);
    vec3 dayA=vec3(.99,.84,.62),dayB=vec3(.84,.64,.46);
    vec3 nitA=vec3(.40,.45,.57),nitB=vec3(.15,.19,.29);
    vec3 c=mix(mix(dayB,dayA,d*1.15),mix(nitB,nitA,d*1.1),K);
    vec2 q=(uv-vec2(.41,.70))*vec2(1.7,2.6);
    c=mix(c,vec3(.86,.55,.27),K*exp(-dot(q,q)*3.2)*.42*(1.-S));
    O=vec4(c*a,a);
  }`;
