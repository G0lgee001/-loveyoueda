const ui = document.getElementById('ui');
const satirSayisi = 120;
const elemanlar = [];

for (let i = 0; i < satirSayisi; i++) {
    const row = document.createElement('div');
    row.className = 'love_horizontal';
    row.style.setProperty('--i', i);

    const span = document.createElement('span');
    span.className = 'love_word';
    span.innerText = 'I love you';

    // Kalp formülü hesabı
    const t = (i / satirSayisi) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    const baseX = x * 15.5;
    const baseY = -y * 14.5;

    // İlk açılışta kalbi merkeze yerleştiriyoruz
    row.style.transform = `translate(${baseX}px, ${baseY}px)`;

    // Merkezden dışarıya doğru patlama doğrultusu
    const uzunluk = Math.sqrt(baseX * baseX + baseY * baseY);
    const yonX = uzunluk > 0 ? (baseX / uzunluk) : 0;
    const yonY = uzunluk > 0 ? (baseY / uzunluk) : 0;

    // Patladığında süzüleceği dış koordinatlar
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

let tıklanabilir = true;
window.addEventListener('click', () => {
    if (!tıklanabilir) return;
    tıklanabilir = false;

    // Dağılma başlar (Ağır çekimde, süzülerek dışarı akıyor)
    elemanlar.forEach(item => {
        item.element.classList.add('scatter');
        item.element.style.transform = item.scatter;
    });

    // 0.20 saniye dağınık kalma süresi
    setTimeout(() => {
        // Toparlanma başlar (Ağır çekimde süzülerek kalbe geri dönüyor)
        elemanlar.forEach(item => {
            item.element.classList.remove('scatter');
            item.element.style.transform = item.base;
        });
        
        // CSS'teki 0.9s (900ms) toparlanma süresiyle senkronize kilit açma
        setTimeout(() => {
            tıklanabilir = true;
        }, 900);
    }, 200);
});
