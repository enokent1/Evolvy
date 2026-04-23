export type Habit = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  group: "Health" | "Productivity" | "Sport";
  color: string;
  target: number;
  unit:
    | "times"
    | "steps"
    | "m"
    | "km"
    | "ml"
    | "l"
    | "g"
    | "mg"
    | "sec"
    | "min"
    | "hr";
  trackingType: "count";
  periodicity: "day" | "week" | "month";
  startDate: string;
  endDate: string | null;
};

export type HabitItem = {
  id: string;
  icon: string;
  title: string;
};
