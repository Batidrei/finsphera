export interface Launch {
  id: string;
  name: string;
  success: boolean | null;
  date_utc: string;
  details: string | null;
  flight_number: number;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    youtube_id: string | null;
    article: string | null;
    webcast: string | null;
    wikipedia: string | null;
  };
}