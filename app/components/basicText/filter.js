export default `
<svg class="fixed inset-0 transform -translate-x-full">
      <defs>
          <filter id="n0">
              <feTurbulence type="turbulence" baseFrequency="0.001 0.1" numOctaves="5" result="NOISE"></feTurbulence>
              <feGaussianBlur in="SourceGraphic" result="BLURRED" stdDeviation="4.5"></feGaussianBlur>
              <feDisplacementMap in2="NOISE" in="BLURRED" scale="50" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
          <filter id="n1">
              <feTurbulence type="fractalNoise" baseFrequency="0.001 0.001" numOctaves="5" result="NOISE" seed="185210"></feTurbulence>
              <feGaussianBlur in="SourceGraphic" result="BLURRED" stdDeviation="0"></feGaussianBlur>
              <feDisplacementMap id="displacer" in2="NOISE" in="BLURRED" scale="15" xChannelSelector="R" yChannelSelector="R" result="DISPLACED"></feDisplacementMap>
          </filter>
          <filter id="n2" color-interpolation-filters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.001 0.001" numOctaves="5" result="NOISE" seed="185210"></feTurbulence>
              <feGaussianBlur in="SourceGraphic" result="BLURRED" stdDeviation="0"></feGaussianBlur>
              <feDisplacementMap id="displacer" in2="NOISE" in="BLURRED" scale="15" xChannelSelector="R" yChannelSelector="R" result="DISPLACED"></feDisplacementMap>

              <feColorMatrix in="DISPLACED"
                  result="RED"
                  type="matrix"
                  values="0 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 1 0" />
                          
              <feColorMatrix in="DISPLACED"
                  result="GREEN"
                  type="matrix"
                  values="1 0 0 0 0
                          0 0 0 0 0
                          0 0 1 0 0
                          0 0 0 1 0" />
              
              <feColorMatrix in="DISPLACED"
                  result="BLUE"
                  type="matrix"
                  values="1 0 0 0 0
                          0 1 0 0 0
                          0 0 0 0 0
                          0 0 0 1 0" />
                          
              <feOffset in="RED" dx="-3" dy="0" result="D_RED" />
              <feOffset in="GREEN" dx="0" dy="0" result="D_GREEN" />
              <feOffset in="BLUE" dx="3" dy="0" result="D_BLUE" />

              <feBlend in="D_RED" in2="D_BLUE" result="RB" mode="multiply"/>
              
              <feBlend in="D_GREEN" in2="RB" result="RGB" mode="multiply"/>
          </filter>
      </defs>
  </svg>`