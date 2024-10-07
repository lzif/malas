import { promises as fs } from "fs";
import path from "path";
import log from "./logger";

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
