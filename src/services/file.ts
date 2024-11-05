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

    await fs.writeFile(fileName, content);
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