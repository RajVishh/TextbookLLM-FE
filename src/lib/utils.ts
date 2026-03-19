import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateRoot = async (chatId: string) => {
  if (!chatId) return;
  try {
    const res = await axios.post("http://localhost:3000/api/mindmap/root", {
      chatId: chatId
    });
    return res.data;
  } catch (err: any) {
    console.error("Failed to generate mind map:", err);
    throw err;
  }
};


export const generateFlashcards = async (chatId: string) => {
  if (!chatId) return;
  try {
    const res = await axios.post("http://localhost:3000/api/flashcards/generate-flashcards", {
      chatId: chatId
    });
    return res.data;
  } catch (err: any) {
    console.error("Failed to generate flashcards:", err);
    throw err;
  }
};

export const generateQuiz = async (chatId: string) => {
  if (!chatId) return;
  try {
    const res = await axios.post("http://localhost:3000/api/quiz/generate-quiz", {
      chatId: chatId
    });
    return res.data;
  } catch (err: any) {
    console.error("Failed to generate quiz:", err);
    throw err;
  }
};

export const generateAudioOverview = async (chatId: string) => {
  if (!chatId) return;
  try {
    const res = await axios.post("http://localhost:3000/api/audio/generate", {
      chatId: chatId
    }, {
      responseType: 'blob' 
    });
    return URL.createObjectURL(res.data);
  } catch (err: any) {
    console.error("Failed to generate audio:", err);
    throw err;
  }
};