import { Command, CommandName } from "../types";

const createCommand = (name: CommandName, emoji: string, description: string, args: Array<{ name: string; description: string; optional?: boolean }>): Command => ({
  name,
  emoji,
  description,
  args,
});

const commandDefinitions: Command[] = [
  {
    name: "bikin",
    emoji: "🎨",
    description: "Generate kode baru sesuai deskripsi lo",
    args: [{ name: "prompt", description: "Deskripsi kode yang mau dibuat" }],
  },
  {
    name: "rapiin",
    emoji: "✨",
    description: "Beresin dan improve kode yang berantakan",
    args: [
      { name: "filepath", description: "Path ke file yang mau dirapiin" },
      { name: "prompt", description: "Deskripsi tambahan, seperti pake konsep DRY/KISS, atau tambahan seperti JSDoc.", optional: true },
    ],
  },
  {
    name: "jelasin",
    emoji: "📖",
    description: "Dapetin penjelasan detail tentang kode",
    args: [{ name: "filepath", description: "Path ke file yang mau dijelasin" }],
  },
  {
    name: "test",
    emoji: "🧪",
    description: "Generate unit test untuk kode lo",
    args: [
      { name: "filepath", description: "Path ke file yang mau ditest" },
      { name: "prompt", description: 'Opsi tambahan untuk testing (contoh: "pakai vitest")', optional: true },
    ],
  },
  {
    name: "bikin-project",
    emoji: "🛠️",
    description: "Generate struktur project baru",
    args: [{ name: "prompt", description: "Deskripsi project yang mau dibuat" }],
  },
  {
    name: "bikin-docs",
    emoji: "📄",
    description: "Generate dokumentasi untuk kode atau project",
    args: [
      { name: "filepath", description: "Path ke file yang mau didokumentasikan" },
      { name: "prompt", description: 'Format dokumentasi (contoh: "pakai markdown")', optional: true },
    ],
  },
];

export const commands: Command[] = commandDefinitions.map(({ name, emoji, description, args }) => createCommand(name, emoji, description, args));

import bikin from "./bikin";
import rapiin from "./rapiin";
import test from "./test";
import jelasin from "./jelasin";
import bikinDocs from "./bikin-docs";
import bikinProject from "./bikin-project";

export {
  bikin,
  rapiin,
  jelasin,
  test,
  bikinDocs,
  bikinProject,
};
