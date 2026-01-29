import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function Dashboard() {
  const router = useRouter();

  // Card animations
  const scaleUser = useRef(new Animated.Value(1)).current;
  const scaleOwner = useRef(new Animated.Value(1)).current;
  const scaleExplore = useRef(new Animated.Value(1)).current;

  // Logo bounce animation
  const logoScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 4,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatePress = (scaleAnim: Animated.Value, callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  return (
    <LinearGradient
      colors={['#14B8A6', '#0EA5E9', '#1E3A8A']}
      style={styles.container}
    >
      {/* Floating Logo + Gradient Text */}
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
        <Image source={require('../assets/splash.jpg')} style={styles.logo} />

        <MaskedView
          maskElement={
            <Text style={[styles.logoText, { backgroundColor: 'transparent' }]}>
              CarHub
            </Text>
          }
        >
          <LinearGradient
            colors={['#3917f7', '#9c4bf8b0', '#9014e2cb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.logoText, { opacity: 0 }]}>CarHub</Text>
          </LinearGradient>
        </MaskedView>

        <View style={styles.glow} />
      </Animated.View>

      {/* User Card */}
      <TouchableWithoutFeedback
        onPress={() => animatePress(scaleUser, () => router.push('/user/login'))}
      >
        <Animated.View style={[styles.card, styles.shadow, styles.cardAccentBlue, { transform: [{ scale: scaleUser }] }]}>
          <BlurView intensity={70} tint="light" style={styles.cardInner}>
            <Ionicons name="person-circle-outline" size={42} color="#38cbf8" />
            <Text style={styles.cardTitle}>User</Text>
            <Text style={styles.cardDesc}>Book cars & manage trips</Text>
          </BlurView>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Owner Card */}
      <TouchableWithoutFeedback
        onPress={() => animatePress(scaleOwner, () => router.push('/owner'))}
      >
        <Animated.View style={[styles.card, styles.shadow, styles.cardAccentGreen, { transform: [{ scale: scaleOwner }] }]}>
          <BlurView intensity={70} tint="light" style={styles.cardInner}>
            <MaterialIcons name="directions-car" size={42} color="#d66a62" />
            <Text style={styles.cardTitle}>Car Owner</Text>
            <Text style={styles.cardDesc}>List your cars & earn</Text>
          </BlurView>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Explore Card */}
      <TouchableWithoutFeedback
        onPress={() => animatePress(scaleExplore, () => router.push('/explore'))}
      >
        <Animated.View style={[styles.card, styles.shadow, styles.cardAccentYellow, { transform: [{ scale: scaleExplore }] }]}>
          <BlurView intensity={70} tint="light" style={styles.cardInner}>
            <FontAwesome5 name="search-location" size={36} color="#FACC15" />
            <Text style={styles.cardTitle}>Explore</Text>
            <Text style={styles.cardDesc}>Browse without login</Text>
          </BlurView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 6,
  },

  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },

  glow: {
    position: 'absolute',
    width: 140,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#38BDF8',
    opacity: 0.25,
    top: 55,
    zIndex: -1,
  },

  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 25,
    textAlign: 'center',
  },

  card: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },

  cardInner: {
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    color: '#1b1a1a',
  },

  cardDesc: {
    fontSize: 14,
    color: '#404142',
    marginTop: 4,
  },

  // Accent borders
  cardAccentBlue: {
    borderColor: '#38BDF8',
    borderWidth: 1.5,
  },
  cardAccentGreen: {
    borderColor: '#d66a62',
    borderWidth: 1.5,
  },
  cardAccentYellow: {
    borderColor: '#FACC15',
    borderWidth: 1.5,
  },

  // Shadow depth
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 15,
    elevation: 12,
  },
});
