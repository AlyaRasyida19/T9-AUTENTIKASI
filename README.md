# Tugas 9 - Autentikasi & Otorisasi

- **Nama:** Alya Rasyida Putri
- **NIM:** F1D02410002
- **Kasus ETS:** Books API (REST API untuk Sistem Pengelolaan Buku dan Peminjaman)

## Cara Menjalankan

### 1. Persiapan

Pastikan perangkat sudah memiliki:

- Node.js
- MySQL/MariaDB
- Laragon atau aplikasi server database lainnya
- Visual Studio Code

### 2. Clone Repository

Clone repository Tugas 9, kemudian masuk ke folder proyek:

```bash
git clone https://github.com/USERNAME/T9-AUTENTIKASI.git
cd T9-AUTENTIKASI
```

Ganti `USERNAME` dengan username GitHub pemilik repository.

### 3. Install Dependencies

```bash
npm install
```

### 4. Konfigurasi Environment

Buat file `.env` di folder utama proyek, kemudian isi:

```env
DATABASE_URL="mysql://root@localhost:3306/books_api"
PORT=3000
JWT_SECRET="ISI_DENGAN_SECRET_RANDOM_MILIK_SENDIRI"
```

Sesuaikan konfigurasi database dengan pengaturan MySQL/MariaDB yang digunakan.

Jangan mengunggah file `.env` ke repository GitHub. Gunakan `.env.example` sebagai contoh konfigurasi tanpa secret asli.

### 5. Membuat Tabel Users

Jalankan migrasi Prisma untuk membuat tabel `users`:

```bash
npx prisma migrate dev
```

Kemudian generate Prisma Client:

```bash
npx prisma generate
```

**Catatan:** Database `books_api` menggunakan tabel dari proyek ETS yang tetap dipertahankan. Pada Tugas 9 ditambahkan tabel `users` tanpa menghapus tabel dan data sebelumnya.

### 6. Menjalankan Server

```bash
npm run dev
```

Jika berhasil, server berjalan pada:

```text
http://localhost:3000
```

---

## Akun Uji

Akun berikut dibuat melalui endpoint `POST /auth/register` dan digunakan untuk pengujian login serta autentikasi.

Email : `alya.tif20@example.com` 
 Password : Dibuat saat proses register 

Password disimpan di database dalam bentuk hash menggunakan bcrypt, bukan dalam bentuk teks asli.

---

## Struktur Proyek

```text
T9-AUTENTIKASI/
│
├── prisma/
│   ├── migrations/
│   │   └── ..._tambah_user/
│   │       └── migration.sql
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   └── loan.controller.js
│   │
│   ├── data/
│   │   ├── auth.data.js
│   │   ├── book.data.js
│   │   └── loan.data.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── validate.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── book.routes.js
│   │   └── loan.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── book.service.js
│   │   └── loan.service.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── book.validator.js
│   │   └── loan.validator.js
│   │
│   ├── prisma.js
│   └── server.js
│
├── generated/
│   └── prisma/
│
├── screenshot/
│   └── file screenshot pengujian
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── prisma7.config.ts
├── requests.http
└── README.md
```

### Keterangan File

- `prisma/schema.prisma`: Mendefinisikan model database, termasuk model User.
- `prisma/migrations/`: Menyimpan riwayat perubahan struktur database untuk penambahan tabel users.
- `src/data/auth.data.js`: Mengelola operasi database pengguna, seperti mencari dan membuat user.
- `src/services/auth.service.js`: Mengelola proses register, hash password, login, dan pembuatan JWT.
- `src/controllers/auth.controller.js`: Mengatur request dan response untuk autentikasi.
- `src/validators/auth.validator.js`: Memvalidasi email dan password menggunakan Joi.
- `src/routes/auth.routes.js`: Mendefinisikan endpoint register, login, dan profil pengguna.
- `src/middleware/auth.js`: Memeriksa token JWT pada endpoint yang membutuhkan login.
- `src/middleware/validate.js`: Menjalankan validasi request menggunakan schema Joi.
- `src/middleware/errorHandler.js`: Menangani error aplikasi secara terpusat.
- `src/routes/book.routes.js`: Mendefinisikan endpoint pengelolaan buku.
- `src/routes/loan.routes.js`: Mendefinisikan endpoint peminjaman buku.
- `src/server.js`: Menginisialisasi Express dan memasang middleware serta routes.
- `src/prisma.js`: Mengatur koneksi Prisma Client ke database MariaDB.
- `requests.http`: Berisi kumpulan request untuk menguji endpoint API.
- `.env.example`: Contoh konfigurasi environment tanpa menyimpan secret asli.

