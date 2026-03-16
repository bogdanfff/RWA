import { Team } from "../entities/team.entity";

export function mapTeamToDto(team: Team) {
    return {
        id: team.id,
        teamName: team.teamName,
        description: team.description,
        teamLeader: team.teamLeader?.userName,
        teamLeaderId: team.teamLeader?.id,
        segmentName: team.segment?.segmentName,
        segmentId: team.segmentId,
        createDate: team.createDate,
    };
}