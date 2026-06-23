const ui = document.getElementById('ui');
const satirSayisi = 80; // Mobilde kalbin pürüzsüz görünmesi için optimize edilmiş ideal satır sayısı
const elemanlar = [];

// Ekran genişliğine göre kalbin çapını telefon ekranına tam sığacak şekilde dinamik hesaplıyoruz
const ekranGenisligi = window.innerWidth;
const isMobil = ekranGenisligi < 768;

// Telefonlar için ekranın %38'i kadar bir genişlik tanımlıyoruz (Asla taşamaz)
const r = isMobil ? ekranGenisligi * 0.38 : 230; 

for (let i = 0; i < satirSayisi; i++) {
    const row = document.createElement('div');
    row.className = 'love_horizontal';
    row.style.setProperty('--i', i);

    const span = document.createElement('span');
    span.className = 'love_word';
    span.innerText = 'I love you';

    // Matematiksel Kalp Eğrisi açısı
    const t = (i / satirSayisi) * Math.PI * 2;

    /* Standart Kalp Eğrisi Formülü (Normalize edilmiş hali) */
    const x = Math.pow(Math.sin(t), 3);
    const y = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 16;

    // Ekrana tam oturan ana koordinatlar
    const baseX = x * r;
    const baseY = -y * r * 1.1; // Kalp formunun dikeyde daha dik durması için hafif uzattık

    // Taşmayı önleyen sihirli dokunuş: Yazıları kalbin etrafındaki teğet açısına göre döndürüyoruz
    // Teğet açısı hesabı (t açısına bağlı yön)
    const dx = 3 * Math.pow(Math.sin(t), 2) * Math.cos(t);
    const dy = (-13 * Math.sin(t) + 10 * Math.sin(2*t) + 6 * Math.sin(3*t) + 4 * Math.sin(4*t)) / 16;
    let aci = Math.atan2(-dy, dx) * (180 / Math.PI);

    // Yazıların baş aşağı gelmesini engelleyen yön düzeltmesi
    if (aci > 90) aci -= 180;
    if (aci < -90) aci += 180;

    // Görseldeki o meşhur hafif -30deg estetik eğimi de üzerine ekliyoruz
    const finalAci = aci - 30;

    // İlk pozisyon (Merkez hizalı konumlandırma)
    row.style.transform = `translate(${baseX}px, ${baseY}px) rotate(${finalAci}deg)`;

    // Merkezden dışa doğru pürüzsüz süzülerek patlama yönü
    const uzunluk = Math.sqrt(baseX * baseX + baseY * baseY);
    const yonX = uzunluk > 0 ? (baseX / uzunluk) : 0;
    const yonY = uzunluk > 0 ? (baseY / uzunluk) : 0;

    // Telefon ekranına göre patlama mesafesi sınırı
    const itmeMesafesi = isMobil ? 45 + Math.random() * 25 : 80 + Math.random() * 50;
    const scatterX = baseX + yonX * itmeMesafesi;
    const scatterY = baseY + yonY * itmeMesafesi;

    row.appendChild(span);
    ui.appendChild(row);

    elemanlar.push({
        element: row,
        base: `translate(${baseX}px, ${baseY}px) rotate(${finalAci}deg)`,
        scatter: `translate(${scatterX}px, ${scatterY}px) rotate(${finalAci}deg)`
    });
}

// Akışkan patlama ve kilit yönetimi
let tıklanabilir = true;
window.addEventListener('click', () => {
    if (!tıklanabilir) return;
    tıklanabilir = false;

    // Süzülerek dışarı akma (Patlama)
    elemanlar.forEach(item => {
        item.element.classList.add('scatter');
        item.element.style.transform = item.scatter;
    });

    // 0.20 saniye dağınık durma süresi
    setTimeout(() => {
        // Süzülerek yerine oturma (Toparlanma)
        elemanlar.forEach(item => {
            item.element.classList.remove('scatter');
            item.element.style.transform = item.base;
        });
        
        // CSS'teki 0.9s (900ms) süreyle tam senkronize kilit açma
        setTimeout(() => {
            tıklanabilir = true;
        }, 900);
    }, 200);
});
