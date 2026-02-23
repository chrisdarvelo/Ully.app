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

  // Widened base to eliminate gaps and connect petals naturally
  const petalPath = "M100,100 C115,98 108,60 108,35 C108,15 104,8 100,5 C96,8 92,15 92,35 C92,60 85,98 100,100 Z";
  const veinPath = "M100,100 L100,65";
  
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

          {/* 6 Organic Petals - Fused at base */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <G transform={`rotate(${angle}, 100, 100)`} key={angle}>
              {/* Petal Body */}
              <Path
                d={petalPath}
                fill="url(#petalGrad)"
              />
              {/* Petal Vein */}
              <Path
                d={veinPath}
                stroke={gold}
                strokeWidth={0.5}
                strokeOpacity={0.3}
                strokeLinecap="round"
              />
            </G>
          ))}
          
          {/* Organic Stamens - Smaller filaments */}
          {[30, 90, 150, 210, 270, 330].map((angle) => (
            <G transform={`rotate(${angle}, 100, 100)`} key={`stamen-${angle}`}>
              <Path
                d="M100,100 Q101,90 100,78 L101.5,75 L100,72 L98.5,75 L100,78"
                fill={gold}
                fillOpacity={0.9}
              />
            </G>
          ))}

          {/* Subtle center core - Smaller and less dark (semi-transparent) */}
          <Circle cx="100" cy="100" r="1.5" fill={Colors.background} fillOpacity={0.4} />
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
