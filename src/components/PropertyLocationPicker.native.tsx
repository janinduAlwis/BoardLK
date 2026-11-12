import MapView, { Marker, type Region } from 'react-native-maps';

type PropertyLocationPickerProps = {
  region: Region;
  onRegionChange: (region: Region) => void;
};

export default function PropertyLocationPicker({ region, onRegionChange }: PropertyLocationPickerProps) {
  return (
    <MapView
      style={{ height: 260, borderRadius: 16, marginBottom: 18 }}
      region={region}
      onRegionChangeComplete={onRegionChange}
    >
      <Marker
        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        draggable
        onDragEnd={(event) => onRegionChange({ ...region, ...event.nativeEvent.coordinate })}
      />
    </MapView>
  );
}
