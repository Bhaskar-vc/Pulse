export interface Survey {
  id: number | string;
  name: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  startDate: string;
  endDate: string;
  participation: number;
  totalInvited: number;
}

export interface Question {
  id: number;
  text: string;
  type: string;
  category?: string;
}

export interface Category {
  name: string;
  questions: Question[];
}
