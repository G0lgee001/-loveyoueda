const ui = document.getElementById('ui');
const satirSayisi = 120; // Kalbin o orijinal yoğun görüntüsü
const elemanlar = [];

// Sihirli Ekran Sığdırma Ayarı:
// Kalbin orijinal boyutlarını bozmadan, ekran daraldıkça tüm sahneyi otomatik uzaklaştırır.
function ekraniKoru() {
    const ekranGenisligi = window.innerWidth;
    if (ekranGenisligi < 768) {
        // Telefonlardaki dar ekrana göre sahneyi otomatik ufaltır (Orijinal oranlar kalır)
        const zoom = ekranGenisligi / 550;
        ui.style.setProperty('--zoom-factor', zoom);
    } else {
        ui.style.setProperty('--zoom-factor', '1');
    }
}
ekraniKoru();
window.addEventListener('resize', ekraniKoru);

for (let i = 0; i < satirSayisi; i++) {
    const row = document.createElement('div');
    row.className = 'love_horizontal';
    row.style.setProperty('--i', i);

    const span = document.createElement('span');
    span.className = 'love_word';
    span.innerText = 'I love you';

    // Görseldeki orijinal matematiksel kalıbı sağlayan kalp formülü
    const t = (i / satirSayisi) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    // Orijinal görkemli boyut çarpanları (Değişmedi)
    const baseX = x * 15.5;
    const baseY = -y * 14.5;

    // İlk açılış konumu
    row.style.transform = `translate(${baseX}px, ${baseY}px)`;

    // Merkezden dışa doğru patlama yönü
    const uzunluk = Math.sqrt(baseX * baseX + baseY * baseY);
    const yonX = uzunluk > 0 ? (baseX / uzunluk) : 0;
    const yonY = uzunluk > 0 ? (baseY / uzunluk) : 0;

    // Harika patlama mesafesi
    const itmeMesafesi = 80 + Math.random() * 60;
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

// Akışkan patlama etkileşimi
let tıklanabilir = true;
window.addEventListener('click', () => {
    if (!tıklanabilir) return;
    tıklanabilir = false;

    // Süzülerek dışarı akma (Patlama)
    elemanlar.forEach(item => {
        item.element.classList.add('scatter');
        item.element.style.transform = item.scatter;
    });

    // 0.20 saniye dağınık kalma süresi
    setTimeout(() => {
        // Süzülerek yerine oturma (Toparlanma)
        elemanlar.forEach(item => {
            item.element.classList.remove('scatter');
            item.element.style.transform = item.base;
        });
        
        // Kilit açma senkronizasyonu
        setTimeout(() => {
            tıklanabilir = true;
        }, 900);
    }, 200);
});