**Keterangan:** File autentikasi seperti `auth.data.js`, `auth.service.js`, `auth.controller.js`, `auth.validator.js`, `auth.routes.js`, dan `auth.js` merupakan bagian yang ditambahkan untuk Tugas 9. File ETS lainnya dipertahankan dan disesuaikan untuk menerapkan pembatasan akses.

---

## Endpoint

### 1. Autentikasi

- `POST /auth/register`: Mendaftarkan akun baru. Akses: Publik. Status: `201`, `409`, `422`.
- `POST /auth/login`: Melakukan login dan mendapatkan token JWT. Akses: Publik. Status: `200`, `401`, `422`.
- `GET /auth/saya`: Mendapatkan informasi pengguna yang sedang login. Akses: Wajib login. Status: `200`, `401`.

### 2. Pengelolaan Buku

- `GET /books`: Menampilkan daftar buku. Akses: Publik. Status: `200`.
- `GET /books/:id`: Menampilkan detail buku berdasarkan ID. Akses: Publik. Status: `200`, `404`.
- `POST /books`: Menambahkan buku baru. Akses: Wajib login. Status: `201`, `401`.
- `PUT /books/:id`: Memperbarui data buku berdasarkan ID. Akses: Wajib login. Status: `200`, `401`.
- `DELETE /books/:id`: Menghapus buku berdasarkan ID. Akses: Wajib login. Status: `204`, `401`.

### 3. Peminjaman Buku

- `GET /loans`: Menampilkan daftar peminjaman buku. Akses: Publik. Status: `200`.
- `POST /loans`: Menambahkan data peminjaman buku. Akses: Wajib login. Status: `201`, `401`.

### Keterangan

- Endpoint publik dapat diakses tanpa token.
- Endpoint wajib login memerlukan token JWT yang valid melalui header `Authorization: Bearer <token>`.
- `401` menunjukkan pengguna belum memberikan token atau token tidak valid.
- `409` menunjukkan data yang dimasukkan mengalami konflik, misalnya email sudah terdaftar.
- `422` menunjukkan data yang dikirim tidak memenuhi aturan validasi.
- `201` menunjukkan data berhasil dibuat.
- `204` menunjukkan data berhasil dihapus tanpa mengembalikan isi response.

---

## Pengujian

Pengujian dilakukan menggunakan file `requests.http` pada Visual Studio Code. Berikut dokumentasi hasil pengujian:

### 1. Pengujian Autentikasi

- [Register Berhasil](screenshot/01-register-berhasil.png): Register akun baru berhasil dengan status `201`.
- [Register Email Duplikat](screenshot/02-register-email-duplikat.png): Register menggunakan email yang sudah terdaftar menghasilkan status `409`.
- [Login Berhasil](screenshot/03-login-berhasil.png): Login berhasil dan menghasilkan token JWT.
- [Profil Tanpa Token](screenshot/04-profil-tanpa-token.png): Mengakses profil tanpa token ditolak dengan status `401`.
- [Profil Dengan Token](screenshot/05-profil-dengan-token.png): Mengakses profil dengan token valid berhasil.
- [Tabel Users Password Hash](screenshot/08-tabel-users-password-hash.png): Menampilkan tabel users dengan password yang sudah di-hash menggunakan bcrypt.
- [Token Palsu](screenshot/11-token-palsu.png): Token yang payload-nya dimanipulasi ditolak oleh server.
- [Token Kedaluwarsa](screenshot/12-token-kadaluarsa.png): Token yang sudah melewati masa berlaku ditolak oleh server.
- [Validasi Register](screenshot/15-validasi-register-422.png): Mengirim data register yang tidak sesuai aturan validasi menghasilkan status `422`.

