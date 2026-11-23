import { useEffect, useRef } from 'react'
import { VS, FS } from '../fogShader'

// Live WebGL2 fog, rendered at <=960px wide and upscaled by CSS.
export default function Fog({ eng }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    const gl = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false })
    if (!gl) return
    const sh = (t, s) => {
      const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o)
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o))
      return o
    }
    const pr = gl.createProgram()
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS))
    gl.linkProgram(pr); gl.useProgram(pr)
    const U = {}
    for (const u of ['R', 'T', 'S', 'K']) U[u] = gl.getUniformLocation(pr, u)
    const size = () => {
      const w = Math.round(Math.min(innerWidth, 960)), h = Math.round((w * innerHeight) / innerWidth)
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h) }
    }
    size(); addEventListener('resize', size)
    let id
    const loop = (now) => {
      const S = eng.current
      gl.uniform2f(U.R, cv.width, cv.height); gl.uniform1f(U.T, now / 1000)
      gl.uniform1f(U.S, S.s); gl.uniform1f(U.K, S.k)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(id); removeEventListener('resize', size) }
  }, [eng])
  return <canvas id="fog" ref={ref} aria-hidden="true" />
}
