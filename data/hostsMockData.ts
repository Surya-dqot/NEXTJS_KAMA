import { Profile } from "@/types/profile.types";

export const HOSTS: Profile[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: "Jerome Bell",
  specialty: "Mental Health",
  rating: i % 3 === 0 ? 3.5 : 4.0,
  status: i % 4 === 0 ? "offline" : i % 7 === 0 ? "away" : "online",
  experience: `${5 + (i % 10)} yrs`,
  // Replace with your Figma exported images in /public/doctors/
  image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 1}.jpg`,
}));