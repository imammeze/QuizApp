# QuizMaster - Aplikasi Kuis Interaktif

QuizMaster adalah aplikasi kuis interaktif yang dibangun menggunakan React. Aplikasi ini memungkinkan pengguna untuk mengikuti kuis dengan soal-soal dari berbagai kategori yang diambil dari API eksternal.

## 🚀 Fitur Utama

### ✅ Fitur yang Telah Diimplementasi

- **🔐 Sistem Login**: Autentikasi pengguna dengan username dan password
- **📚 Soal dari API Eksternal**: Mengambil soal dari [Open Trivia Database](https://opentdb.com/)
- **⏱️ Timer Kuis**: Timer countdown dengan durasi 5 menit
- **📊 Tracking Progress**: Menampilkan total soal dan jumlah soal yang telah dijawab
- **🎯 Satu Soal per Halaman**: Interface yang fokus dengan satu soal per tampilan
- **📈 Hasil Otomatis**: Menampilkan hasil kuis ketika timer habis atau semua soal selesai
- **💾 Resume Kuis**: Fitur melanjutkan kuis setelah browser ditutup menggunakan localStorage

### 🎨 Antarmuka Pengguna

- **Responsive Design**: Tampilan yang responsif untuk desktop dan mobile
- **Loading States**: Indikator loading saat mengambil data
- **Visual Feedback**: Perubahan warna timer saat waktu hampir habis
- **Clean UI**: Desain yang bersih dan mudah digunakan

## 🛠️ Teknologi yang Digunakan

- **React** (Hooks: useState, useEffect)
- **JavaScript ES6+**
- **Tailwind CSS** untuk styling
- **Fetch API** untuk HTTP requests
- **localStorage** untuk penyimpanan data lokal

## 📦 Instalasi dan Setup

### Prasyarat

- Node.js (versi 14 atau lebih baru)
- npm atau yarn package manager

### Langkah Instalasi

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan Aplikasi**

   ```bash
   npm start
   # atau
   yarn start
   ```

4. **Akses Aplikasi**
   Buka browser dan kunjungi `http://localhost:3000`

## 🎮 Cara Penggunaan

### 1. Login

- Masukkan username dan password (dapat berupa teks apa saja)
- Klik tombol "Login" untuk masuk ke aplikasi

### 2. Memulai Kuis

- Di halaman beranda, klik "Mulai Kuis Baru"
- Aplikasi akan mengambil 10 soal multiple choice dari API
- Timer akan mulai berjalan otomatis

### 3. Menjawab Soal

- Baca pertanyaan dan pilihan jawaban yang tersedia
- Klik salah satu pilihan jawaban
- Aplikasi akan otomatis pindah ke soal berikutnya

### 4. Menyelesaikan Kuis

- Kuis akan berakhir ketika:
  - Semua soal telah dijawab, atau
  - Timer habis (5 menit)
- Hasil kuis akan ditampilkan secara otomatis

### 5. Fitur Resume

- Jika browser ditutup saat kuis berlangsung
- Login kembali untuk melanjutkan kuis dari posisi terakhir
- Data yang tersimpan: progress soal, skor, dan sisa waktu

## 📊 Informasi Kuis

### Data yang Ditampilkan

- **Progress**: Soal ke-X dari total Y soal
- **Timer**: Countdown dalam format MM:SS
- **Kategori**: Kategori soal (Science, History, dll.)
- **Tingkat Kesulitan**: Easy, Medium, atau Hard
- **Statistik**: Jumlah benar, salah, dan total dijawab

### Hasil Kuis

- Jumlah jawaban benar (warna hijau)
- Jumlah jawaban salah (warna merah)
- Total soal yang dijawab (warna biru)
- Persentase keberhasilan

## 🔧 Konfigurasi

### Mengubah Pengaturan Kuis

Anda dapat mengubah pengaturan berikut di dalam kode:

```javascript
// Durasi timer (dalam detik)
const [timer, setTimer] = useState(300); // 5 menit

// URL API untuk mengambil soal
const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
```

### Opsi API OpenTDB

API mendukung berbagai parameter:

- `amount`: Jumlah soal (1-50)
- `category`: ID kategori soal
- `difficulty`: easy, medium, hard
- `type`: multiple, boolean

Contoh URL dengan parameter:

```
https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple
```

## 📁 Struktur Proyek

```
quiz-app/
├── src/
│   ├── components/
│   │   └── QuizApp.jsx      # Komponen utama aplikasi
│   ├── App.js               # Entry point aplikasi
│   └── index.js             # Root file
├── public/
│   └── index.html
├── package.json
└── README.md
```

## 🔄 State Management

Aplikasi menggunakan React Hooks untuk mengelola state:

- `screen`: Mengatur tampilan saat ini (login, home, quiz, results)
- `user`: Data pengguna yang login
- `quizData`: Array soal-soal kuis
- `currentQuestion`: Index soal yang sedang aktif
- `score`: Jumlah jawaban benar
- `answered`: Jumlah soal yang telah dijawab
- `timer`: Sisa waktu dalam detik
- `isTimerRunning`: Status timer aktif/tidak

## 💾 Local Storage

Data yang disimpan di localStorage:

- `user`: Informasi pengguna yang login
- `quizState`: State kuis untuk fitur resume

## 🚀 Pengembangan Lebih Lanjut

### Fitur yang Dapat Ditambahkan

1. **Kategori Kustom**: Pemilihan kategori soal
2. **Tingkat Kesulitan**: Pemilihan level kesulitan
3. **Leaderboard**: Sistem peringkat skor
4. **Riwayat Kuis**: Menyimpan riwayat kuis sebelumnya
5. **Multi-bahasa**: Dukungan bahasa Indonesia
6. **Tema**: Mode gelap/terang
7. **Sound Effects**: Efek suara untuk interaksi
8. **Animasi**: Transisi antar soal yang smooth

### Peningkatan Teknis

1. **Error Handling**: Penanganan error yang lebih robust
2. **Offline Mode**: Kuis offline dengan soal tersimpan
3. **Progressive Web App**: Dukungan PWA
4. **Testing**: Unit dan integration testing
5. **Performance**: Optimasi loading dan rendering

## 🐛 Troubleshooting

### Masalah Umum

1. **API Tidak Dapat Diakses**

   - Periksa koneksi internet
   - Coba refresh halaman

2. **Kuis Tidak Dapat Diresume**

   - Pastikan localStorage tidak diblokir browser
   - Clear cache dan coba lagi

3. **Timer Tidak Berjalan**
   - Refresh halaman
   - Pastikan JavaScript diaktifkan

## 📄 Lisensi

Aplikasi ini dibuat untuk keperluan pembelajaran dan dapat digunakan secara bebas.

## 👥 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur baru
3. Commit perubahan Anda
4. Push ke branch
5. Buat Pull Request

## 📞 Kontak

Jika ada pertanyaan atau saran, silakan hubungi developer melalui:

- Email: [muhammadimam.dev@gmail.com]
- GitHub: [imammeze]

---

**QuizMaster** - Belajar sambil bermain! 🎓✨
