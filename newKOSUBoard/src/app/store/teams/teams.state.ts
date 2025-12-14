// teams.state.ts
import { Team } from "../../teams/models/teams.model";

export interface TeamsState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

export const initialTeamsState: TeamsState = {
  teams: [],
  loading: false,
  error: null
};
