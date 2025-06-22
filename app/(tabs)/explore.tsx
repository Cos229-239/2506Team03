import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import 'react-native-get-random-values';
import type MapViewType from 'react-native-maps';
import groupedCities from '../../assets/data/groupedCities.js';
import { CityKey, MockUser, users } from '../../assets/data/mockUsers';
import FilterIcon from '../../assets/images/filter-icon.png';
import ToggleIcon from '../../assets/images/toggle-icon.png';

type UserType = {
  name: string;
  profession: string;
  skills: string[];
  latitude: number;
  longitude: number;
  avatar: any;
  locationText: string;
};

type City = {
  key: string;
  name: string;
  latitude: number;
  longitude: number;
};

const skillFilters: Record<string, string[]> = {
  'Hands-on / Trade Skills': [
    'Woodworking',
    'Welding',
    'Furniture Restoration',
    'Automotive Repair',
    'Home Improvement',
  ],
  'Creative / Art Skills': [
    'Painting & Drawing',
    'Graphic Design',
    'Photography',
    'Crafting & DIY',
    'Music',
  ],
  'Tech / Digital Skills': [
    'Web Design',
    'Coding / Programming',
    'Video Editing',
    '3D Modeling',
  ],
  'Lifestyle & Personal Growth': [
    'Cooking & Baking',
    'Fitness Training',
    'Language Tutoring – Italian',
    'Language Tutoring – Spanish',
    'Language Tutoring – French',
    'Language Tutoring – German',
    'Language Tutoring - Japanese',
    'Gardening',
    'Sewing & Tailoring',
  ],
};

