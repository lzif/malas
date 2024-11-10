import { promises as fs } from "fs";
import path from "path";
import log from "../services/logger";

export const writeFile = async (
  fileName: string,
  content: string,
): Promise<void> => {
  const dir = path.dirname(fileName);

  try {
    if (
      !(await fs
        .access(dir)
        .then(() => true)
        .catch(() => false))
    ) {
      await fs.mkdir(dir, { recursive: true });
      log(` Directory "${dir}" berhasil dibuat.`, "green");
    }

    await fs.writeFile(fileName, content.replace(/```(.*?)\n/g, "").replace(/```/g, ""));
    log(` File "${fileName}" berhasil disimpan.`, "green");
  } catch (err) {
    log(`Error menyimpan file: ${err}`, "red");
  }
};

export const readFile = async (filename: string) => {
  const dir = path.dirname(filename);
  try {
    if (
      !(await fs
        .access(dir)
        .then(() => true)
        .catch(() => false))
    ) {
      log(` Directory "${dir}" does not exist.`, "yellow");
      return null;
    }
    return await fs.readFile(filename, "utf8");
  } catch (error) {
    log(`Error reading file: ${error}`, "red");
    return null;
  }
};

export const validateFilePath = async (filepath: string): Promise<string> => {
  try {
    const stats = await fs.stat(filepath);
    if (!stats.isFile()) {
      throw new Error("Path yang diberikan bukan file");
    }
    return path.resolve(filepath);
  } catch (error) {
    throw new Error(`File tidak ditemukan: ${filepath}`);
  }
};
