// team.model.ts
export interface Team {
  id: number;
  teamName: string;
  description?: string;
  teamLeader: string;
  teamLeaderId?: number | null;
  segmentId: number;
  segmentName: string;
  createDate: string; // use string for API dates
}
