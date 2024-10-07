# Malas CLI

**Malas** adalah tools CLI buat orang malas (atau yang pengen lebih efisien). Dibantu AI, lo bisa generate kode, jalanin command, dan bikin file cuma dengan perintah pakai bahasa sehari-hari. Support berbagai bahasa pemrograman kayak Node.js, Svelte, Python, dan lain-lain, sesuai kebutuhan lo.

## Fitur

- **Bantuan AI**: Bikin kode dan run command pakai bahasa natural, nggak ribet.
- **Multi-Language Support**: Support banyak bahasa pemrograman (Node.js, Python, Svelte, dll.).
- **Konfigurasi Otomatis**: Kalau config-nya belum ada, Malas bakal bikin otomatis di `~/.malas-bikin-config.json`.
- **Command dan File Dinamis**: Lo bisa request command, file, atau kode apa aja sesuai keinginan.
- **Build Cepet**: Pakai `tsup` buat build cepet.
- **Testing**: Udah include `Vitest` buat testing.

## Instalasi

```bash
npm install -g malas
```

## Cara Pakai

### Setup Awal

Pas pertama kali jalanin **Malas**, lo bakal diminta masukin **Groq API key** buat konfigurasi awal. Kalau file config belum ada, Malas bakal otomatis bikin.

```bash
❯ malas
Halo orang malas!?
Config filenya gk ada njirr. Gw bakal nyimpen confignya disini > ~/.malas-bikin-config.json
Beri gw GroqAI ApiKey biar bisa bantu lu > apikey:********************************************************
```

Setelah itu, **"Malas"** nyimpen config di path yang udah disebut.

### Generate Kode atau Command

Lo bisa minta **"Malas"** buat bikin kode atau jalanin command yang lo mau. Contoh:

```bash
❯ malas
Mau ngapain? kode nodejs simple log
Bentar mikir dulu ...
```

**"Malas"** bakal mikir dulu, terus generate file dan command yang sesuai:

```bash
1. ═══════════════
┌─── Nama file : package.json ───                                      │
│ {"name": "simplelog","version": "1.0.0","description": "",           │
│ "main": "index.js","scripts": {"start": "node index.js"},            │
│ "keywords": [],"author": "","license": "ISC"}                        │
└─── akhir filenya ───
Deskripsi: Isi package.json
Lu yakin mau nyimpen file ini? [Yakin/nope]> [y/n]: n
══════════════════

2. ═══════════════
Command:
 $ npm install winston
Deskripsi: Install package winston
Lu yakin mau run command ini? [Yakin/nope]> [y/n]: n
══════════════════
```

Lo bisa konfirmasi apakah mau jalanin atau nggak dengan input `[y/n]`.

### Konfigurasi Global

File config global lo ada di `~/.malas-bikin-config.json`. Di sini lo bisa atur API key, editor, shell default, dan lain-lain.

Contoh config:

```json
{
  "apiKey": "apikey-lo-disini",
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
