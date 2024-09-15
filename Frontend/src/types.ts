export type GoalsPerDay = {
  id: string;
  title: string;
  completedAt: Date;
};

export type SummaryType = {
  completed: number;
  total: number;
  goalsPerDay: {
    [key: string]: GoalsPerDay[];
  };
};

export type SummaryResponse = {
  summary: SummaryType;
};

export type PendingGoalsType = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];

export type PendingGoalsResponse = {
  pendingGoals: PendingGoalsType;
};
