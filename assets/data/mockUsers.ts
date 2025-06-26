import AvatarBrian from '../images/avatar-brian.png';
import AvatarCody from '../images/avatar-cody.png';
import AvatarEnzo from '../images/avatar-enzo.png';
import AvatarJohn from '../images/avatar-john.png';
import AvatarLisa from '../images/avatar-lisa.png';

export type MockUser = {
    name: string;
    profession: string;
    skills: string[];
    latitude: number;
    longitude: number;
    avatar: any;
    locationText: string;
};

export const users: Record<string, MockUser> = {
    seattle: {
    name: 'John Smith',
    profession: 'Carpenter',
    skills: ['Carpentry', 'Digital Art', 'Woodworking', 'Furniture Repair'],
    latitude: 47.6062,
    longitude: -122.3321,
    avatar: AvatarJohn,
    locationText: 'Seattle',
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