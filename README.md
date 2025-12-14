# malas

CLI buat developer **malas** yang tetap pengen rapi.

`malas` membantu kamu menghilangkan kerja berulang di workflow dev:
generate file, folder, dan struktur yang itu-itu lagi,
dengan hasil **konsisten, deterministic, dan bisa dipreview**.

Bukan AI.  
Bukan framework.  
Bukan tool serba bisa.

Cuma generator kecil yang bikin kamu lanjut kerja lebih cepat.

---

## Kenapa `malas`?

Karena ini kejadian terus:

- bikin route Svelte → copy folder → rename → cek ulang
- bikin component → boilerplate sama lagi
- setup plugin Neovim → struktur sama, beda nama
- dotfiles berantakan karena path config beda-beda

Semua bisa manual.  
Semua juga **malesin**.

`malas` menghapus ritual itu.

---

## Fitur Utama

### Generator (`malas gen`)

Generate hal-hal yang sering kamu ulang.

```bash
malas gen svelte route blog
malas gen svelte component Button
malas gen nvim plugin my-plugin
malas gen dotfile zsh
````

Karakteristik:

* output deterministic (input sama → hasil sama)
* preview diff sebelum nulis file
* aman dan idempotent
* tanpa magic, tanpa guessing

---

### Backup Dotfiles (Bonus)

Bukan backup system universal.
Cuma helper biar kamu **nggak mikir path satu-satu**.

```bash
malas backup
```

Yang dilakukan:

* detect dotfiles umum (`~/.config/*`, `~/.zshrc`, dll)
* checklist interaktif
* preview file
* archive atau `git commit`

Pengganti:

```
git add ~/.config/nvim ~/.zshrc ~/.gitconfig ...
```

Lebih pendek. Lebih manusiawi.

---

## Prinsip Desain

* Offline-first
* Deterministic
* Preview sebelum apply
* Aman, bisa dijalankan ulang
* Opinionated (biar nggak ribet)

Kalau belum kamu pakai sendiri tiap hari, fitur itu belum layak ada.

---

## Yang Tidak Dilakukan `malas`

`malas` **tidak**:

* menggunakan AI
* mengirim data ke cloud
* menjadi backup system lengkap
* mengatur task atau hidup kamu
* menggantikan editor atau shell

---

## Cocok Dipakai Kalau

* kamu sering scaffold hal yang sama
* kamu peduli struktur tapi nggak mau ribet
* kamu suka tool kecil yang fokus
* kamu lebih pilih konsistensi daripada fleksibilitas berlebihan

Kalau kamu cari tool “bisa semuanya”, ini bukan itu.

---

## Status

Masih berkembang.
Scope dijaga ketat.
Fitur bertambah hanya kalau dipakai beneran.

---

## Filosofi Singkat

> Lebih baik tool kecil yang kepake tiap hari
> daripada tool gede yang cuma dibaca README-nya.

Kalau sesuatu bisa dilakukan manual tapi bikin kamu malas,
itu kandidat fitur `malas`.
