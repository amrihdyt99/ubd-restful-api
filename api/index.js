const express = require('express');
const app = express();

// Middleware agar API dapat menerima data berbasis JSON
app.use(express.json());

// Mock Data Sederhana (Data Mahasiswa)
let mahasiswaData = [
    { nim: "22110001", nama: "Muhammad Amri Hidayat", prodi: "Teknik Informatika", status: "Aktif" },
    { nim: "22110002", nama: "Siti Rahma", prodi: "Sistem Informasi", status: "Aktif" }
];

// 1. Endpoint Root (Mengecek status server API)
app.get('/', (req, res) => {
    res.json({
        message: "Selamat Datang di RESTful API Cloud UBD 2026",
        status: "Online",
        developer: "Muhammad Amri Hidayat"
    });
});

// 2. Endpoint GET (Mengambil seluruh data mahasiswa)
app.get('/api/mahasiswa', (req, res) => {
    res.status(200).json({
        total: mahasiswaData.length,
        data: mahasiswaData
    });
});

// 3. Endpoint POST (Menambahkan data mahasiswa baru ke memori)
app.post('/api/mahasiswa', (req, res) => {
    const { nim, nama, prodi, status } = req.body;
    
    if (!nim || !nama) {
        return res.status(400).json({ error: "NIM dan Nama tidak boleh kosong!" });
    }

    const mhsBaru = { nim, nama, prodi, status: status || "Aktif" };
    mahasiswaData.push(mhsBaru);

    res.status(201).json({
        message: "Data mahasiswa berhasil ditambahkan!",
        data: mhsBaru
    });
});

// Penyelaras port standar untuk memastikan serverless function mendengarkan request
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

// Ekspor aplikasi agar bisa dikenali oleh Vercel handler
module.exports = app;
