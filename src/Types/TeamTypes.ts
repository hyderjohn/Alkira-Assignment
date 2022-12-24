export interface TeamDataTypes {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

interface TeamMetaTypes {
  total_pages: number;
  current_page: number;
  next_page: number | null;
  per_page: number;
  total_count: number;
}

export interface TeamApiDataTypes {
  data: TeamDataTypes[];
  meta: TeamMetaTypes;
}

export interface TeamTypesById {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface GameTypes {
  id: number;
  date: string;
  home_team: TeamTypesById;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: TeamTypesById;
  visitor_team_score: number;
}