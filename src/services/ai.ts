import ora from "ora";
import { ChatOptions, ChatResponse, Message } from "../types";

const API_URL = "https://typli.ai/api/generators/completion";

const DEFAULT_OPTIONS: ChatOptions = {
  temperature: 0.8,
  top_p: 0.9,
  top_k: 40,
};

/**
 * Send a message to AI API
 * @param messages - Array of message objects containing the conversation
 * @param options - Optional settings for the API request
 * @returns Promise with the API response
 */
async function generate(
  messages: Message[],
  options: ChatOptions = DEFAULT_OPTIONS,
): Promise<ChatResponse> {
  const spinner = ora({
    text: "Bentar, mikir dulu...",
    spinner: "bouncingBar",
    color: "green",
  }).start();
  try {
    const requestBody = {
      messages,
      ...DEFAULT_OPTIONS,
      ...options,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    spinner.stop();
    return {
      success: true,
      answer: data,
    };
  } catch (error) {
    let errorMsg =
      error instanceof Error ? error.message : "An unknown error occurred";
    spinner.fail(errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

export default generate;
