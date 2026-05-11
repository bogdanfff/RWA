// hourlies.state.ts

import { Hourly } from "../../hourly/models/hourlies.model";

export interface HourliesState {
  hourlies: Hourly[];
  loading: boolean;
  loaded:boolean;
  error: string | null;
}

export const initialHourliesState: HourliesState = {
  hourlies: [],
  loading: false,
  loaded:false,
  error: null
};
