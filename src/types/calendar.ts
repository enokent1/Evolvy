export type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  onClick: () => void;
};

export type DateSelectorMode = "startDate" | "endDate";

export type EndDate = Date | "No End Date";
