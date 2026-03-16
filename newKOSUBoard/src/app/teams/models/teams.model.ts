
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

export const columnsTeams: { key: keyof Team; label: string }[] = [
  { key: 'teamName', label: 'Team name' },
  { key: 'segmentName', label: 'Segment name' },
  { key: 'teamLeader', label: 'Team leader' },
  { key: 'description', label: 'Description' }
] as const;

export const displayedColumnsTeams = [...columnsTeams.map(c => c.key), 'button'];
