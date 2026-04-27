// segment.model.ts
export interface Segment {
  id: number;
  segmentName: string;
  description: string;
  segmentLeader: string;
  segmentLeaderId: number | null;
  createDate: string; // ISO string from backend
}
export const columnsSegments: { key: keyof Segment; label: string;formatter?: (value: any) => string; }[] = [
  { key: 'segmentName', label: 'Segment Name' },
  { key: 'segmentLeader', label: 'Segment Leader' },
  { key: 'description', label: 'Description' },
  { key: 'createDate', label: 'Created At' , formatter: (value: string) =>new Date(value).toLocaleDateString('sr-RS')
  },
  
] as const;

export const displayedColumnsSegments = [
  ...columnsSegments.map(c => c.key),
  'button',
] as const;