import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateProductContent(title: string, affiliateLink: string) {
  const prompt = `You are an expert e-commerce copywriter.

Your goal is to generate clear, engaging, and easy-to-read product descriptions that sell.

INPUT:
- Product Title: ${title}
- Affiliate Link: ${affiliateLink}

RULES:
1. TITLE: Clear, modern, and engaging.
2. SHORT DESCRIPTION: A strong, simple hook of 15–20 words. Focus on the main benefit.
3. DESCRIPTION: 100–150 words of persuasive, easy-to-understand text. Focus on how the product improves the user's life. Keep sentences short and paragraphs small.
4. FEATURES: 3–5 practical, easy-to-understand bullet points.
5. CATEGORY: Match precisely: Electronics, Fashion, Home & Kitchen, Beauty, Fitness, Gadgets, Accessories, Lifestyle.
6. TAGS: 5–7 relevant search keywords (e.g., "minimalist", "affordable", "daily use").
7. META TITLE: SEO-optimized for standard e-commerce.
8. META DESCRIPTION: Clear, high-converting product summary.

STYLE: Professional but very accessible. Use simple, everyday English. Focus on benefits and utility. No overly complex vocabulary.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            slug: { type: Type.STRING },
            short_description: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            features: { type: Type.ARRAY, items: { type: Type.STRING } },
            meta_title: { type: Type.STRING },
            meta_description: { type: Type.STRING },
            affiliate_link: { type: Type.STRING },
          },
          required: ["title", "slug", "short_description", "description", "category", "tags", "features", "meta_title", "meta_description", "affiliate_link"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}
