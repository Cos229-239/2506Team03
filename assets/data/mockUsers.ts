import AvatarBrian from '../images/avatar-brian.png';
import AvatarCody from '../images/avatar-cody.png';
import AvatarEnzo from '../images/avatar-enzo.png';
import AvatarJohn from '../images/avatar-john.png';
import AvatarLisa from '../images/avatar-lisa.png';

export type MockUser = {
  name: string;
  profession: string;
  skills: string[];
  interests?: string[];
  bio?: string;
  latitude: number;
  longitude: number;
  avatar: any;
  locationText: string;
};

export const users: Record<string, MockUser> = {
  seattle: {
    name: 'John Smith',
    profession: 'Carpenter',
    locationText: 'Seattle, WA',
    skills: ['Carpentry', 'Digital Art', 'Furniture Repair', 'Woodworking'],
    interests: ['Car Repair', 'Drawing', 'Fitness', 'Programming'],
    avatar: AvatarJohn,
    latitude: 47.6062,
    longitude: -122.3321,
    bio: "I’m John - carpenter of 15+ years and proud Seattle local. I specialize in custom furniture, home repairs, and teaching beginner woodworking.",
  },

  john: {
    name: 'John Smith',
    profession: 'Carpenter',
    locationText: 'Seattle, WA',
    skills: ['Carpentry', 'Digital Art', 'Furniture Repair', 'Woodworking'],
    interests: ['Car Repair', 'Drawing', 'Fitness', 'Programming'],
    avatar: AvatarJohn,
    latitude: 47.6062,
    longitude: -122.3321,
    bio: "I’m John - carpenter of 15+ years and proud Seattle local. I specialize in custom furniture, home repairs, and teaching beginner woodworking.",
  },
  newyork: {
    name: 'Enzo Bartolli',
    profession: 'Language Tutor',
    skills: ['Language Tutoring – Italian', 'Fitness'],
    latitude: 40.7128,
    longitude: -74.006,
    avatar: AvatarEnzo,
    locationText: 'New York',
  },
  seattle2: {
    name: 'Lisa Kerry',
    profession: 'Personal Chef',
    skills: ['Cooking', 'Baking', 'Photography'],
    latitude: 47.6085,
    longitude: -122.3340,
    avatar: AvatarLisa,
    locationText: 'Seattle',
  },
  newyork2: {
    name: 'Cody Tanner',
    profession: 'IT Support',
    skills: ['Programming', 'Web Design', 'IT Support'],
    latitude: 40.7150,
    longitude: -74.0082,
    avatar: AvatarCody,
    locationText: 'New York',
  },
  denver: {
    name: 'Brian Thompson',
    profession: 'Photographer',
    skills: ['Photography', 'Web Design', 'Video Editing'],
    latitude: 39.7392,
    longitude: -104.9903,
    avatar: AvatarBrian,
    locationText: 'Denver',
  },
};

export type CityKey = keyof typeof users;