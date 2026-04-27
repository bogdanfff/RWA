// hourlies.state.ts

import { Hourly } from "../../hourly/models/hourlies.model";

export interface HourliesState {
  hourlies: Hourly[];
  loading: boolean;
  error: string | null;
}

export const initialHourliesState: HourliesState = {
  hourlies: [],
  loading: false,
  error: null
};
