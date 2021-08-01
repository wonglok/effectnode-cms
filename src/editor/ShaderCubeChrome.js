import {
  WebGLCubeRenderTarget,
  Scene,
  Mesh,
  ShaderMaterial,
  CubeRefractionMapping,
  BackSide,
  NoBlending,
  BoxBufferGeometry,
  CubeCamera,
  LinearMipmapLinearFilter,
  RGBFormat,
  LinearFilter,
  CubeReflectionMapping,
  sRGBEncoding
} from 'three'

// import { cloneUniforms } from "three/src/renderers/shaders/UniformsUtils.js";
// import * as dat from '';

class CustomWebGLCubeRenderTarget {
  constructor(width, options, renderer) {
    this.width = width
    this.options = options
    this.renderer = renderer
    var scene = new Scene()

    var shader = {
      uniforms: {
        time: { value: 0.5 }
      },

      vertexShader: `
        varying vec3 vWorldDirection;
        vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
          return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
        }
        void main() {
          vWorldDirection = transformDirection( position, modelMatrix );
          #include <begin_vertex>
          #include <project_vertex>
        }
      `,

      fragmentShader: `
      varying vec3 vWorldDirection;


        #define RECIPROCAL_PI 0.31830988618
        #define RECIPROCAL_PI2 0.15915494

        uniform float time;
        const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

        float noise( in vec2 p ) {
          return sin(p.x)*sin(p.y);
        }

        float fbm4( vec2 p ) {
            float f = 0.0;
            f += 0.5000 * noise( p ); p = m * p * 2.02;
            f += 0.2500 * noise( p ); p = m * p * 2.03;
            f += 0.1250 * noise( p ); p = m * p * 2.01;
            f += 0.0625 * noise( p );
            return f / 0.9375;
        }

        float fbm6( vec2 p ) {
            float f = 0.0;
            f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
            f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
            f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
            f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
            f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
            f += 0.015625*(0.5 + 0.5 * noise( p ));
            return f/0.96875;
        }

        float pattern (vec2 p) {
          float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
          return abs(vout);
        }


        void main() {

          vec3 direction = normalize( vWorldDirection );
          vec2 sampleUV;
          sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
          sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;

          gl_FragColor = vec4(vec3(
            0.35 + pattern(sampleUV * 1.70123 + -0.17 * cos(time * 0.05)),
            0.35 + pattern(sampleUV * 1.70123 +  0.0 * cos(time * 0.05)),
            0.35 + pattern(sampleUV * 1.70123 +  0.17 * cos(time * 0.05))
          ), 1.0);

        }
      `
    }

    var material = new ShaderMaterial({
      type: 'CubemapFromEquirect',
      uniforms: shader.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: BackSide,
      blending: NoBlending
    })

    var mesh = new Mesh(new BoxBufferGeometry(5, 5, 5), material)
    scene.add(mesh)

    var cubeRtt = new WebGLCubeRenderTarget(this.width, this.options)
    let texture = cubeRtt.texture
    cubeRtt.texture.type = texture.type
    cubeRtt.texture.format = texture.format
    cubeRtt.texture.encoding = texture.encoding

    this.texture = cubeRtt.texture

    var camera = new CubeCamera(1, 100000, cubeRtt)

    camera.update(this.renderer, scene)

    this.compute = () => {
      shader.uniforms.time.value += 1 / 60
      camera.update(this.renderer, scene)
    }
  }
}

export class ShaderCubeChrome {
  constructor({ renderer, res = 128 }) {
    this.renderer = renderer
    this.resX = res

    this.customTarget = new CustomWebGLCubeRenderTarget(
      this.resX,
      {
        format: RGBFormat,
        generateMipmaps: true,
        magFilter: LinearFilter,
        minFilter: LinearMipmapLinearFilter
      },
      renderer
    )

    this.customTarget.texture.mapping = CubeRefractionMapping
    this.customTarget.texture.mapping = CubeReflectionMapping
    this.customTarget.texture.encoding = sRGBEncoding

    // this.customTarget.texture.mapping = CubeRefractionMapping

    this.compute = () => {
      this.customTarget.compute()
    }

    this.out = {
      envMap: this.customTarget.texture
    }
  }
}
