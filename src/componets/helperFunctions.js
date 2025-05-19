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

async function loadImageDrive(fileId) {
  // 1. Fetch the binary
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Drive API error ${res.status}`);
  }
  const blob = await res.blob();

  // 2. Make a blob‑URL
  const blobUrl = URL.createObjectURL(blob);

  // 3. Return a promise that resolves with {src,width,height}
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        src: blobUrl,
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = reject;
    img.src = blobUrl;
  });
}


async function imagesLoad(imageList, driveMode) {
    console.log("mapping image list ", imageList);
    return !driveMode ? Promise.all(imageList.map(src => loadImage(`assets/images/${src}10X.jpg`))) : Promise.all(imageList.map(src => loadImageDrive(src))); // or whatever path
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