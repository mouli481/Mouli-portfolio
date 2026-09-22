import type { ChatSource } from "@/types/api";

export type ChatMessageStatus = "streaming" | "done" | "error";

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources: ChatSource[];
  status: ChatMessageStatus;
}

export interface SendOptions {
  projectSlug?: string | null;
}

export const SUGGESTED_QUESTIONS = [
  "What is Mouli's experience with RAG?",
  "Tell me about the K-Fabrik project.",
  "Which cloud platforms has Mouli worked with?",
  "What does Mouli use for frontend work?",
  "What are Mouli's values as an engineer?",
  "How can I contact Mouli?",
];

export const MAX_HISTORY_MESSAGES = 10;
export const MAX_INPUT_LENGTH = 2000;
