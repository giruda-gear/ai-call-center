export type CustomerIntent =
  | 'COVERAGE_INQUIRY'
  | 'CONTRACT_INQUIRY'
  | 'CALL_HISTORY_INQUIRY'
  | 'GENERAL_INQUIRY';

export type AnalyzeMessageResult = {
  intent: CustomerIntent;
  needPolicySearch: boolean;
};

export type OllamaChatResponse = {
  message: {
    role: string;
    content: string;
  };
};

export type OllamaEmbedResponse = {
  embeddings: number[][];
};
