// + tugma
document.getElementById('yashilPlus').addEventListener('click', () => {
document.getElementById('sinfModal').style.display = 'block';
});


function ochSinf(sinf) {
document.getElementById('sinfModal').style.display = 'none';
document.getElementById('modalTitle').textContent = sinf + " sinfi";


let oquvchilar = JSON.parse(localStorage.getItem('oquvchilar') || '[]');
let sinfBolalari = oquvchilar.filter(o => o.sinf === sinf);


let list = '';
if (sinfBolalari.length === 0) {
list = '<p style="text-align:center; color:#aaa;">Bu sinfda hali hech kim yoʻq</p>';
} else {
sinfBolalari.forEach(bola => {
list += `
<div onclick="yoqQil('${bola.ism}', '${bola.sinf}')" class="bola-item">
${bola.ism}
</div>`;
});
}


document.getElementById('bolalarList').innerHTML = list;
document.getElementById('bolalarModal').style.display = 'block';
}


function yoqQil(ism, sinf) {
document.getElementById('bolalarModal').style.display = 'none';


const bugun = new Date().toLocaleDateString('uz-UZ');


const card = `
<div class="card">
<div class="ism">${ism}</div>
<div class="sinf">SINF ${sinf}</div>
<div class="sana">${bugun}</div>
<button onclick="kechKeldi(this, '${ism}', '${sinf}', '${bugun}')" class="minus">−</button>
</div>`;


document.getElementById('absentContainer').innerHTML += card;


let stat = JSON.parse(localStorage.getItem('statistika') || '[]');
stat.push({ ism, sinf, sana: bugun, holat: 'yoq' });
localStorage.setItem('statistika', JSON.stringify(stat));
}


function kechKeldi(btn, ism, sinf, sana) {
btn.parentElement.remove();
let stat = JSON.parse(localStorage.getItem('statistika') || '[]');
stat = stat.map(item => {
if (item.ism === ism && item.sana === sana) item.holat = 'kech';
return item;
});
localStorage.setItem('statistika', JSON.stringify(stat));
}


window.onload = function() {
let stat = JSON.parse(localStorage.getItem('statistika') || '[]');
const bugun = new Date().toLocaleDateString('uz-UZ');


stat.filter(s => s.sana === bugun && s.holat === 'yoq').forEach(item => {
document.getElementById('absentContainer').innerHTML += `
<div class="card">
<div class="ism">${item.ism}</div>
<div class="sinf">SINF ${item.sinf}</div>
<div class="sana">${item.sana}</div>
<button onclick="kechKeldi(this, '${item.ism}', '${item.sinf}', '${item.sana}')" class="minus">−</button>
</div>`;
});
}