### 2. Pengujian Pengelolaan Buku

- [Tambah Buku Tanpa Token](screenshot/06-tambah-buku-tanpa-token.png): Menambahkan buku tanpa token ditolak.
- [Tambah Buku Dengan Token](screenshot/07-tambah-buku-dengan-token.png): Menambahkan buku menggunakan token berhasil.
- [Ubah Buku Dengan Token](screenshot/13-ubah-buku-dengan-token.png): Mengubah data buku menggunakan token berhasil.
- [Hapus Buku Dengan Token](screenshot/14-hapus-buku-dengan-token.png): Menghapus data buku menggunakan token berhasil.

### 3. Pengujian Peminjaman Buku

- [Peminjaman Tanpa Token](screenshot/09-peminjaman-tanpa-token.png): Menambahkan peminjaman tanpa token ditolak.
- [Peminjaman Dengan Token](screenshot/10-peminjaman-dengan-token.png): Menambahkan peminjaman menggunakan token berhasil.

---

## Dua Percobaan

### Percobaan 1 — Manipulasi Payload JWT

Pada percobaan pertama, token JWT yang diperoleh dari proses login dimanipulasi dengan mengubah bagian payload, sedangkan bagian header dan signature tetap menggunakan nilai token asli.

Payload diubah agar nilai `id` menjadi `999`. Setelah token yang dimanipulasi dikirim ke endpoint `GET /auth/saya`, server memberikan respons `401 Unauthorized` dengan kode `TOKEN_TIDAK_VALID`.

Hal ini terjadi karena perubahan payload menyebabkan tanda tangan token tidak lagi sesuai. Server menggunakan `jwt.verify()` untuk memeriksa keabsahan tanda tangan token, sehingga token yang dimanipulasi tidak diterima.

**Screenshot:** `11-token-palsu.png`

### Percobaan 2 — Token Kedaluwarsa

Pada percobaan kedua, masa berlaku token JWT sementara diubah dari `2h` menjadi `5s` pada proses pembuatan token.

Setelah melakukan login dan mendapatkan token baru, pengujian dilakukan dengan menunggu lebih dari 5 detik. Token kemudian digunakan untuk mengakses endpoint `GET /auth/saya`.

Server memberikan respons `401 Unauthorized` dengan kode `TOKEN_TIDAK_VALID` karena token sudah melewati masa berlaku. Setelah percobaan selesai, konfigurasi masa berlaku token dikembalikan menjadi `2h`.

**Screenshot:** `12-token-kedaluwarsa.png`

---

## Deklarasi Penggunaan AI

ChatGPT digunakan sebagai alat bantu dalam proses pengerjaan proyek, terutama untuk memahami konsep dan menyusun dokumentasi.

- **Middleware `butuhLogin`**: Membantu memahami cara membaca token dari header `Authorization` dan memverifikasi JWT. Hasilnya diperiksa melalui pengujian token valid, tanpa token, token palsu, dan token kedaluwarsa.
- **Register dan Login**: Membantu memahami proses hashing password menggunakan bcrypt dan pembuatan token JWT. Hasilnya diperiksa melalui pengujian register, duplikasi email, login berhasil, dan login gagal.
- **Validasi**: Membantu memahami penggunaan Joi untuk memvalidasi email dan password. Hasilnya diperiksa dengan mengirim data yang sesuai dan tidak sesuai aturan validasi.
- **Pengujian API**: Membantu menyusun request pengujian dan memahami respons HTTP. Setiap request dijalankan dan hasilnya dicocokkan dengan respons server.
- **README**: Membantu menyusun dan merapikan dokumentasi proyek. Isinya diperiksa kembali berdasarkan struktur proyek dan hasil pengujian.

