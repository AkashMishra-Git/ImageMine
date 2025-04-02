
// You can replace this with your own API key if needed
const API_KEY = "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";

interface GenerateImageResponse {
  data: Array<{
    url: string;
  }>;
  created: number;
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    param: string | null;
    type: string;
  };
}

export async function generateImage(prompt: string, customApiKey?: string): Promise<string[]> {
  try {
    const apiKey = customApiKey || API_KEY;
    console.log("Attempting to generate image with prompt:", prompt);
    
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-2", // Try using dall-e-2 which might have different billing requirements
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const responseData = await response.json();
    console.log("API response:", responseData);

    if (!response.ok) {
      // Log the full error for debugging
      console.error("OpenAI API error:", responseData);
      
      const errorData = responseData as ErrorResponse;
      
      // Handle specific error codes
      if (errorData.error?.code === "billing_hard_limit_reached") {
        throw new Error("API account has reached its billing limit. Please check your OpenAI account settings or payment methods.");
      } else if (errorData.error?.code === "rate_limit_exceeded") {
        throw new Error("Rate limit exceeded. Please try again in a few moments.");
      } else if (errorData.error?.code === "insufficient_quota") {
        throw new Error("Insufficient quota. Your account needs more credits or a different tier.");
      } else {
        throw new Error(errorData.error?.message || "Failed to generate image");
      }
    }

    const data = responseData as GenerateImageResponse;
    return data.data.map(item => item.url);
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

// Helper function to validate an API key with a minimal request
export async function testApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error("API key validation error:", error);
    return false;
  }
}
