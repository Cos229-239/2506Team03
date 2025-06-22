import cities from './cities.json';

const groupedByState = cities.reduce((acc, cityObj) => {
    const { city, state, latitude, longitude, population } = cityObj;
    if (!acc[state]) acc[state] = [];
    acc[state].push({
        key: city.toLowerCase().replace(/\s+/g, ''),
        name: `${city}, ${state}`,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        population: Number(population),
    });
    return acc;
}, {});

const groupedCities = {};
Object.keys(groupedByState)
    .sort()
    .forEach((state) => {
        groupedCities[state] = groupedByState[state]
            .sort((a, b) => b.population - a.population)
            .slice(0, 5)
            .sort((a, b) => a.name.localeCompare(b.name));
    });

export default groupedCities;