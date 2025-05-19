const API_KEY = "AIzaSyAtKk1z7q-q4EVdp_UCVb1QvzrHeQiSM_0";
async function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          src,
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = reject;
      img.src = src;
      //console.log("loading ", img.src);
    });
  }

async function imagesLoad(imageList) {
    return Promise.all(imageList.map(src => loadImage(`assets/images/${src}10X.jpg`))); // or whatever path
}

async function loadImageDrive(src) {
  const fileId = src.match(/[-\w]{25,}/)[0];
  const url = `https://drive.google.com/uc?export=view&id=${fileId}`;
  console.log("fetching image from fucking public viewable google drie, dumbass bitchass google will block it ", url);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // optional, allows canvas usage
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}


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

function substituteChars() {
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
  
export {substituteChars, loadImage, imagesLoad, loadImageDrive};