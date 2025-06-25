export interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  route: string;
  icon?: string;
}

export interface QAItem {
  question: string;
  answer: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  category: string;
  icon?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }>;
}