import MockAvatar from '../images/mock-avatar.png';
import Mock2Avatar from '../images/mock2-avatar.png';

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
        skills: ['Woodworking', 'Welding', 'Painting & Drawing'],
        latitude: 47.6062,
        longitude: -122.3321,
        avatar: MockAvatar,
        locationText: 'Seattle, Washington',
    },
    newyork: {
        name: 'Enzo Bartolli',
        profession: 'Language Tutor',
        skills: ['Language Tutoring – Italian', 'Fitness Training'],
        latitude: 40.7128,
        longitude: -74.006,
        avatar: Mock2Avatar,
        locationText: 'New York, New York',
    },
};

export type CityKey = keyof typeof users;