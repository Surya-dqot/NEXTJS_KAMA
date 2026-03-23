export interface Profile {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  status: "online" | "offline" | "away";
  experience: string;
  image: string;
}