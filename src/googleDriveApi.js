const API_KEY = 'AIzaSyAtKk1z7q-q4EVdp_UCVb1QvzrHeQiSM_0';
const FOLDER_ID = '1CxwW-QmWohin9ZwJE2VUKNuOPSosMe1x';

var imageFiles = JSON.parse(localStorage.getItem("fileNames"));

//0 to 48 vienna
//49 to 71 bratislava
//73 to 79 vienna
//74 to 107 linx
//109 to 264
//265 to 296 vienna
//297 to 376 budapest
//377 to 383 vienna
//384 to 438 prague
//439 449 klettersteig
// 450 to 467 graz austria
// 469 to 567 stockholm
// 568 to 615 salzburg austria
// 616 to 690 werfen austria
//691 to 733 dubrovnik
//734 to 777 herceg novi
//778 to 824 croatia
//825 to 894 bosnia
//895 to 938 split croatia
//939 to 966 plitivc jerskca
//967 to 1011 zagreb
//1012 to 1032 slovenia
//1033 to 1223 venice
//1224 to 1264 sopron
//1265 to 1298 wachau river valley
//1299 to 1318 znojmo
//1319 to 1334 warsaw
//1335 to 1376 gdansk
//1377 to 1421 ceskey krumlov cesky budejovice
//1422 to 1427 rural austria
//1428 to 1470 bucharest
//1471 to 1524 brasov
//1525 to 1542 sibiu 
//1543 tto 1550 cluj napoca
//1551 to 1592 passau
//1593 to 1620 regensburg
//1621 to 1655 bavaria
//1658 to 1707 estonia
//1709 to 1728 latvia
//1729 to 1763 katowice poland
//1764 to 1793 krakow 
//1794 to 1798 vienna

const fetchAllFiles = async () => {
  let result = [];
  let pageToken = null;

  do {
    const query = encodeURIComponent(`'${FOLDER_ID}' in parents and trashed = false`);
    const fields = 'nextPageToken, files(name, id, webContentLink)';
    let url = `https://www.googleapis.com/drive/v3/files?q=${query}&key=${API_KEY}&fields=${fields}&pageSize=1000`;

    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.files && data.files.length > 0) {
      result.push(...data.files);
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  const correct = result.reduce((acc, obj) => {
    const dexy = parseInt(obj.name);
    if (Number.isInteger(dexy)) {
        acc[dexy] = { id: obj.id, webContentLink: obj.webContentLink };
    }
    return acc; //i dont understand why putting this here instead of in the loop fixes?
  }, []);
  return correct;
};

const fetchSingleFile = async (FILE_NAME) => {
    const imageID = imageFiles[FILE_NAME].id;
    const imageUrl = `https://drive.google.com/uc?export=view&id=${imageID}`;
    return imageUrl;
};

async function fetchFilesRange(start, end) {
    start = 890;
    end = 901;
    let files = [];
    for (let i = start; i < end+1; i++) {
        files.push(await fetchSingleFile(i));
    }
    console.log(files);
    return files;
}


export { fetchAllFiles, fetchSingleFile , fetchFilesRange};
