// lines.state.ts

import { Line } from "../../line/models/lines.model";

export interface LinesState {
  lines: Line[];
  loading: boolean;
  error: string | null;
}

export const initialLinesState: LinesState = {
  lines: [],
  loading: false,
  error: null
};