const Explore = () => {
  const [selectedCity, setSelectedCity] = useState<CityKey>('seattle');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [profileVisible, setProfileVisible] = useState(false);
  const [markerScreenPosition, setMarkerScreenPosition] = useState<{ x: number; y: number } | null>(null);
  const [collapsedStates, setCollapsedStates] = useState<string[]>([]);
  const selectedUser = users[selectedCity];
  const selectedCityData = Object.values(groupedCities)
    .flat()
    .find((c) => c.key === selectedCity);

  const mapCenter = selectedCityData
    ? {
      latitude: selectedCityData.latitude,
      longitude: selectedCityData.longitude,
      latitudeDelta: 0.025,
      longitudeDelta: 0.015,
    }
    : {
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: 0.025,
      longitudeDelta: 0.015,
    };
  const mockUser: MockUser = selectedUser ?? {
    name: '',
    profession: '',
    skills: [],
    avatar: null,
    locationText: selectedCityData?.name ?? '',
    latitude: selectedCityData?.latitude ?? 0,
    longitude: selectedCityData?.longitude ?? 0,
  };
  const mapRef = useRef<MapViewType | null>(null);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const platformModalOffset = Platform.select({
    ios: { marginTop: 25 },
    android: { marginTop: -5 },
  });

  const mapFrameHeight = Dimensions.get('window').height * 0.75;

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleCollapse = (category: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleStateCollapse = (state: string) => {
    setCollapsedStates((prev) =>
      prev.includes(state)
        ? prev.filter((s) => s !== state)
        : [...prev, state]
    );
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setCollapsedCategories([]);
  };

  const applyFilters = () => {
    setFilterVisible(false);
  };

  const collapseAllStates = () => setCollapsedStates(Object.keys(groupedCities));
  const expandAllStates = () => setCollapsedStates([]);

  let MapView, Marker;
  if (Platform.OS !== 'web') {
    MapView = require('react-native-maps').default;
    Marker = require('react-native-maps').Marker;
  }

  const selectCity = (cityKey: string) => {
    setSelectedCity(cityKey);
    setCityModalVisible(false);
  };

  if (
    !selectedCityData ||
    !Number.isFinite(selectedCityData.latitude) ||
    !Number.isFinite(selectedCityData.longitude)
  ) {
    console.warn('⚠️ Invalid selectedCityData — skipping render to avoid map crash');
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.fullWidthHeader}>
        <Text style={styles.headerText}>Skill Swap</Text>
      </View>

      <View style={styles.fullWidthDivider} />

      <View style={[styles.mapFrameBase, { height: mapFrameHeight }]}>
        <View style={styles.locationBar}>
          <Pressable onPress={() => setCityModalVisible(true)}>
            <View style={styles.cityPicker}>
              <Text style={styles.locationText}>{mockUser.locationText}</Text>
              <Text style={styles.chevron}>▼</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => setFilterVisible(true)}>
            <Image
              source={FilterIcon}
              style={[
                styles.filterIcon,
                { tintColor: selectedSkills.length > 0 ? '#CBA16B' : '#fff' },
              ]}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <MapView
          key={selectedCity}
          ref={mapRef}
          style={styles.map}
          region={mapCenter}
        >
          {users[selectedCity] && (
            <Marker
              coordinate={{
                latitude: mockUser.latitude,
                longitude: mockUser.longitude,
              }}
              anchor={{ x: 0.5, y: 1 }}
              onPress={async () => {
                if (mapRef.current) {
                  const point = await mapRef.current.pointForCoordinate({
                    latitude: mockUser.latitude,
                    longitude: mockUser.longitude,
                  });
                  setMarkerScreenPosition(point);
                  setProfileVisible(true);
                }
              }}
            >
              <View style={{ alignItems: 'center', marginBottom: 18 }}>
                <Image
                  source={mockUser.avatar}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 18,
                    borderWidth: 2,
                    borderColor: '#222',
                    backgroundColor: '#eee',
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 2 },
                  }}
                  resizeMode="cover"
                />
              </View>
            </Marker>
          )}
        </MapView>

        <Pressable onPress={() => console.log('Toggle view pressed')} style={styles.floatingToggleButton}>
          <View style={styles.toggleButtonInner}>
            <Image source={ToggleIcon} style={styles.toggleImage} resizeMode="contain" />
          </View>
        </Pressable>

        <Modal transparent visible={filterVisible} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={[styles.modalBoxLargeBase, { height: mapFrameHeight }, platformModalOffset]}>

                <TouchableOpacity onPress={() => setFilterVisible(false)} style={styles.closeIcon}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>


                <Text style={styles.modalTitle}>Filter Skills</Text>
                <View style={styles.cityModalAccentBar} />
                <Text style={styles.modalSubtitle}>
                  {`${selectedSkills.length} skill${selectedSkills.length !== 1 ? 's' : ''} selected`}
                </Text>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, paddingHorizontal: 16, marginTop: 12 }}>
                  <TouchableOpacity onPress={clearFilters} style={{ flex: 1, backgroundColor: '#50403e', padding: 8, borderRadius: 6 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Clear Filters</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={applyFilters} style={{ flex: 1, backgroundColor: '#445f50', padding: 8, borderRadius: 6 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Apply Filters</Text>
                  </TouchableOpacity>
                </View>


                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 24, alignItems: 'flex-start' }}
                  overScrollMode="never"
                  bounces={false}
                  style={{ flex: 1, width: '100%' }}
                >
                  <View style={{ marginTop: 16, alignItems: 'flex-start', width: '100%' }}>
                    {Object.entries(skillFilters).map(([category, skills]) => (
                      <View key={category} style={{ marginBottom: 12 }}>
                        <TouchableOpacity onPress={() => toggleCollapse(category)}>
                          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
                            {collapsedCategories.includes(category) ? '▶' : '▼'} {category}
                          </Text>
                        </TouchableOpacity>
                        {!collapsedCategories.includes(category) && (
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {skills.map((skill) => {
                              const selected = selectedSkills.includes(skill);
                              return (
                                <Pressable
                                  key={skill}
                                  onPress={() => toggleSkill(skill)}
                                  style={{
                                    backgroundColor: selected ? '#ACC3EE' : '#eee',
                                    paddingHorizontal: 10,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                    marginRight: 6,
                                    marginBottom: 6,
                                  }}
                                >
                                  <Text style={{ color: selected ? '#222' : '#333', fontSize: 14 }}>
                                    {skill}
                                  </Text>
                                </Pressable>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal transparent visible={cityModalVisible} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setCityModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={[styles.modalBoxLargeBase, { height: mapFrameHeight }, platformModalOffset]}>
                <TouchableOpacity onPress={() => setCityModalVisible(false)} style={styles.closeIcon}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Select City</Text>
                <View style={styles.cityModalAccentBar} />


                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                  marginTop: 0,
                  marginBottom: 12,
                }}>
                  <TouchableOpacity
                    onPress={collapseAllStates}
                    style={{
                      flex: 1,
                      backgroundColor: '#50403e',
                      padding: 8,
                      borderRadius: 6,
                      marginRight: 6
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Collapse All</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={expandAllStates}
                    style={{
                      flex: 1,
                      backgroundColor: '#445f50',
                      padding: 8,
                      borderRadius: 6,
                      marginLeft: 6
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Expand All</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 16 }}
                  overScrollMode="never"
                  bounces={false}
                  style={{ flex: 1, width: '100%' }}
                >
                  {Object.entries(groupedCities).map(([state, cities]) => (
                    <View key={state} style={{ marginBottom: 16 }}>
                      <TouchableOpacity onPress={() => toggleStateCollapse(state)} style={{ paddingHorizontal: 16 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                          {collapsedStates.includes(state) ? '▶' : '▼'} {state}
                        </Text>
                      </TouchableOpacity>

                      {!collapsedStates.includes(state) && (
                        <View style={{ paddingLeft: 32, paddingTop: 4 }}>
                          {cities.map((city: City) => (
                            <TouchableOpacity
                              key={city.key}
                              onPress={() => selectCity(city.key)}
                              style={{ paddingVertical: 4 }}
                            >
                              <Text style={{ fontSize: 15 }}>{city.name.split(',')[0]}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>


        {profileVisible && markerScreenPosition && (
          <TouchableWithoutFeedback onPress={() => setProfileVisible(false)}>
            <View style={StyleSheet.absoluteFillObject}>
              <View style={{ position: 'absolute', top: markerScreenPosition.y - 280, left: markerScreenPosition.x - 120 }}>
                <TouchableWithoutFeedback>
                  <View>
                    <View style={styles.calloutBox}>
                      <View style={styles.calloutAccentBar} />
                      <Text style={styles.calloutName}>{mockUser.name}</Text>
                      <Text style={styles.calloutJob}>{mockUser.profession}</Text>
                      <Text style={styles.skillsLabel}>Skills:</Text>
                      {mockUser.skills.map((skill: string, index: number) => (
                        <Text key={index}>{skill}</Text>
                      ))}
                      <TouchableOpacity
                        style={styles.viewProfileBtn}
                        onPress={() => console.log('View Profile Pressed')}
                      >
                        <Text style={styles.viewProfileBtnText}>View Profile</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.triangle} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 8 },
  fullWidthHeader: {
    paddingTop: Platform.OS === 'ios' ? 64 : 48,
    paddingBottom: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  fullWidthDivider: { height: 1, backgroundColor: '#ccc', marginBottom: 12, width: '100%' },
  headerText: { fontSize: 32, fontWeight: 'bold' },
  mapFrameBase: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#fff',
    position: 'relative',
  },
  map: { width: '100%', height: '100%' },
  locationBar: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  filterIcon: { width: 20, height: 20, tintColor: '#fff' },
  floatingToggleButton: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 10,
  },
  toggleButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f4fdfd',
    borderWidth: 10,
    borderColor: '#b2dfdb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleImage: {
    width: 40,
    height: 40,
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalOverlay: { flex: 1, backgroundColor: '#00000099', justifyContent: 'center', alignItems: 'center' },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    height: '85%',
    width: '90%',
    alignSelf: 'center',
  },
  modalBoxLargeBase: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    alignSelf: 'center',
  },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  modalSubtitle: { fontSize: 14, color: '#555', marginBottom: 4, textAlign: 'center', fontStyle: 'italic' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    width: '100%',
    marginBottom: 12,
  },
  modalOption: { paddingVertical: 10, paddingHorizontal: 16, },
  modalOptionText: { fontSize: 16 },
  modalButtonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 },
  modalButton: { padding: 10, borderRadius: 8, flex: 1, alignItems: 'center', marginHorizontal: 5 },
  applyButton: { backgroundColor: '#4caf50' },
  clearButton: { backgroundColor: '#f44336' },
  applyButtonText: { color: 'white', fontWeight: 'bold' },
  clearButtonText: { color: 'white', fontWeight: 'bold' },
  closeIcon: { position: 'absolute', top: 8, right: 8, zIndex: 1 },
  closeText: { fontSize: 18, fontWeight: 'bold' },
  calloutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    marginTop: 6,
    alignSelf: 'center',
  },
  calloutBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: 240,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  calloutName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calloutJob: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  skillsLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  skillItem: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  viewProfileBtn: {
    backgroundColor: '#9DD4B6',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  viewProfileBtnText: {
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calloutAccentBar: {
    height: 6,
    width: '100%',
    backgroundColor: '#9DD4B6',
    borderRadius: 12,
    marginBottom: 12,
  },
  cityPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    minWidth: 100,
  },
  chevron: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
    marginTop: 2,
  },
  cityModalAccentBar: {
    height: 6,
    width: '85%',
    backgroundColor: '#CBA16B',
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
});
