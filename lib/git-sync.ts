import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

export async function syncWithGithub(message: string) {
  try {
    const projectDir = process.cwd();
    const newsJsonPath = path.join(projectDir, "lib", "news-data.json");
    const teachersJsonPath = path.join(projectDir, "lib", "teachers-data.json");

    const execOptions = {
      cwd: projectDir,
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: "0",
        GIT_ASKPASS: "echo",
      },
    };

    // Stage the JSON files safely without shell interpolation
    await execFileAsync("git", ["add", "--", newsJsonPath, teachersJsonPath], execOptions);

    // Stage any uploaded images
    try {
      const uploadsDir = path.join(projectDir, "public", "uploads");
      await execFileAsync("git", ["add", "--", uploadsDir], execOptions);
    } catch {
      // Ignore error if public/uploads directory is not yet created or has issues
    }

    // Commit changes safely using argv array (no shell command injection)
    const sanitizedMessage = message.replace(/[\r\n]+/g, " ").trim() || "Update data";
    await execFileAsync("git", ["commit", "-m", sanitizedMessage], execOptions);

    // Push to remote repository
    await execFileAsync("git", ["push", "origin", "main"], execOptions);

    return { success: true };
  } catch (error) {
    console.error("Git sync error:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    if (
      errMsg.includes("nothing to commit") ||
      errMsg.includes("no changes added to commit") ||
      errMsg.includes("clean")
    ) {
      return { success: true, warning: "Nothing to commit" };
    }
    return { success: false, error: errMsg };
  }
}
