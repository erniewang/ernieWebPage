const latinCry = {
    A: 'А', a: 'а',
    B: 'В', b: 'Ь',  // lowercase b doesn't have a perfect match
    C: 'С', c: 'с',
    D: 'D', d: 'ԁ',
    E: 'Е', e: 'е',
    F: 'Ғ', f: 'f',
    G: 'Ԍ', g: 'ɡ',  // no perfect Cyrillic, Latin-like Greek letter
    H: 'Н', h: 'һ',
    I: 'І', i: 'і',
    J: 'Ј', j: 'ј',
    K: 'К', k: 'к',
    L: 'Ꮮ', l: 'ⅼ',  // Armenian/Cyrillic-like Latin
    M: 'М', m: 'м',
    N: 'П', n: 'п',
    O: 'О', o: 'о',
    P: 'Р', p: 'р',
    Q: 'Ԛ', q: 'գ',
    R: 'R', r: 'г',
    S: 'Ѕ', s: 'ѕ',
    T: 'Т', t: 'т',
    U: 'Ц', u: 'u',
    V: 'Ѵ', v: 'ѵ',
    W: 'Ш', w: 'ш',
    X: 'Х', x: 'х',
    Y: 'Ү', y: 'у',
    Z: 'Ζ', z: 'ᴢ' // Greek or Latin substitute
};

export function substituteChars() {
    const data = document.querySelectorAll("p");
    data.forEach(text => {
      const original = text.textContent;
      const transformed = original
        .split('')
        .map(char => latinCry[char] || char)
        .join('');
      text.textContent = transformed;
    });
  }
  