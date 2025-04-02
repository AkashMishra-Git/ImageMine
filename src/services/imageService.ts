
const API_KEY = "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";

interface GenerateImageResponse {
  data: Array<{
    url: string;
  }>;
  created: number;
}

export async function generateImage(prompt: string): Promise<string[]> {
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate image");
    }

    const data = await response.json() as GenerateImageResponse;
    return data.data.map(item => item.url);
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
