export interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
  }
  
  export interface OllamaResponse {
    response: string;
    done: boolean;
    context?: number[];
  }
  
  export interface OllamaRequest {
    model: string;
    prompt: string;
    stream: boolean;
    context?: number[];
  }