/* MOOD BAR / Soft-focus editorial illustration.
   The entire builder illustration is drawn with SVG, so it works offline, without WebGL. */
function drawDrinkArt(config) {
  const b={size:'M',ice:'normal',garnish:'none',flavor:'fruity',sweetness:'balanced',base:'gin',...config};
  const palettes={
    fruity:{top:'#ff90ba',mid:'#f7478b',bottom:'#bf145e',edge:'#bf2a6b',ambient:'#ffd4dd',bubble:'#ffb9d0',label:'#922d56'},
    spicy:{top:'#ffe08a',mid:'#ff9a36',bottom:'#ee572f',edge:'#ff8637',ambient:'#fff0c7',bubble:'#ffd48c',label:'#9b4d23'},
    smoky:{top:'#d987ae',mid:'#a73a73',bottom:'#632753',edge:'#9d3b6b',ambient:'#f6d6e4',bubble:'#eb9ebb',label:'#622b4d'},
    velvety:{top:'#ffedba',mid:'#ffd386',bottom:'#d79648',edge:'#f3c477',ambient:'#fff1d2',bubble:'#ffeccc',label:'#8b5a31'},
    fresh:{top:'#e8f9ab',mid:'#b5d84e',bottom:'#70a43e',edge:'#a7d55a',ambient:'#eff9d2',bubble:'#e2f6b8',label:'#4f713b'}
  };
  const p=palettes[b.flavor]||palettes.fruity;
  const glassPaths={
    S:{clip:'M105 195 Q120 297 278 338 Q436 297 451 195 Z',outline:'M105 195 Q120 297 278 338 Q436 297 451 195',liquid:'M110 222 Q278 250 446 222 Q424 299 278 334 Q132 299 110 222Z',rim:195,rimX:278,rimRX:173, bottom:338, shape:'coupe'},
    M:{clip:'M153 162 L180 507 Q278 530 376 507 L403 162Z',outline:'M153 162 L180 507 Q278 530 376 507 L403 162',liquid:'M157 215 Q278 237 399 215 L376 507 Q278 529 180 507Z',rim:162,rimX:278,rimRX:125,bottom:507,shape:'rocks'},
    L:{clip:'M178 104 L201 520 Q278 543 355 520 L378 104Z',outline:'M178 104 L201 520 Q278 543 355 520 L378 104',liquid:'M182 185 Q278 206 374 185 L355 520 Q278 542 201 520Z',rim:104,rimX:278,rimRX:100,bottom:520,shape:'collins'}
  };
  const g=glassPaths[b.size]||glassPaths.M;
  const sweetColor = b.sweetness==='sweet'?'#fff4d8':b.sweetness==='dry'?'#ecfbff':'#fff9f1';
  const iceCount=b.ice==='extra'?8:b.ice==='normal'?5:0;
  const positions=b.size==='S'
   ? [[209,239,34,-17],[306,244,31,19],[270,287,28,36],[360,223,30,-8],[160,223,28,24],[237,309,25,9],[331,284,27,-22],[278,224,32,13]]
   : b.size==='M'
   ? [[211,237,43,-15],[310,252,46,17],[272,318,45,-22],[222,395,44,30],[330,438,40,-10],[243,468,37,25],[310,360,38,33],[257,267,38,-17]]
   : [[240,225,34,-18],[314,252,35,15],[280,326,35,-11],[244,390,32,21],[307,441,35,-18],[261,493,30,16],[314,350,34,22],[231,292,32,-13]];
  function cube(x,y,s,ang,i){
    const rr=s*.13;
    return `<g transform="translate(${x} ${y}) rotate(${ang})" class="art-ice art-reveal" style="animation-delay:${i*32}ms">
      <rect x="${-s/2}" y="${-s/2}" width="${s}" height="${s}" rx="${rr}" fill="url(#art-ice-fill)" stroke="#fff" stroke-opacity=".73" stroke-width="2.2"/>
      <path d="M${-s/2+4} ${-s/2+5} L${s/2-5} ${-s/2+6} L${s/2-9} ${s/2-7} L${-s/2+5} ${s/2-4}Z" fill="#fff" opacity=".20" />
      <path d="M${-s/2+2} ${-s/2+9} L${-s/2+8} ${s/2-7} M${-s/2+6} ${-s/2+4} L${s/2-7} ${-s/2+4}" stroke="#fff" stroke-opacity=".82" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="${s/4}" cy="${-s/4}" r="${Math.max(2,s*.075)}" fill="#fff" opacity=".75" />
    </g>`;
  }
  const ice=positions.slice(0,iceCount).map((pos,i)=>cube(...pos,i)).join('');
  function citrus(cx,cy,r,angle=0,green=false){
    const peel=green?'#5a9b38':'#f4a138',inside=green?'#d3f88a':'#ffd074',div=green?'#f8ffd8':'#fff1c9';
    return `<g transform="translate(${cx} ${cy}) rotate(${angle})" class="art-fruit"><circle r="${r}" fill="${peel}"/><circle r="${r*.88}" fill="#fff6d8"/><circle r="${r*.79}" fill="${inside}"/>${Array.from({length:9},(_,i)=>{const a=(i/9)*2*Math.PI;return `<path d="M0 0 L${(r*.74*Math.cos(a)).toFixed(1)} ${(r*.74*Math.sin(a)).toFixed(1)}" stroke="${div}" stroke-width="${Math.max(2,r*.055)}" />`}).join('')}<circle r="${r*.11}" fill="#fff8dc"/><ellipse cx="${-r*.25}" cy="${-r*.38}" rx="${r*.34}" ry="${r*.13}" transform="rotate(-24)" fill="#fff" opacity=".32"/></g>`;
  }
  function berry(cx,cy,s,angle=0){
    return `<g transform="translate(${cx} ${cy}) rotate(${angle}) scale(${s})" class="art-fruit">
       <g fill="url(#art-berry)" stroke="#742447" stroke-width=".65">${[[0,0],[8,-8],[-8,-8],[-12,2],[12,2],[0,-16],[0,12],[9,10],[-9,10],[-16,-7],[16,-7]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7.5"/>`).join('')}</g>
       <path d="M-12 -21 Q-3 -32 0 -20 Q10 -33 14 -20 Q3 -23 0 -22 Q-5 -23 -12 -21" fill="#448a45"/>
       <path d="M0 -19 L2 -30" stroke="#47804a" stroke-width="2.2" stroke-linecap="round"/>
    </g>`;
  }
  function mint(cx,cy,scale=1,angle=0){
    return `<g transform="translate(${cx} ${cy}) rotate(${angle}) scale(${scale})" class="art-fruit"><path d="M0 25 Q0 -17 0 -58" stroke="#387a42" stroke-width="3" fill="none"/>
     ${[-28,-8,14].map((y,i)=>`<path d="M0 ${y+8} C${i%2?-39:-32} ${y-24} ${i%2?-46:-39} ${y-45} 0 ${y-34} Q15 ${y-11} 0 ${y+8}" fill="${i%2?'#58a845':'#70bc56'}" stroke="#438a43" stroke-width=".8" opacity=".96"/><path d="M0 ${y+8} Q-18 ${y-19} -28 ${y-29}" stroke="#b7e2a0" stroke-width="1" opacity=".65"/>`).join('')}
    </g>`;
  }
  function chili(cx,cy,scale=1,ang=0){return `<g transform="translate(${cx} ${cy}) rotate(${ang}) scale(${scale})" class="art-fruit"><path d="M-55 -1 Q-10 -28 34 -10 Q60 -4 76 -25 Q77 18 44 16 Q-7 18 -55 7Z" fill="url(#art-chili)" stroke="#a93a3a" stroke-width="2"/><path d="M-54 0 Q-70 -19 -71 -33" fill="none" stroke="#468345" stroke-width="7" stroke-linecap="round"/><path d="M-34 -7 Q4 -21 29 -8" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="4" stroke-linecap="round"/></g>`;}
  const decorations={
    fruity: `${berry(96,227,1.08,-12)}${berry(457,332,1.28,16)}${berry(421,101,.65,-20)}`,
    spicy: `${citrus(93,330,66,-24)}${chili(456,171,.78,-18)}${citrus(450,439,33,23)}`,
    smoky: `${citrus(91,381,59,-21)}${berry(458,165,.98,12)}${berry(466,416,.7,-10)}`,
    velvety: `${citrus(101,287,57,-20)}${citrus(465,424,38,12)}${berry(465,175,.72,22)}`,
    fresh: `${citrus(94,296,65,-15,true)}${mint(457,240,1.1,22)}${citrus(432,440,35,10,true)}`
  };
  const floatingGarnish={
    none:'',
    citrus:citrus(372,b.size==='L'?122:b.size==='S'?192:155,45,17,b.flavor==='fresh'),
    berries:berry(330,b.size==='L'?155:b.size==='S'?207:175,.93,-9),
    mint:mint(351,b.size==='L'?131:b.size==='S'?213:163,.86,16),
    rosemary:mint(349,b.size==='L'?137:b.size==='S'?206:159,.91,11),
    chili:chili(355,b.size==='L'?157:b.size==='S'?202:157,.52,-19)
  };
  let garnish=floatingGarnish[b.garnish]||'';
  // Matching the moodboard: soft-focus beverage artwork, luminous transparent layers,
  // close-up glass, blurred fruits and a typographic print finish, not photorealistic 3D.
  return `<svg class="mood-art-svg mood-art--${b.flavor}" viewBox="0 0 560 610" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Иллюстрация твоего коктейля: ${b.flavor}, размер ${b.size}, лёд ${b.ice}">
    <defs>
      <linearGradient id="art-drink" x1="0" y1="0" x2=".16" y2="1"><stop offset="0" stop-color="${p.top}"/><stop offset=".45" stop-color="${p.mid}"/><stop offset="1" stop-color="${p.bottom}"/></linearGradient>
      <radialGradient id="art-sideglow"><stop offset="0" stop-color="${p.bubble}" stop-opacity=".72"/><stop offset="1" stop-color="${p.bubble}" stop-opacity="0"/></radialGradient>
      <linearGradient id="art-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".11" stop-color="#fff" stop-opacity=".12"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".76" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity=".7"/></linearGradient>
      <linearGradient id="art-ice-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".66"/><stop offset=".5" stop-color="#dbf6ff" stop-opacity=".19"/><stop offset="1" stop-color="#fff" stop-opacity=".38"/></linearGradient>
      <linearGradient id="art-stem" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity=".14"/><stop offset=".32" stop-color="#fff" stop-opacity=".82"/><stop offset=".72" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity=".68"/></linearGradient>
      <radialGradient id="art-berry"><stop offset="0" stop-color="#e7679d"/><stop offset=".48" stop-color="#af366c"/><stop offset="1" stop-color="#5b1c47"/></radialGradient>
      <linearGradient id="art-chili" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff6e5e"/><stop offset=".55" stop-color="#d83441"/><stop offset="1" stop-color="#a62235"/></linearGradient>
      <radialGradient id="art-shine"><stop stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <filter id="art-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="13"/></filter>
      <filter id="art-soft-small" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
      <filter id="art-frost"><feGaussianBlur stdDeviation="1.7"/></filter>
      <filter id="art-shadow" x="-40%" y="-50%" width="180%" height="200%"><feGaussianBlur stdDeviation="13"/></filter>
      <clipPath id="art-clip"><path d="${g.clip}"/></clipPath>
    </defs>
    <!-- soft-focus editorial product-studio elements -->
    <ellipse cx="283" cy="551" rx="184" ry="26" fill="#75374e" opacity=".15" filter="url(#art-shadow)"/>
    <g class="art-floating art-floating-bg" filter="url(#art-soft)" opacity=".37" transform="translate(-17 -8)">${decorations[b.flavor]||decorations.fruity}</g>
    <ellipse cx="275" cy="294" rx="169" ry="194" fill="url(#art-sideglow)" opacity=".67" filter="url(#art-soft)"/>
    ${b.size==='S'?`<ellipse cx="278" cy="549" rx="90" ry="12" fill="url(#art-stem)" opacity=".5"/><path d="M274 339 L274 535" stroke="url(#art-stem)" stroke-width="22" stroke-linecap="round"/><path d="M279 345 L279 534" stroke="#fff" stroke-width="5" opacity=".47"/><ellipse cx="278" cy="546" rx="91" ry="11" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="4"/>`:''}
    <!-- colorful blurred swirls inside the drink -->
    <g clip-path="url(#art-clip)">
      <path d="${g.liquid}" fill="url(#art-drink)" opacity=".90"/>
      <g filter="url(#art-soft)" opacity=".6">
        <ellipse cx="214" cy="270" rx="88" ry="145" fill="${p.top}"/>
        <ellipse cx="363" cy="401" rx="98" ry="128" fill="${p.bottom}"/>
        <ellipse cx="284" cy="385" rx="104" ry="75" fill="${p.mid}" opacity=".67"/>
      </g>
      <g filter="url(#art-soft-small)" opacity=".62">
       ${b.size==='S'?'':`<ellipse cx="244" cy="244" rx="56" ry="69" fill="#fff" opacity=".2"/>`}
       <path d="M207 274 Q266 200 337 272 T374 384" fill="none" stroke="${sweetColor}" stroke-width="48" opacity=".25"/>
       <path d="M162 370 Q224 415 298 352" fill="none" stroke="${p.top}" stroke-width="33" opacity=".44"/>
      </g>
      <!-- diffuse citrus and berries visible through translucent drink -->
      ${b.flavor==='fresh'?`<g opacity=".52" filter="url(#art-soft-small)">${citrus(280,374,88,-16,true)}${citrus(244,262,54,-12,true)}</g>`:''}
      ${b.flavor==='fruity'?`<g opacity=".39" filter="url(#art-soft-small)">${berry(233,343,2.5)}${berry(340,407,2)}</g>`:''}
      ${b.flavor==='spicy'?`<g opacity=".3" filter="url(#art-soft-small)">${citrus(277,385,87,-12)}${citrus(340,278,52,10)}</g>`:''}
      ${b.flavor==='velvety'?`<g opacity=".37" filter="url(#art-soft-small)"><path d="M130 315 C195 215 345 470 420 250" fill="none" stroke="#fff5d3" stroke-width="44"/></g>`:''}
      ${ice}
      ${['velvety','smoky'].includes(b.flavor)?`<ellipse cx="278" cy="${g.rim+48}" rx="${g.rimRX-24}" ry="20" fill="#fff1db" opacity=".64" filter="url(#art-soft-small)"/>`:''}
      ${Array.from({length:b.flavor==='fresh'?14:8},(_,i)=>{const x=187+((i*41)%175), y=(g.rim+84)+((i*71)%(g.bottom-g.rim-94));return `<circle cx="${x}" cy="${y}" r="${i%3===0?4:2}" fill="#fff" opacity="${i%3===0?.31:.45}"/>`}).join('')}
    </g>
    <!-- the glass: airy contour, refracted edges and translucent highlights -->
    <path d="${g.clip}" fill="url(#art-glass)" opacity=".68"/>
    <path d="${g.outline}" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="${b.size==='S'?7:7}"/>
    <path d="${g.outline}" fill="none" stroke="${p.edge}" stroke-opacity=".19" stroke-width="11" filter="url(#art-soft-small)"/>
    <ellipse cx="${g.rimX}" cy="${g.rim}" rx="${g.rimRX}" ry="${b.size==='S'?16:12}" fill="none" stroke="#fff" stroke-opacity=".70" stroke-width="4"/>
    <ellipse cx="${g.rimX}" cy="${g.rim-3}" rx="${g.rimRX-7}" ry="${b.size==='S'?10:7}" fill="#fff" opacity=".12"/>
    ${b.size==='S'?'':`<path d="M${b.size==='M'?171:190} ${g.rim+16} L${b.size==='M'?192:212} ${g.bottom-30}" stroke="#fff" stroke-width="12" opacity=".21" stroke-linecap="round"/><path d="M${b.size==='M'?389:364} ${g.rim+16} L${b.size==='M'?366:344} ${g.bottom-30}" stroke="#fff" stroke-width="9" opacity=".21" stroke-linecap="round"/>`}
    ${b.size==='S'?'<circle cx="278" cy="341" r="16" fill="url(#art-stem)" opacity=".52"/>':''}
    <!-- Soft editorial wordmark across the drink, inspired by the typography-led references -->
    <g class="art-cup-type" text-anchor="middle" fill="#fff">
      <text x="278" y="${b.size==='S'?270:b.size==='L'?420:458}" font-family="Montserrat,Manrope,Arial,sans-serif" font-weight="800" font-size="49" letter-spacing="-3" opacity=".85">MOOD.</text>
      <text x="278" y="${b.size==='S'?289:b.size==='L'?440:477}" font-family="Manrope,Arial,sans-serif" font-weight="700" font-size="9.5" letter-spacing="3.1" opacity=".67">СОЗДАН ДЛЯ ТЕБЯ</text>
    </g>
    <!-- floating fruit should look like a poster composition, not a physics simulation -->
    <g class="art-floating art-floating-front">${decorations[b.flavor]||decorations.fruity}</g>
    <g class="art-garnish art-reveal">${garnish}</g>
    <g class="art-sparkles" fill="url(#art-shine)" opacity=".87">
      <path d="M107 147 L112 163 L128 168 L112 173 L107 189 L102 173 L86 168 L102 163Z"/>
      <path d="M457 254 L461 265 L473 269 L461 273 L457 284 L453 273 L441 269 L453 265Z"/>
      <circle cx="${b.size==='L'?154:129}" cy="476" r="5" opacity=".7"/>
      <circle cx="404" cy="88" r="3"/>
    </g>
  </svg>`;
}
