import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

export async function syncWithGithub(message: string) {
  try {
    const projectDir = process.cwd();
    const newsJsonPath = path.join(projectDir, "lib", "news-data.json");
    const teachersJsonPath = path.join(projectDir, "lib", "teachers-data.json");
    
    const execOptions = {
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: "0",
        GIT_ASKPASS: "echo",
      }
    };

    // Stage the JSON files
    await execAsync(`git add "${newsJsonPath}"`, execOptions);
    await execAsync(`git add "${teachersJsonPath}"`, execOptions);
    
    // Stage any uploaded images
    try {
      const uploadsDir = path.join(projectDir, "public", "uploads");
      await execAsync(`git add "${uploadsDir}"`, execOptions);
    } catch {
      // Ignore error if public/uploads directory is not yet created or has issues
    }

    // Commit changes
    // Escape quotes for safe shell execution
    const safeMessage = message.replace(/"/g, '\\"');
    await execAsync(`git commit -m "${safeMessage}"`, execOptions);

    // Push to remote repository
    await execAsync("git push origin main", execOptions);

    return { success: true };
  } catch (error) {
    console.error("Git sync error:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    // If there is nothing to commit, we treat it as success
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
