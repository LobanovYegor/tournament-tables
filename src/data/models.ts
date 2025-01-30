export interface Tournament {
  id: string;
  name: string;
  description: string;
  formatType: string;
  startDate: string;
  status: string;
}

export interface UserData {
  email: string;
  displayName: string;
  createdAt: string;
}
