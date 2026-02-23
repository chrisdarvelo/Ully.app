import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../utils/constants';

interface CoffeeFlowerProps {
  size?: number;
  spinning?: boolean;
  bold?: boolean;
  dark?: boolean;
  opacity?: number;
}

/**
 * Premium "Signature" Coffee Blossom
 * Features layered petals with center-vein detail and a high-end gold cluster center.
 */
export default function CoffeeFlower({
  size = 150,
  spinning = false,
  bold = false,
  dark = false,
  opacity = 1
}: CoffeeFlowerProps) {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (spinning) {
      const spin = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        })
      );
      spin.start();
      return () => spin.stop();
    } else {
      Animated.spring(spinAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [spinning, spinAnim]);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const strokeColor = dark ? '#3C3228' : '#FFFFFF';
  const gold = Colors.primary;

  // Narrowed and elongated organic petal shape — matches real coffee blossom
  const petalPath = "M100,100 C104,85 108,60 108,35 C108,15 104,8 100,5 C96,8 92,15 92,35 C92,60 96,85 100,100 Z";
  const veinPath = "M100,100 L100,15"; // Vein extends to petal tip
  
  return (
    <View style={[styles.container, { width: size, height: size, opacity }]}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg 
          width={size} 
          height={size} 
          viewBox="0 0 200 200"
          fill="none"
        >
          <Defs>
            <LinearGradient id="petalGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={strokeColor} stopOpacity={0.9} />
              <Stop offset="100%" stopColor={strokeColor} stopOpacity={1} />
            </LinearGradient>
          </Defs>

          {/* 6 Organic Petals */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <G transform={`rotate(${angle}, 100, 100)`} key={angle}>
              {/* Petal Body */}
              <Path
                d={petalPath}
                fill="url(#petalGrad)"
                stroke={gold}
                strokeWidth={bold ? 1.5 : 0.8}
                strokeOpacity={0.6}
              />
              {/* Petal Vein */}
              <Path
                d={veinPath}
                stroke={gold}
                strokeWidth={0.5}
                strokeOpacity={0.4}
                strokeLinecap="round"
              />
            </G>
          ))}
          
          {/* Gold Cluster Center */}
          <Circle cx="100" cy="100" r="12" fill={gold} fillOpacity={0.15} />
          <Circle cx="100" cy="100" r="6" fill={gold} />

          {/* Organic Stamens - 6 filaments offset from petals */}
          {[30, 90, 150, 210, 270, 330].map((angle) => (
            <G transform={`rotate(${angle}, 100, 100)`} key={`stamen-${angle}`}>
              {/* Filament stalk */}
              <Path
                d="M100,100 Q102,85 100,72"
                stroke={gold}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              {/* Stamen bulb/pollen head */}
              <Circle
                cx="100"
                cy="72"
                r="2.5"
                fill={gold}
              />
            </G>
          ))}

          {/* Dark center core */}
          <Circle cx="100" cy="100" r="3" fill={Colors.background} />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
