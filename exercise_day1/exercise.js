function hitungBilanganGanjil(params) {
  let bilanganGanjil = [];
  for (let i = 1; i <= params; i++) {
    if (i % 2 !== 0) {
      bilanganGanjil.push(i);
    }
  }
  return bilanganGanjil;
}

console.log(
  `bilangan ganjil dari 1 sampai 10 adalah ${hitungBilanganGanjil(10)}`
);

function cekTahunKabisat(params) {
  return params % 4 === 0 && (params % 100 !== 0 || params % 400 === 0);
}

console.log(`tahun 2020 adalah tahun kabisat ${cekTahunKabisat(2020)}`);

function hitungFaktorial(params) {
  let faktorial = 1;
  for (let i = 1; i <= params; i++) {
    faktorial *= i;
  }
  return faktorial;
}

console.log(`faktorial dari 5 adalah ${hitungFaktorial(5)}`);

function cariBilanganPrima(params) {
  let bilanganPrima = [];
  for (let i = 2; i <= params; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      bilanganPrima.push(i);
    }
  }
  return bilanganPrima;
}

console.log(`cari bilangan prima 20 => ${cariBilanganPrima(20)}`);

function hitungJumlahDigit(params) {
  return params
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

console.log(`jumlah digit dari 12345 adalah ${hitungJumlahDigit(12345)}`);

function cekPalindrom(params) {
  return params === params.split("").reverse().join("");
}

console.log(`apakah bebek palindrom? ${cekPalindrom("bebek")}`);

function hitungPangkat(angka, pangkat) {
  return Math.pow(angka, pangkat);
}

console.log(`2^3 = ${hitungPangkat(2, 3)}`);

function deretFibonnaci(params) {
  let fibonnaci = [0, 1];
  for (let i = 2; i < params; i++) {
    fibonnaci.push(fibonnaci[i - 1] + fibonnaci[i - 2]);
  }
  return fibonnaci.slice(0, params);
}

console.log(`deret fibonnaci 8 => ${deretFibonnaci(8)}`);

function hitungJumlahKata(params) {
  return params.split(" ").length;
}

console.log(
  `jumlah kata dari "saya suka belajar" adalah ${hitungJumlahKata(
    "saya suka belajar"
  )}`
);

function cariBilanganTerbesar(params) {
  return Math.max(...params);
}

console.log(
  `bilangan terbesar dari [10, 2, 3, 4, 5] adalah ${cariBilanganTerbesar([
    10, 2, 3, 4, 5,
  ])}`
);

function hitungRataRata(params) {
  let total = params.reduce((sum, num) => sum + num, 0);
  return total / params.length;
}

console.log(
  `rata-rata dari [1, 2, 3, 4, 5] adalah ${hitungRataRata([1, 2, 3, 4, 5])}`
);

function hitungJumlahVokal(params) {
  return params
    .toLowerCase()
    .split("")
    .filter((char) => "aiueo".includes(char)).length;
}

console.log(
  `jumlah vokal dari "javascript" adalah ${hitungJumlahVokal("javascript")}`
);

function cariFaktorBilangan(params) {
  return Array.from({ length: params }, (_, i) => i + 1).filter(
    (num) => params % num === 0
  );
}

console.log(`faktor dari 12 adalah ${cariFaktorBilangan(12)}`);

function konversiSuhu(suhu, satuan) {
  if (satuan === "C") {
    return (suhu * 9) / 5 + 32; // Celcius to Fahrenheit
  } else if (satuan === "F") {
    return ((suhu - 32) * 5) / 9; // Fahrenheit to Celcius
  } else {
    return "Satuan tidak valid";
  }
}

console.log(`30 derajat Celcius ke Fahrenheit adalah ${konversiSuhu(30, "C")}`);

function hitungKarakterUnik(params) {
  let karakterUnik = new Set(params.split(""));
  return karakterUnik.size;
}

console.log(
  `jumlah karakter unik dari "hello world" adalah ${hitungKarakterUnik(
    "hello world"
  )}`
);

function hitungKemunculanKata(kalimat, kata) {
  return kalimat.split(" ").filter((word) => word === kata).length;
}

console.log(
  `jumlah kemunculan kata "saya" dalam "saya suka belajar saya" adalah ${hitungKemunculanKata(
    "saya suka belajar saya",
    "saya"
  )}`
);

function cariBilanganGanjilTerbesar(params) {
  return Math.max(...params.filter((num) => num % 2 !== 0));
}

console.log(
  `bilangan ganjil terbesar dari [1, 2, 3, 4, 5, 6] adalah ${cariBilanganGanjilTerbesar(
    [1, 2, 3, 4, 5, 6]
  )}`
);

function hitungJumlahDigitGenap(params) {
  return params
    .toString()
    .split("")
    .filter((digit) => parseInt(digit, 10) % 2 === 0).length;
}

console.log(
  `jumlah digit genap dari 123456 adalah ${hitungJumlahDigitGenap(123456)}`
);

function cekAnagram(kata1, kata2) {
  const sortedKata1 = kata1.split("").sort().join("");
  const sortedKata2 = kata2.split("").sort().join("");
  return sortedKata1 === sortedKata2;
}

console.log(
  `apakah "listen" dan "silent" adalah anagram? ${cekAnagram(
    "listen",
    "silent"
  )}`
);

function hitungHurufKapital(params) {
  return params
    .split("")
    .filter((char) => char === char.toUpperCase() && /[A-Z]/.test(char)).length;
}

console.log(
  `jumlah huruf kapital dari "Hello World" adalah ${hitungHurufKapital(
    "Hello World"
  )}`
);

function cariBilanganYangHilang(params) {
  let bilangan = Array.from({ length: params.length }, (_, i) => i + 1);
  return bilangan.filter((num) => !params.includes(num));
}

console.log(
  `bilangan yang hilang dari [1, 2, 4, 5] adalah ${cariBilanganYangHilang([
    1, 2, 4, 5,
  ])}`
);

function hitungJumlahHari(tgl1, tgl2) {
  const date1 = new Date(tgl1);
  const date2 = new Date(tgl2);
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

console.log(
  `jumlah hari antara "2023-01-01" dan "2023-01-10" adalah ${hitungJumlahHari(
    "2023-01-01",
    "2023-01-10"
  )}`
);

function hitungKataUnik(params) {
  let kataUnik = new Set(params.split(" "));
  return Array.from(kataUnik).length;
}

console.log(
  `jumlah kata unik dari "saya suka belajar saya" adalah ${hitungKataUnik(
    "saya suka belajar saya"
  )}`
);

function cariBilanganYangMunculSekali(params) {
  return params.filter(
    (num) => params.indexOf(num) === params.lastIndexOf(num)
  );
}

console.log(
  `bilangan yang muncul sekali dari [1, 2, 2, 3, 4, 4] adalah ${cariBilanganYangMunculSekali(
    [1, 2, 2, 3, 4, 4]
  )}`
);

function hitungJumlahKemunculanKarakter(params) {
  let karakterCount = {};
  for (let char of params) {
    karakterCount[char] = (karakterCount[char] || 0) + 1;
  }
  return JSON.stringify(karakterCount);
}

console.log(
  `jumlah kemunculan karakter dari "hello" adalah ${hitungJumlahKemunculanKarakter(
    "hello"
  )}`
);

function hitungJumlahKombinasi(n, r) {
  function faktorial(num) {
    return num <= 1 ? 1 : num * faktorial(num - 1);
  }
  return faktorial(n) / (faktorial(r) * faktorial(n - r));
}

console.log(
  `jumlah kombinasi dari 5 dan 2 adalah ${hitungJumlahKombinasi("Biji", 2)}`
);
