import { Command } from "../types";

export const commands: Command[] = [
  {
    name: "bikin",
    emoji: "🎨",
    description: "Generate kode baru sesuai deskripsi lo",
    args: [
      {
        name: "prompt",
        description: "Deskripsi kode yang mau dibuat",
      },
    ],
  },
  {
    name: "rapiin",
    emoji: "✨",
    description: "Beresin dan improve kode yang berantakan",
    args: [
      {
        name: "filepath",
        description: "Path ke file yang mau dirapiin",
      },
    ],
  },
  {
    name: "jelasin",
    emoji: "📖",
    description: "Dapetin penjelasan detail tentang kode",
    args: [
      {
        name: "filepath",
        description: "Path ke file yang mau dijelasin",
      },
    ],
  },
  {
    name: "test",
    emoji: "🧪",
    description: "Generate unit test untuk kode lo",
    args: [
      {
        name: "filepath",
        description: "Path ke file yang mau ditest",
      },
      {
        name: "prompt",
        description: 'Opsi tambahan untuk testing (contoh: "pakai vitest")',
        optional: true,
      },
    ],
  },
  {
    name: "bikin-project",
    emoji: "🛠️",
    description: "Generate struktur project baru",
    args: [
      {
        name: "prompt",
        description: "Deskripsi project yang mau dibuat",
      },
    ],
  },
  {
    name: "bikin-docs",
    emoji: "📄",
    description: "Generate dokumentasi untuk kode atau project",
    args: [
      {
        name: "filepath",
        description: "Path ke file yang mau didokumentasikan",
      },
      {
        name: "prompt",
        description: 'Format dokumentasi (contoh: "pakai markdown")',
        optional: true,
      },
    ],
  },
];

export * from "./bikin";
export * from "./rapiin";
export * from "./jelasin";
export * from "./test";
export * from "./bikin-docs";
export * from "./bikin-project";
