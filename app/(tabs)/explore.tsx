import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import PersonIcon from '../../assets/images/person-marker.png';

const Explore = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.6062,
          longitude: -122.3321,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 47.6062, longitude: -122.3321 }}
          image={PersonIcon}
        >
          <Callout tooltip>
            <View style={styles.callout}>
              <Text style={styles.boldText}>John Smith</Text>
              <Text style={styles.italicText}>Carpenter</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  boldText: { fontWeight: 'bold', fontSize: 14 },
  italicText: { fontStyle: 'italic', fontSize: 12 },
});