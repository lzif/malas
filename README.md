# Malas CLI

**Malas** adalah tools CLI buat orang malas (atau yang pengen lebih efisien). Dibantu AI, lo bisa generate kode, jalanin command, dan bikin file cuma dengan perintah pakai bahasa sehari-hari. Support berbagai bahasa pemrograman kayak Node.js, Svelte, Python, dan lain-lain, sesuai kebutuhan lo.

## Fitur

- **Bantuan AI**: Bikin kode dan run command pakai bahasa natural, nggak ribet.
- **Multi-Language Support**: Support banyak bahasa pemrograman (Node.js, Python, Svelte, dll.).
- **Konfigurasi Otomatis**: Kalau config-nya belum ada, Malas bakal bikin otomatis di `~/.malas-bikin-config.json`.
- **Command dan File Dinamis**: Lo bisa request command, file, atau kode apa aja sesuai keinginan.
- **Integrasi AI untuk Kode**: Dengan command seperti `bikin`, `rapiin`, `jelasin`, `test`, dan `bikin-docs`, lo bisa langsung mendapatkan kode, penjelasan, dan dokumentasi dari AI.

## Instalasi

```bash
npm install -g malas
```

## Cara Pakai

### Setup Awal

Pas pertama kali jalanin **Malas**, lo bakal diminta masukin **Gemini API key** buat konfigurasi awal. Kalau file config belum ada, Malas bakal otomatis bikin.

```bash
$ malas
Halo orang malas!?
Config filenya gk ada njirr. Gw bakal nyimpen confignya disini > ~/.malas-bikin-config.json
Beri gw Gemini API Key > apikey:********************************************************
```

Setelah itu, **"Malas"** nyimpen config di path yang udah disebut.

### Command yang Tersedia

Lo bisa minta **"Malas"** untuk menjalankan command berikut ini:

- **`bikin`**: Bikin kode atau komponen baru berdasarkan deskripsi yang diberikan. Misalnya:

  ```bash
  ❯ malas bikin "komponen svelte untuk login page dengan tailwind"
  ```

- **`rapiin`**: Refactor kode yang ada agar lebih bersih dan efisien. Contohnya:

  ```bash
  ❯ malas rapiin "./src/index.ts"
  ```

- **`jelasin`**: Berikan penjelasan singkat tentang kode atau fungsi tertentu. Misalnya:

  ```bash
  ❯ malas jelasin "fungsi untuk menghitung luas segitiga"
  ```

- **`test`**: Generate unit test untuk kode yang ada. Contohnya:

  ```bash
  ❯ malas test "./src/lib/module.js"
  ```

- **`bikin-docs`**: Buat dokumentasi untuk fungsi atau modul yang dimaksud. Misalnya:

  ```bash
  ❯ malas bikin-docs "fungsi menghitung fibonacci"
  ```

Setiap command di atas akan memicu **"Malas"** untuk memikirkan dan menghasilkan output yang sesuai dengan permintaan kamu.

### Konfigurasi Global

File config global lo ada di `~/.malas-bikin-config.json`. Di sini lo bisa atur API key, editor, shell default, dan lain-lain.

Contoh config:

```json
{
  "apiKey": "apikey-lo-disini"
}
```

### Build Project

Untuk build project, cukup jalanin:

```bash
npm run build
```

### Testing

Malas include testing pake `Vitest`. Buat jalanin test:

```bash
npm run test
```

## Kontribusi

Mau bantuin nambah fitur atau nemu bug? Silakan buka issue atau kirim pull request. Semua kontribusi diterima!

## Lisensi

Project ini dilisensi di bawah MIT License. Lihat file [LICENSE](LICENSE) buat info lebih lengkap.
