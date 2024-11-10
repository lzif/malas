# 💻 Malas CLI 🛠️

![npm](https://img.shields.io/npm/v/malas?style=flat-square) ![npm](https://img.shields.io/npm/dt/malas?color=success&style=flat-square) ![license](https://img.shields.io/github/license/lzif/malas?style=flat-square)

**Malas** adalah tools CLI buat orang malas (atau yang pengen lebih efisien). Dibantu AI, lo bisa 🎉 generate kode, rapiin kode yang berantakan, dapetin penjelasan kode, bikin test, dan dokumentasi cuma dengan perintah pakai bahasa sehari-hari. Support berbagai bahasa pemrograman kayak Node.js, Svelte, Python, dan lain-lain, sesuai kebutuhan lo.

## 🔥 Fitur

- 🤖 **Bantuan AI**: Bikin kode, rapiin kode, dapetin penjelasan, test, dan dokumentasi pakai bahasa natural
- 🌐 **Multi-Language Support**: Support banyak bahasa pemrograman (Node.js, Python, Svelte, dll.)
- ⚙️ **Konfigurasi Otomatis**: Kalau config-nya belum ada, Malas bakal bikin otomatis di `~/.malas-bikin-config.json`
- 📂 **Generate Project**: Bikin project baru dengan struktur yang udah diatur
- 📜 **Dokumentasi Otomatis**: Generate dokumentasi untuk kode atau project lo

## ⚡ Instalasi

```bash
npm install -g malas
```

## 🚀 Cara Pakai

### ⚙️ Setup Awal

Pas pertama kali jalanin **Malas**, lo bakal diminta masukin [**Gemini API key**](https://aistudio.google.com/app/apikey) buat konfigurasi awal. Kalau file config belum ada, Malas bakal otomatis bikin.

```bash
$ malas
# Halo orang malas!? 😴
# Config filenya gk ada njirr. Gw bakal nyimpen confignya disini > ~/.malas-bikin-config.json
# Beri gw Gemini API Key > apikey:********************************************************
```

### 🧩 Command yang Tersedia

1. **`bikin`** 🎨: Generate kode baru sesuai deskripsi lo

   ```bash
   malas bikin "bikin fungsi untuk menghitung rata-rata array"
   ```

2. **`rapiin`** ✨: Beresin dan improve kode yang berantakan

   ```bash
   malas rapiin ./src/components/Button.jsx
   ```

3. **`jelasin`** 📖: Dapetin penjelasan detail tentang kode

   ```bash
   malas jelasin ./src/utils/helpers.ts
   ```

4. **`test`** 🧪: Generate unit test untuk kode lo

   ```bash
   malas test ./src/lib/calculator.js "pakai vitest"
   ```

5. **`bikin-project`** 🛠️: Generate struktur project baru

   ```bash
   malas bikin-project "todo list fullstack pakai express+react"
   ```

6. **`bikin-docs`** 📄: Generate dokumentasi untuk kode atau project
   ```bash
   malas bikin-docs ./src/services/api.ts "pakai markdown"
   ```

### 🛠️ Konfigurasi

File konfigurasi Malas ada di `~/.malas-bikin-config.json`. Isinya kayak gini:

```json
{
  "apiKey": "your-gemini-api-key-here"
}
```

### 🛠️ Development

Buat yang mau ngoding:

```bash
# Install dependencies
npm install

# Build project
npm run build

# Jalanin test
npm run test
```

## 🤝 Kontribusi

Mau bantuin nambah fitur atau nemu bug? Silakan buka issue atau kirim pull request. Semua kontribusi diterima! 🙌

## 📜 Lisensi

Project ini dilisensi di bawah MIT License. Lihat file [LICENSE](LICENSE) buat info lebih lengkap.
