// segments.state.ts
import { Segment } from "../../segment/models/segments.model";

export interface SegmentsState {
  segments: Segment[];
  loading: boolean;
  error: string | null;
}

export const initialSegmentsState: SegmentsState = {
  segments: [],
  loading: false,
  error: null
};
