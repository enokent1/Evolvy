export type NavLink = {
  route: string;
  name: string;
  icon: string;
};

export type Group = {
  id: number;
  name: "Health" | "Productivity" | "Sport";
};

export type ResultMessage = {
  type: "success" | "error";
  message: string;
};
