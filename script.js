// === KONFIGURASI ===
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7Oxl7b-2Ok5WSzyEeoizkRjWKIfQA3lA723ktmr0ZDbgIA7T61G9RXZQElLqNHMim/exec';
const PASSWORD_BENAR = 'tridacna2022';

// === LOGIN ===
const loginForm = document.getElementById('loginForm');
const loginCard = document.getElementById('loginCard');
const mainCard = document.getElementById('mainCard');
const loginStatus = document.getElementById('loginStatus');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const inputPass = document.getElementById('passwordInput').value.trim();

  if (inputPass === PASSWORD_BENAR) {
    loginCard.style.display = 'none';
    mainCard.style.display = 'block';
    updateTime();
  } else {
    loginStatus.textContent = '❌ Password salah, coba lagi!';
    loginStatus.className = 'status error show';
    setTimeout(() => loginStatus.classList.remove('show'), 3000);
  }
});

// === FORM DATA ===
const form = document.getElementById('dataForm');
const timestamp = document.getElementById('timestamp');
const statusEl = document.getElementById('status');

// Update waktu realtime
function updateTime() {
  const now = new Date();
  timestamp.value = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
}
setInterval(updateTime, 1000);
updateTime();

// Tampilkan status pesan
function showStatus(message, type) {
  statusEl.innerHTML = message;
  statusEl.className = `status ${type} show`;
  setTimeout(() => statusEl.classList.remove('show'), 4000);
}

// === KIRIM DATA KE GOOGLE SHEET ===
form.addEventListener('submit', e => {
  e.preventDefault();

  // Tampilkan status loading
  showStatus('<span class="loader"></span> Mengirim data...', 'loading');

  // Ambil data dari input
  const data = {
    timestamp: timestamp.value,
    nama: document.getElementById('nama').value.trim(),
    hotel: document.getElementById('hotel').value.trim(),
    kodeReferal: document.getElementById('kodevoucher').value.trim()
  };

  // Kirim ke Google Apps Script
  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // penting agar tidak diblokir browser
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    showStatus('✅ Data berhasil dikirim!', 'success');
    form.reset();
    updateTime();
  })
  .catch(() => {
    showStatus('⚠️ Terjadi kesalahan koneksi.', 'error');
  });
});
