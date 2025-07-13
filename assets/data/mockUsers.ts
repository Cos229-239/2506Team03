import AvatarBrian from '../images/avatar-brian.png';
import AvatarCody from '../images/avatar-cody.png';
import AvatarEnzo from '../images/avatar-enzo.png';
import AvatarJohn from '../images/avatar-john.png';
import AvatarLisa from '../images/avatar-lisa.png';

export type MockUser = {
  id: string,
  name: string;
  profession: string;
  skills: string[];
  interests?: string[];
  bio?: string;
  latitude: number;
  longitude: number;
  avatar: any;
  locationText: string;
  cityKey?: string;
};

export const users: Record<string, MockUser> = {
  seattle: {
    id: "user1",
    name: 'John Smith',
    profession: 'Carpenter',
    locationText: 'Seattle, WA',
    skills: ['Carpentry', 'Digital Art', 'Furniture Repair', 'Woodworking'],
    interests: ['Car Repair', 'Drawing', 'Fitness', 'Programming'],
    avatar: AvatarJohn,
    latitude: 47.6062,
    longitude: -122.3321,
    bio: "I’m John — a carpenter of 15+ years and proud Seattle local. I specialize in custom furniture, home repairs, and teaching beginner woodworking.",
    cityKey: "WA_Seattle",
  },
  newyork: {
    id: "user2",
    name: 'Enzo Bartolli',
    profession: 'Language Tutor',
    skills: ['Language – Italian', 'Fitness'],
    interests: ['Cooking', 'Meditation', 'Language – Spanish'],
    latitude: 40.7128,
    longitude: -74.006,
    avatar: AvatarEnzo,
    locationText: 'New York',
    bio: "Ciao! I'm Enzo, a native Italian speaker and part-time fitness coach. I love helping people master new languages and healthy habits.",
    cityKey: "NY_New York",
  },
  seattle2: {
    id: "user3",
    name: 'Lisa Kerry',
    profession: 'Personal Chef',
    skills: ['Cooking', 'Baking', 'Photography'],
    interests: ['Web Design', 'Creative Writing', 'Woodworking'],
    latitude: 47.6085,
    longitude: -122.3340,
    avatar: AvatarLisa,
    locationText: 'Seattle',
    bio: "Hi! I'm Lisa, a personal chef who enjoys experimenting with new recipes and photographing the results. Always curious about design and DIY too!",
    cityKey: "WA_Seattle",
  },
  newyork2: {
    id: "user4",
    name: 'Cody Tanner',
    profession: 'IT Support',
    skills: ['Programming / Coding', 'Web Design', 'IT Support'],
    interests: ['Photography', 'Excel / Google Sheets Power Use', '3D Modeling'],
    latitude: 40.7150,
    longitude: -74.0082,
    avatar: AvatarCody,
    locationText: 'New York',
    bio: "Hey, I'm Cody — tech support guy by day, creative tinkerer by night. I love building websites and capturing the world through my lens.",
    cityKey: "NY_New York",
  },
  denver: {
    id: "user5",
    name: 'Brian Thompson',
    profession: 'Photographer',
    skills: ['Photography', 'Web Design', 'Video Editing'],
    interests: ['UI/UX Design', 'Language – Japanese', 'Drums'],
    latitude: 39.7392,
    longitude: -104.9903,
    avatar: AvatarBrian,
    locationText: 'Denver',
    bio: "Brian here — professional photographer and part-time video editor. Music and UX design keep me creatively inspired.",
    cityKey: "CO_Denver",
  },
};

export type CityKey = keyof typeof users;