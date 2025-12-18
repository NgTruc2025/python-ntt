
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult, Exercise, Difficulty, QuizQuestion } from "../types";

// Always use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Select appropriate models based on task complexity
const PRO_MODEL = 'gemini-3-pro-preview';
const FLASH_MODEL = 'gemini-3-flash-preview';

export const analyzeCode = async (
  code: string,
  problemDescription: string
): Promise<AIAnalysisResult> => {
  try {
    const prompt = `
      Bạn là một trợ lý dạy lập trình Python cho người mới bắt đầu.
      Hãy phân tích đoạn code sau đây dựa trên yêu cầu bài toán.

      Yêu cầu bài toán: "${problemDescription}"
      
      Code của học viên:
      \`\`\`python
      ${code}
      \`\`\`

      Hãy trả về kết quả dưới dạng JSON với các trường:
      - isCorrect (boolean): Code có giải quyết đúng yêu cầu không?
      - output (string): Dự đoán kết quả in ra màn hình.
      - explanation (string): Giải thích bằng tiếng Việt.
      - suggestion (string): Gợi ý cách cải thiện.
    `;

    // Coding analysis is a complex reasoning task
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            output: { type: Type.STRING },
            explanation: { type: Type.STRING },
            suggestion: { type: Type.STRING },
          },
          required: ["isCorrect", "output", "explanation", "suggestion"]
        },
      },
    });

    // Access the text property directly (not a method)
    return JSON.parse(response.text) as AIAnalysisResult;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      isCorrect: false,
      output: "Lỗi thực thi",
      explanation: "Không thể kết nối với AI.",
      suggestion: "Thử lại sau."
    };
  }
};

export const generateAIExercise = async (topic?: string): Promise<Exercise> => {
  const prompt = topic 
    ? `Tạo một bài tập lập trình Python dành cho người mới bắt đầu về chủ đề cụ thể: "${topic}". 
       Bài tập nên yêu cầu người học áp dụng kiến thức của chủ đề này.
       Trả về JSON theo format: title, description, difficulty (Dễ, Trung bình, Khó), initialCode, hint.`
    : `Tạo một bài tập lập trình Python ngẫu nhiên dành cho người mới bắt đầu. 
       Bài tập nên tập trung vào các khái niệm như biến, vòng lặp, hàm hoặc list.
       Trả về JSON theo format: title, description, difficulty (Dễ, Trung bình, Khó), initialCode, hint.`;

  // Coding tasks should use the pro model for better reasoning
  const response = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ["Dễ", "Trung bình", "Khó"] },
          initialCode: { type: Type.STRING },
          hint: { type: Type.STRING },
        },
        required: ["title", "description", "difficulty", "initialCode", "hint"]
      },
    },
  });

  const data = JSON.parse(response.text);
  return {
    ...data,
    id: `ai-${Date.now()}`,
    isAiGenerated: true
  };
};

export const generateTopicQuiz = async (topicTitle: string, topicContent: string): Promise<QuizQuestion> => {
  const prompt = `Dựa trên nội dung bài học về "${topicTitle}": 
  "${topicContent}"
  
  Hãy tạo 1 câu hỏi trắc nghiệm (multiple choice) để kiểm tra kiến thức của người học.
  Trả về JSON: question, options (mảng 4 lựa chọn), correctAnswerIndex (0-3), explanation (giải thích ngắn gọn).`;

  // General text task uses the flash model
  const response = await ai.models.generateContent({
    model: FLASH_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswerIndex: { type: Type.INTEGER },
          explanation: { type: Type.STRING },
        },
        required: ["question", "options", "correctAnswerIndex", "explanation"]
      },
    },
  });

  return JSON.parse(response.text) as QuizQuestion;
};
