const ui = document.getElementById('ui');
const satirSayisi = 120;
const elemanlar = [];

// Telefon ve masaüstü ekran genişliğine göre kalbin boyutunu dinamik ayarlıyoruz
const ekranGenisligi = window.innerWidth;
const isMobil = ekranGenisligi < 768;

// Mobilde kalbi daraltıp ekrana sığdırıyoruz, masaüstünde büyük bırakıyoruz
const carpanX = isMobil ? ekranGenisligi * 0.024 : 15.5;
const carpanY = isMobil ? ekranGenisligi * 0.022 : 14.5;
const maxItmeMesafesi = isMobil ? 40 : 80; // Mobilde çok uzağa patlayıp ekrandan çıkmasınlar diye

for (let i = 0; i < satirSayisi; i++) {
    const row = document.createElement('div');
    row.className = 'love_horizontal';
    row.style.setProperty('--i', i);

    const span = document.createElement('span');
    span.className = 'love_word';
    span.innerText = 'I love you';

    const t = (i / satirSayisi) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    // Dinamik çarpanlarla hesaplanan tam uyumlu koordinatlar
    const baseX = x * carpanX;
    const baseY = -y * carpanY;

    row.style.transform = `translate(${baseX}px, ${baseY}px)`;

    // Merkezden dışarı doğru yön hesabı
    const uzunluk = Math.sqrt(baseX * baseX + baseY * baseY);
    const yonX = uzunluk > 0 ? (baseX / uzunluk) : 0;
    const yonY = uzunluk > 0 ? (baseY / uzunluk) : 0;

    // Patlama mesafesi sınırlandırıldı
    const itmeMesafesi = maxItmeMesafesi + Math.random() * (maxItmeMesafesi * 0.6);
    const scatterX = baseX + yonX * itmeMesafesi;
    const scatterY = baseY + yonY * itmeMesafesi;

    row.appendChild(span);
    ui.appendChild(row);

    elemanlar.push({
        element: row,
        base: `translate(${baseX}px, ${baseY}px)`,
        scatter: `translate(${scatterX}px, ${scatterY}px)`
    });
}

// Hem dokunma hem tıklama için tek bir etkileşim yönetimi
let tıklanabilir = true;
const patlatmaFonksiyonu = (e) => {
    if (!tıklanabilir) return;
    tıklanabilir = false;

    elemanlar.forEach(item => {
        item.element.classList.add('scatter');
        item.element.style.transform = item.scatter;
    });

    setTimeout(() => {
        elemanlar.forEach(item => {
            item.element.classList.remove('scatter');
            item.element.style.transform = item.base;
        });
        
        setTimeout(() => {
            tıklanabilir = true;
        }, 900);
    }, 200);
};

// Mobil ve masaüstü tıklama tetikleyicileri
window.addEventListener('click', patlatmaFonksiyonu);
