import { OllamaRequest, OllamaResponse } from '../types';

const OLLAMA_BASE_URL = 'http://localhost:11434';
const MODEL_NAME = 'llama3.2:3b';

export class OllamaAPI {
  private static context: number[] = [];

  static async generateResponse(prompt: string): Promise<string> {
    try {
      const requestBody: OllamaRequest = {
        model: MODEL_NAME,
        prompt,
        stream: false,
        context: this.context
      };

      const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      
      // Context'i güncelle (sohbet geçmişi için)
      if (data.context) {
        this.context = data.context;
      }

      return data.response || 'Üzgünüm, bir hata oluştu.';
    } catch (error) {
      console.error('Ollama API Error:', error);
      throw new Error('Bağlantı hatası! Ollama servisinizin çalıştığından emin olun.');
    }
  }

  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
      return response.ok;
    } catch {
      return false;
    }
  }

  static clearContext(): void {
    this.context = [];
  }
}