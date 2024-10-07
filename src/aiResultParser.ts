const regex = /filename:\s*"([^"]+)"\s*```(\w+)([\s\S]*?)```/g;

export default function extract(text: string) {
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const filename = match[1]; // Nama file
    const language = match[2]; // Bahasa kode
    const code = match[3].trim(); // Isi kode
    matches.push({ filename, language, code });
  }
  return matches;
}