**Contoh prompt yang digunakan:**

> Jelaskan langkah demi langkah cara membuat middleware autentikasi JWT pada Express.js untuk memeriksa token Bearer dari header Authorization. Jelaskan juga cara menguji token yang tidak ada, token palsu, dan token kedaluwarsa.

**Pernyataan:**

Saya menggunakan ChatGPT sebagai alat bantu untuk memahami beberapa bagian implementasi autentikasi dan otorisasi, menyusun pengujian, serta membantu dokumentasi proyek. Saya memeriksa hasilnya dengan menjalankan kode, menguji endpoint menggunakan `requests.http`, dan melihat respons yang diberikan oleh server. Saya tetap mempelajari dan memahami fungsi setiap bagian kode yang digunakan.

---

## Kesimpulan & Kendala

### 1. Mengapa password di-hash, bukan dienkripsi?

Password di-hash karena hash merupakan proses satu arah sehingga nilai password asli tidak dapat dikembalikan secara langsung dari hasil hash. Sementara itu, enkripsi dapat dikembalikan ke bentuk semula menggunakan kunci tertentu. Dengan menggunakan bcrypt, password pengguna dapat disimpan lebih aman dan tidak terlihat dalam bentuk teks asli di database.

### 2. Mengapa pesan login gagal dibuat sama untuk email tidak terdaftar dan password salah?

Pesan login gagal dibuat sama untuk menghindari kebocoran informasi mengenai keberadaan email di dalam sistem. Jika pesan untuk email tidak terdaftar berbeda dengan password salah, pihak yang tidak berwenang dapat mencoba mengetahui email mana saja yang sudah terdaftar. Oleh karena itu, keduanya menggunakan pesan **"Email atau password salah"**.

### 3. Apa perbedaan halaman publik dan halaman wajib login, serta bagaimana server mengetahui token sah tanpa menyimpannya?

Endpoint publik dapat diakses oleh siapa saja tanpa harus melakukan login, contohnya melihat daftar buku dan daftar peminjaman. Sementara itu, endpoint wajib login hanya dapat diakses oleh pengguna yang memiliki token JWT yang valid, seperti menambahkan, mengubah, dan menghapus buku serta menambahkan peminjaman.

Server memeriksa token menggunakan `jwt.verify()` dan secret key yang disimpan pada environment variable. JWT memiliki signature yang dapat diverifikasi oleh server sehingga server bisa mengetahui apakah token masih valid dan belum kedaluwarsa tanpa harus menyimpan setiap token di database.

## Kendala dan Solusi

- **Prisma Client belum mengenali model User setelah perubahan schema**: Menjalankan kembali `npx prisma generate` dan me-restart server agar Prisma Client diperbarui.
- **Register mengalami error ketika mengakses tabel users**: Memeriksa hasil migrasi database dan memastikan tabel `users` sudah berhasil dibuat.
- **Token tidak valid ketika pertama kali digunakan**: Memastikan token disalin secara lengkap dan dikirim melalui header `Authorization` dengan format `Bearer`.
- **Mendapatkan respons 409 ketika menambahkan buku dengan ISBN yang sudah digunakan**: Menggunakan ISBN baru yang belum terdaftar di database.
- **Token kedaluwarsa dan token palsu ditolak oleh server**: Memahami bahwa `jwt.verify()` memeriksa keaslian signature dan masa berlaku token.

## Penutup
Melalui Tugas 9 ini, saya mempelajari penerapan autentikasi dan otorisasi pada REST API menggunakan Express.js, Prisma, bcrypt, dan JSON Web Token (JWT). Implementasi ini membuat endpoint API dapat dibedakan berdasarkan hak akses pengguna serta membantu menjaga keamanan data dan proses transaksi pada Books API.