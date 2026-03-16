import { Segment } from '../entities/segment.entity';

export interface SegmentDto {
  id: number;
  segmentName: string;
  description: string;
  segmentLeaderId: number | null;
  segmentLeader:string |undefined;
  createDate: Date;
}

export function mapSegmentToDto(segment: Segment): SegmentDto {
  return {
    id: segment.id,
    segmentName: segment.segmentName,
    description: segment.description,
    segmentLeaderId: segment.segmentLeaderId,
    segmentLeader:segment.segmentLeader?.userName,
    createDate: segment.createDate,
    
  };
}