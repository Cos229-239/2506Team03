import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
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
import FilterIcon from '../../assets/images/filter-icon.png';
import MockAvatar from '../../assets/images/mock-avatar.png';
import Mock2Avatar from '../../assets/images/mock2-avatar.png';
import ToggleIcon from '../../assets/images/toggle-icon.png';

const users = {
  seattle: {
    name: 'John Smith',
    profession: 'Carpenter',
    skills: ['Woodworking', 'Welding', 'Painting & Drawing'],
    latitude: 47.6062,
    longitude: -122.3321,
    avatar: MockAvatar,
    locationText: 'Seattle, WA',
  },
  newyork: {
    name: 'Enzo Bartolli',
    profession: 'Language Tutor',
    skills: ['Language Tutoring - Italian', 'Fitness Training'],
    latitude: 40.7128,
    longitude: -74.006,
    avatar: Mock2Avatar,
    locationText: 'New York, NY',
  },
};

type CityKey = keyof typeof users;

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
  const mockUser = users[selectedCity];
  const mapRef = useRef<MapViewType | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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

  const clearFilters = () => {
    setSelectedSkills([]);
    setCollapsedCategories([]);
  };

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  let MapView, Marker;
  if (Platform.OS !== 'web') {
    MapView = require('react-native-maps').default;
    Marker = require('react-native-maps').Marker;
  }

  return (
    <View style={styles.container}>
      <View style={styles.fullWidthHeader}>
        <Text style={styles.headerText}>Skill Swap</Text>
      </View>

      <View style={styles.fullWidthDivider} />

      <View style={styles.mapFrame}>
        <Pressable onPress={() => setFilterVisible(true)} style={styles.locationBar}>
          <Text style={styles.locationText}>{mockUser.locationText}</Text>
          <Image
            source={FilterIcon}
            style={[
              styles.filterIcon,
              { tintColor: selectedSkills.length > 0 ? '#CBA16B' : '#fff' },
            ]}
            resizeMode="contain"
          />
        </Pressable>

        <MapView
          ref={mapRef}
          style={styles.map}
          region={{
            latitude: mockUser.latitude,
            longitude: mockUser.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.015,
          }}
        >
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
        </MapView>

        <Pressable onPress={() => console.log('Toggle view pressed')} style={styles.floatingToggleButton}>
          <View style={styles.toggleButtonInner}>
            <Image source={ToggleIcon} style={styles.toggleImage} resizeMode="contain" />
          </View>
        </Pressable>

        <Modal transparent visible={filterVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1, width: '100%' }}
            >
              <View style={[styles.modalBox, { marginTop: 60 }]}>
                <TouchableOpacity onPress={() => setFilterVisible(false)} style={styles.closeIcon}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>

                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.modalTitle}>Switch City</Text>
                  {(Object.keys(users) as CityKey[]).map((key) => (
                    <TouchableOpacity
                      key={key}
                      style={styles.modalOption}
                      onPress={() => {
                        setSelectedCity(key);
                        setFilterVisible(false);
                      }}
                    >
                      <Text style={styles.modalOptionText}>{users[key].locationText}</Text>
                    </TouchableOpacity>
                  ))}

                  <Text style={styles.modalTitle}>Filter Skills</Text>
                  <Text style={styles.modalSubtitle}>
                    {`${selectedSkills.length} skill${selectedSkills.length !== 1 ? 's' : ''} selected`}
                  </Text>
                </View>

                <ScrollView
                  style={{ flexGrow: 1 }}
                  contentContainerStyle={{ paddingBottom: 24, alignItems: 'flex-start' }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  overScrollMode="never"
                  nestedScrollEnabled
                >
                  <View style={{ marginTop: 16, alignItems: 'flex-start', width: '100%' }}>
                    {Object.entries(skillFilters).map(([category, skills]) => (
                      <View key={category} style={{ marginBottom: 12 }}>
                        <TouchableOpacity onPress={() => toggleCollapse(category)}>
                          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
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
                                  <Text style={{ color: selected ? '#222' : '#333', fontSize: 12 }}>
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

                  <View style={styles.modalButtonRow}>
                    <TouchableOpacity onPress={clearFilters} style={[styles.modalButton, styles.clearButton]}>
                      <Text style={styles.clearButtonText}>Clear Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilterVisible(false)} style={[styles.modalButton, styles.applyButton]}>
                      <Text style={styles.applyButtonText}>Apply Filters</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
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
                      {mockUser.skills.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>{skill}</Text>
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
  mapFrame: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#fff',
    height: Dimensions.get('window').height * 0.75,
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
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  modalSubtitle: { fontSize: 12, color: '#555', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    width: '100%',
    marginBottom: 12,
  },
  modalOption: { paddingVertical: 10 },
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
});
