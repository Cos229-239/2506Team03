import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
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
    longitude: -74.0060,
    avatar: Mock2Avatar,
    locationText: 'New York, NY',
  },
};

const skillFilters = {
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

type CityKey = keyof typeof users;

const Explore = () => {
  const [selectedCity, setSelectedCity] = useState<CityKey>('seattle');
  const [filterVisible, setFilterVisible] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  const mockUser = users[selectedCity];

const toggleSkill = (skill: string) => {
  setSelectedSkills((prev) =>
    prev.includes(skill)
      ? prev.filter((s) => s !== skill)
      : [...prev, skill]
  );
};

const toggleCollapse = (category: string) => {
  setCollapsedCategories((prev) =>
    prev.includes(category)
      ? prev.filter((c) => c !== category)
      : [...prev, category]
  );
};

  const clearFilters = () => {
    setSelectedSkills([]);
    setCollapsedCategories([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fullWidthHeader}>
        <Text style={styles.headerText}>Skill Swap</Text>
      </View>
      <View style={styles.fullWidthDivider} />

      <View style={styles.mapFrame}>
        <Pressable onPress={() => setFilterVisible(true)} style={styles.locationBar}>
          <Text style={styles.locationText}>{mockUser.locationText}</Text>
          <Image source={FilterIcon} style={styles.filterIcon} resizeMode="contain" />
        </Pressable>

        <MapView
          style={styles.map}
          region={{
            latitude: mockUser.latitude,
            longitude: mockUser.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.015,
          }}
        >
          <Marker coordinate={{ latitude: mockUser.latitude, longitude: mockUser.longitude }}>
            <View>
              <Image
                source={mockUser.avatar}
                style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#fff' }}
              />
            </View>

            <Callout tooltip>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.callout}>
                  <View style={styles.headerBar} />
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.boldText}>{mockUser.name}</Text>
                    <Text style={styles.italicText}>{mockUser.profession}</Text>
                  </View>
                  <View style={{ height: 8 }} />
                  <Text style={styles.skillsLabel}>Skills:</Text>
                  <View style={styles.skillsList}>
                    {mockUser.skills.map((skill, index) => (
                      <Text key={index} style={styles.skillItem}>{skill}</Text>
                    ))}
                  </View>
                  <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <Pressable
                      style={({ pressed }) => [styles.viewProfileButton, pressed && styles.viewProfileButtonPressed]}
                      onPress={() => console.log('View Profile pressed')}
                    >
                      <Text style={styles.viewProfileText}>View Profile</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.calloutTriangle} />
              </View>
            </Callout>
          </Marker>
        </MapView>

        <Pressable onPress={() => console.log('Toggle view pressed')} style={styles.floatingToggleButton}>
          <View style={styles.toggleButtonInner}>
            <Image source={ToggleIcon} style={styles.toggleImage} resizeMode="contain" />
          </View>
        </Pressable>

        <Modal transparent={true} visible={filterVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <TouchableOpacity onPress={() => setFilterVisible(false)} style={styles.closeIcon}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>✕</Text>
              </TouchableOpacity>

              <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalTitle}>Filter Options</Text>

                <Text style={{ fontSize: 12, color: '#555', marginBottom: 6 }}>
                  {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
                </Text>

                <TextInput
                  placeholder="Search location (future feature)"
                  value={locationSearch}
                  onChangeText={setLocationSearch}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 8,
                    borderRadius: 6,
                    width: '100%',
                    marginBottom: 12,
                  }}
                />

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
                                  backgroundColor: selected ? '#b2dfdb' : '#eee',
                                  paddingHorizontal: 10,
                                  paddingVertical: 6,
                                  borderRadius: 20,
                                  marginRight: 6,
                                  marginBottom: 6,
                                }}
                              >
                                <Text style={{ color: selected ? '#004d40' : '#333', fontSize: 12 }}>{skill}</Text>
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
          </View>
        </Modal>
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
    backgroundColor: '#000000cc',
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
  toggleImage: { width: 40, height: 40 },
  callout: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#222',
    minWidth: 180,
    maxWidth: 260,
    flexShrink: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  calloutTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'center',
    marginTop: -8,
  },
  headerBar: { backgroundColor: '#b2dfdb', height: 4, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginBottom: 6 },
  boldText: { fontWeight: 'bold', fontSize: 20, textAlign: 'center' },
  italicText: { fontStyle: 'italic', fontSize: 14, textAlign: 'center' },
  skillsLabel: { marginTop: 4, fontWeight: 'bold', fontSize: 14, marginBottom: 2, textAlign: 'left', alignSelf: 'flex-start' },
  skillsList: { alignItems: 'flex-start', marginTop: 4 },
  skillItem: { fontSize: 14, marginVertical: 2 },
  viewProfileButton: {
    backgroundColor: '#b2dfdb',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'center',
    flexShrink: 0,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#004d40',
  },
  viewProfileButtonPressed: { backgroundColor: '#a0ccc7', transform: [{ scale: 0.97 }] },
  viewProfileText: { fontSize: 14, fontWeight: 'bold', color: '#004d40' },
  modalOverlay: { flex: 1, backgroundColor: '#00000088', justifyContent: 'center', alignItems: 'center' },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    maxHeight: Dimensions.get('window').height * 0.75,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  modalOption: { paddingVertical: 10 },
  modalOptionText: { fontSize: 16 },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  applyButton: { backgroundColor: '#4caf50' },
  clearButton: { backgroundColor: '#f44336' },
  applyButtonText: { color: 'white', fontWeight: 'bold' },
  clearButtonText: { color: 'white', fontWeight: 'bold' },
  closeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
});