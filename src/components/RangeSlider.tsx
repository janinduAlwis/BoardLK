import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, LayoutChangeEvent } from 'react-native';

interface RangeSliderProps {
  min: number;
  max: number;
  initialLow: number;
  initialHigh: number;
  onValueChanged: (low: number, high: number) => void;
}

export default function RangeSlider({ min, max, initialLow, initialHigh, onValueChanged }: RangeSliderProps) {
  const [width, setWidth] = useState(0);
  const [low, setLow] = useState(initialLow);
  const [high, setHigh] = useState(initialHigh);
  
  const lowRef = useRef(low);
  const highRef = useRef(high);
  const startLow = useRef(low);
  const startHigh = useRef(high);
  const widthRef = useRef(0);

  const lowResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startLow.current = lowRef.current;
      },
      onPanResponderMove: (e, gesture) => {
        if (widthRef.current === 0) return;
        const deltaVal = (gesture.dx / widthRef.current) * (max - min);
        let newVal = Math.round(startLow.current + deltaVal);
        newVal = Math.max(min, Math.min(newVal, highRef.current));
        setLow(newVal);
        lowRef.current = newVal;
        onValueChanged(lowRef.current, highRef.current);
      },
    })
  ).current;

  const highResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startHigh.current = highRef.current;
      },
      onPanResponderMove: (e, gesture) => {
        if (widthRef.current === 0) return;
        const deltaVal = (gesture.dx / widthRef.current) * (max - min);
        let newVal = Math.round(startHigh.current + deltaVal);
        newVal = Math.max(lowRef.current, Math.min(newVal, max));
        setHigh(newVal);
        highRef.current = newVal;
        onValueChanged(lowRef.current, highRef.current);
      },
    })
  ).current;

  const lowPercent = ((low - min) / (max - min)) * 100;
  const highPercent = ((high - min) / (max - min)) * 100;

  return (
    <View 
      style={styles.container} 
      onLayout={(e: LayoutChangeEvent) => {
        setWidth(e.nativeEvent.layout.width);
        widthRef.current = e.nativeEvent.layout.width;
      }}
    >
      <View style={styles.track} />
      <View style={[styles.fill, { left: `${lowPercent}%`, width: `${highPercent - lowPercent}%` }]} />
      
      <View 
        style={[styles.thumb, { left: `${lowPercent}%` }]} 
        {...lowResponder.panHandlers} 
      />
      
      <View 
        style={[styles.thumb, { left: `${highPercent}%` }]} 
        {...highResponder.panHandlers} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  track: {
    height: 4,
    backgroundColor: '#EAEAEA',
    borderRadius: 2,
    width: '100%',
    position: 'absolute',
  },
  fill: {
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
    position: 'absolute',
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    transform: [{ translateX: -12 }],
  },
});
