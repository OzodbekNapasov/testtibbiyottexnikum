const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "OzodbekNapasov/testtibbiyottexnikum";

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "NextJS-App",
};

export function isGithubMode() {
  return !!GITHUB_TOKEN;
}

export async function getFileFromGithub(filePath: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
  
  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: 0 },
      cache: "no-store",
    });

    if (res.status === 404) {
      return { content: null, sha: null };
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`GitHub API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return { content, sha: data.sha };
  } catch (error) {
    console.error(`Error reading ${filePath} from GitHub:`, error);
    throw error;
  }
}

export async function updateFileInGithub(filePath: string, content: string, message: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
  
  try {
    // 1. Get the current sha
    const { sha } = await getFileFromGithub(filePath);
    
    // 2. Put the new content
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString("base64"),
        sha: sha || undefined,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`GitHub PUT error (${res.status}): ${errText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error updating ${filePath} in GitHub:`, error);
    throw error;
  }
}

export async function uploadFileToGithub(filePath: string, buffer: Buffer, message: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
  
  try {
    // Check if file already exists to get SHA (optional, but good for overwrites)
    let sha = null;
    try {
      const existRes = await fetch(url, { headers });
      if (existRes.ok) {
        const existData = await existRes.json();
        sha = existData.sha;
      }
    } catch {
      // Ignore exists check errors
    }

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: buffer.toString("base64"),
        sha: sha || undefined,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`GitHub Upload error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    return {
      url: `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${filePath}`,
      data,
    };
  } catch (error) {
    console.error(`Error uploading ${filePath} to GitHub:`, error);
    throw error;
  }
}
