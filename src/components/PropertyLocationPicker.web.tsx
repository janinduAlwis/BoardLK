import { Text } from 'react-native';

type PropertyLocationPickerProps = {
  region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
  onRegionChange: (region: PropertyLocationPickerProps['region']) => void;
};

export default function PropertyLocationPicker({ region }: PropertyLocationPickerProps) {
  return (
    <Text style={{ color: '#8E8E93', lineHeight: 20, marginBottom: 18 }}>
      Map selection is available on iOS and Android. Coordinates default to Colombo until selected ({region.latitude.toFixed(4)}, {region.longitude.toFixed(4)}).
    </Text>
  );
}
