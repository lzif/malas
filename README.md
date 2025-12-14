# malas

> CLI buat developer **malas** yang tetap pengen rapi.

`malas` menghapus kerja berulang di workflow dev: generate file, folder, dan struktur yang itu-itu lagi, dengan hasil **konsisten, deterministic, dan bisa dipreview**.

Bukan AI. Bukan framework. Bukan tool serba bisa.  
Cuma generator kecil yang bikin kamu lanjut kerja lebih cepat.

---

## Instalasi

```bash
npm install -g malas
```

atau pakai langsung:

```bash
npx malas gen svelte route blog
```

---

## Quick Start

```bash
# Generate Svelte route
malas gen svelte route blog

# Generate React component
malas gen react component Button

# Generate Neovim plugin structure
malas gen nvim plugin my-plugin

# List semua generator
malas list
```

---

## Kenapa `malas`?

Karena ini kejadian terus:

- bikin route Svelte → copy folder → rename → cek ulang
- bikin component → boilerplate sama lagi
- setup plugin Neovim → struktur sama, beda nama
- dotfiles berantakan karena path config beda-beda

Semua bisa manual. Semua juga **malesin**.

`malas` menghapus ritual itu.

---

## Cara Kerja

### 1. Preview Dulu

```bash
$ malas gen svelte route blog

✓ Preview changes:
  + src/routes/blog/+page.svelte
  + src/routes/blog/+page.server.ts
  + src/routes/blog/+page.ts

  Apply changes? [Y/n]
```

### 2. Deterministic

Input sama → output sama.  
Tidak ada guessing, tidak ada magic.

### 3. Idempotent & Aman

Bisa dijalankan ulang tanpa rusak struktur yang udah ada.  
Preview diff kalau file sudah exist.

---

## Generator Built-in

### Svelte / SvelteKit

```bash
# Route dengan server load
malas gen svelte route blog

# Component dengan TypeScript
malas gen svelte component Button

# Layout
malas gen svelte layout dashboard
```

Output:
```
src/routes/blog/
├── +page.svelte
├── +page.server.ts
└── +page.ts
```

### React

```bash
# Functional component
malas gen react component Button

# Component dengan hooks
malas gen react hook useCounter
```

### Neovim Plugin

```bash
malas gen nvim plugin my-plugin
```

Output:
```
lua/my-plugin/
├── init.lua
└── config.lua
plugin/my-plugin.lua
```

---

## Custom Template

Template disimpan di `~/.config/malas/templates/`.

Struktur:

```
~/.config/malas/templates/
├── svelte/
│   ├── route/
│   │   ├── +page.svelte.hbs
│   │   └── +page.server.ts.hbs
│   └── component/
│       └── Component.svelte.hbs
└── react/
    └── component/
        └── Component.tsx.hbs
```

Template pakai Handlebars syntax:

```handlebars
<!-- +page.svelte.hbs -->
<script lang="ts">
  export let data;
</script>

<h1>{{name}}</h1>
```

Default template udah oke buat 80% kasus.  
Edit kalau kamu butuh style spesifik.

---

## Prinsip Desain

- **Offline-first** – tidak butuh internet
- **Deterministic** – input sama = output sama
- **Preview-first** – lihat dulu sebelum apply
- **Aman** – idempotent, bisa dijalankan ulang
- **Opinionated** – default yang masuk akal

Kalau belum kamu pakai sendiri tiap hari, fitur itu belum layak ada.

---

## Yang Tidak Dilakukan `malas`

`malas` **tidak**:

- menggunakan AI
- mengirim data ke cloud
- menjadi build tool atau bundler
- mengatur task atau project management
- menggantikan editor atau shell

Ini cuma generator. Simple dan fokus.

---

## Cocok Dipakai Kalau

- kamu sering scaffold hal yang sama
- kamu peduli struktur tapi nggak mau ribet
- kamu suka tool kecil yang fokus
- kamu lebih pilih konsistensi daripada fleksibilitas berlebihan

Kalau kamu cari tool "bisa semuanya", ini bukan itu.

---

## Commands

```bash
# Generate dari template
malas gen <framework> <type> <name>

# List semua generator tersedia
malas list

# Show template location
malas config

# Show version
malas --version

# Help
malas --help
```

---

## Development

```bash
# Clone repo
git clone https://github.com/yourusername/malas
cd malas

# Install dependencies
pnpm install

# Build
pnpm build

# Test locally
pnpm link --global
malas gen svelte route test
```

---

## Roadmap

- [x] Core generator engine
- [x] Svelte/SvelteKit templates
- [x] React templates
- [x] Neovim plugin templates
- [ ] Hono API route generator
- [ ] PostgreSQL schema generator
- [ ] Dotfile backup helper (experimental)

Scope dijaga ketat. Fitur bertambah hanya kalau dipakai beneran.

---

## Filosofi

> Lebih baik tool kecil yang kepake tiap hari  
> daripada tool gede yang cuma dibaca README-nya.

Kalau sesuatu bisa dilakukan manual tapi bikin kamu malas,  
itu kandidat fitur `malas`.

---

## Kontribusi

PR welcome untuk:
- Bug fixes
- Template improvements
- Documentation

**Tidak diterima:**
- AI integration
- Cloud features
- Fitur yang terlalu general

Keep it simple. Keep it focused.

---

## License

MIT

---

## Author

Dibuat karena males ngulang-ngulang hal yang sama.

Maintained dengan prinsip: kalau nggak kepake, nggak masuk.
