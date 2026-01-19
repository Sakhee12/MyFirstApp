import { LinearGradient } from "expo-linear-gradient";
import { Shield } from "lucide-react-native";
import { useRef, useState } from "react";
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const tiers = [
  {
    name: "Platinum",
    desc: "The Ultimate Luxury (Rolls Royce, Maybach)",
    bg: ["#1A1A1D", "#198dbb"],
    glow: "#B4B4B4",
  },
  {
    name: "Gold",
    desc: "Premium Performance (BMW, Mercedes, Audi)",
    bg: ["#D4AF37", "#8A6623"],
    glow: "#D4AF37",
  },
  {
    name: "Silver",
    desc: "Executive Comfort (Lexus, Volvo, Tesla)",
    bg: ["#71706E", "#E5E4E2"],
    glow: "#E5E4E2",
  },
];

const cars = [
  {
    name: "Rolls Royce Ghost",
    price: "₹45,000/day",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDxAQDxAQDw4PEA8NDw8PDw8NDw8QFREWGBURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLi0BCgoKDg0OFQ8PFy0dFR0rLS0tKysrLSstKy0tLSsrKy0tKy0tLSsrKystLSsrLSsrLSsrKystLS0tKy0rLSstLf/AABEIALABHgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIDBAUGB//EAEYQAAEDAgIFCAcEBwcFAAAAAAEAAgMEERIhBRMxQVEUIlJhcYGRoQYyQpKxwdEVI1NyBzNDYoLC8BYkY4OTsuEXJXSi8f/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQEBAQAAAAAAAAAAAAAAAAARASH/2gAMAwEAAhEDEQA/APiaaEKoEJoQJCaECQmhAkJoQJCaECQmhAkk0IEhNCBIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhBJCdk7IFZFlIBOyCNkWU8KeFBXZFlZhTwoKrIsrcKWFBXZFlZhSwoK7IsrLJWQV2Qp2SsgihOyLIIoTshAkk0IEhNJAIQhAIQhAIQhAIQhAIQhAIQhBdZMBMKQCBAJgKQCkAqIhqeFTAUg1BXhRhVoajCgqwowq2yMKCnCkWq/ClhQUFqWFXFqVkFJao4VcQokKCohKytIUSEFdkrKwhRIQQQpWSIQRQmhAkk0IEhNJAIQhAIQhAIQhAIQhBoCmFWCpgoLAphVtKsaqJAKQCQUggYCLJhNBGyLKdkrIIWSIVlkiEFZCiQrCq5ZGtF3dwG0oEGEmwBJ3AC5K1x6JmdtaGDjI5rPLauWa1/sksHBpI8TvTZUneoOyzQZPrTwN7HF/wAAtMXo9CfWqx/BDIfiuTDUroU1SqOlF6MUp2z1B/LGxvxC2w+iNEd9W7vgHzWelqetdqiqOtEVRehNCf2dYf8AMhH8yvb6B0B/ZVvdJCf512KWoC6kFQFR5b/p7o87W17fcd8Lqt/6OtHfj6QZ20z3DxES9zHULRHKg+bv/RtQXH/dNX1TRtjJ94tWbTP6LHQsMkNbHI21wJGFoOV/WaTlbqX1ZzgQb8F5WaZobJELBglkAaAMIBlOVvFJhXxmv0ZLBm9oLL2EkbhJETwxNyv1GxWNfT9LxRF5DRhxXY7MuGey9zmL7tma8ZpfQhZdzBb9y9wfynj1dtlIrhpJpKAQhCKEIQgEIQgsBUwVSCpgoL2lWNKztKm1yI0AqYKoa5WAqi0FSVYcptadwJ7igkhVveBkcjw3pa5vE+CCbnAC5NgFVFUscSMQFgTmHC/UMtqhOWvFudtvlZQjpBuJHWSLqCc05zwC5Frnc25sFzHuJNybldWKiAy1thJdrt42Ei/eAro9G07fWcT/ABW+ARXEumCu8YqMexftkkPwKP7n+CPel+qQceN63U8i2h9J+A3xk+qsZLTboW+L/qiJ00y6tNU2XMFXSt2taP43fVaqapjflHBLIf8ADZM9Ud2nretdGHSHWuNBQTu2UVQ0cXlsQ/8AdwW+HQdU7ZDbtniPwuqjrxaR61th0kOK4sfo7W9Bo/zAfkrxoOqG3D7yo7MmlQGnNeSra+wmcTkHOef9Qla6jRNRvN+oYfqvMekr5Iy5gZK0OGJ7pGWZnc4Q8ZbVBmn03EX3c5+Hfgbd3YL2Wh/pBRvvflDQQLgxxSZjYfWHV4LyMoIbuzI2Oa74FMUzzxtsuGvcPEBRY2aZpWfrYX6xjszlgc38zbm2eW0327brlLvUNM4xYSW3x3GJkjTm2wabixaTYHtPFcirgwOyvhdctvtGdi09YNwezrU0xQhCEUJIQoBCEIGmFFNBMFTaVUFMKi4Fb6ake7MRyPttwtcQO2wXPhzcO266dDVTCoIY6VrdWMbYZn05dhjwtddu03w7s9m9XEWYXMywFp/IQk6oyzdh7cl6P0S0mxkofpSs0iymcJI4zFWTtD52YQ8XxAgDEPELb/aWnMzG0lZpQuGN1pq2SaJ7GiR7sbcRFtWGi1tt1R4KClxc4nfmb71pbSxDaW97x9VRUxgSQMtkHC43Wa7PyCnRWbgH/hxntfKZfgAsq0CGAe1F7zVMOhH7SP3mrNjdJFwx04Z2Okry74NWmaUfePvtOlJgT/ihkQ80Fj5ICGatzb4QHm+16hrY+mwb/XC6MFdyZgLSQ6PW1Nmki7o4RTDvuX+JV/2iWObGHEBhoaYZnJtGNcfM+asSuMZIvxY+97T81C0R9qI9jmX8lsrNLvdGSCbmCrecze9ZMHEeAUNJVxdrRtBmtx5kFPkPFBgnpmAgYg0EE3xZG1t57VpotG02RknZK7bq2SDz3nuXKe8iAN3losPzPJt4WXuNAxmnop5YXGORkQptbGSyTFgMkgxjMAvdT910w1VRVbIP1NHGSPa1JkPiQuvF6WVwFmU77cG00nyC5voNp6HHP9qVVc+0bhCG1dTbWZW2O7fBek0XpPRQo5xNLXvqCH6smad7hzeaW2dxv3LWI5knpPpQ5Cln7RQzO/lWSbS2l3Z8mrBbO4op22HWcGxeZ0WJ6mshibrpWOkiaWSzPp9aMQxRiQk2vmAdts7DdP0u0NNHrJeSTUtO2plpna6R8gxXu1jMTQSA3fc32qdI6f8Abeta3FrbjYNhuubUem1c/bM4dhsuU514GdZcfO3yWBKTHfZ6QVT9s8l/zJSaaqSLa+S42HFZcdkmE5ea2TSB4DgLHY4cDx7ClJi505mLdedYG9rTftFl29HQUjmBv3kZzzD8YOfRdkvMNer4pyEpHqZNDZHVSMeD7JOreOy+RPeFxtJaImdjBjIxAStJFrTAWc1t/WDgBsvnYq0aUBjYxseF4cCZWP51rWsWn1hfPblYW3rp0mlHgAPvZwuMYHOF7XLe5E7jwFkl6/S2g45w+Wn5sub3RezJvJbwd1bOxeSIWdxrNRSUkiopIQhAk0kIJBSBUApBBppjzuwFbxCwm5GfEEg+S5sTrXPAD4/8KwV3UPe/4WsTXpNG1c8IwwVVVC0kuwxVMrGEnaS29iVslr6t7Xh1ZUPa5jmOa9zH4muFnNJLb2IJG3evLw6Ut7IP8bfmupBpFj2OIyIyINsleJ1z9IH+8C26CR/ZeJxv4qUYwEHeDGSOuGkufNylU2e4va5pxU+qtiawh2ENscRHWbjiFGcEueQW2L6wj7yL1ZIgyP2u1ZaKnPOjG5smjhbqMbnu87qpjC6MDe6mYy/7z63EPIFaG5OBGHItP6yP2KfA3f0rquO4wDm2a6kvz4/VYHF+/pFQaq0Yi8X9djox2y1RePK6Usl3l99r66XuMQYPMLMHG7SbZOpHHns/Zg49/Eqs4sBGVzE9nrs9Z02Lj0VRojHOaD+Jo6M9zDiCpEl4w45/czyn8zpSz4KeI48WX658vrx7mWZv4qBZzC3IfcCPJzHc4yB7sgb7boM7c5I2nYCwe63Ne00R6UPo2OjgL2sc8yuBe113kAX9Xg0DuXhhJ94TwxeZVxmztv4b1cTXvn/pCq90rh/E75WXPqfTuvdsqZm/llkH8y8e6U8D4t+qqdL/AFdv1VqR16zTE8pdjlkfjsXYpHuxW2Xuc1z6+d77Y3vfncYnOfY95WcVHV5hSMwdYWsRntBClVuqG2hiH7l/Ek/NYGDyXRrDzIxwjZ/tCy08QJAN7OexhttsTnbuugyyQuIxZZ7r5qVI85tPcutQUjXvqg7CY4AWNffAQTJbWddmNkdbeQFhraYMexzCXRvGJjiLEtvYtcNz2nI9xGRCgrJUmuQ7Z1hx8LBQCo1Qy2NyLjPLuVkUtlkBUg5B1YNIuY4EHYsGmWtMpez1ZOfbg72h4596qxXsBtUbuwlr/XY4g3yIv/8AEGYhQIV5CrIUVWUlMhRUEUIQgaYSTQWA813d81JhOAeCrHqu7vmoxvtvsqLQSpvvhPZ2KAlPV3gKxlSPaaO7JVGNSY62xXPkZwPkqy5vAqKWsP8AQC26Ls50mMNNo3FuPJodlYm25YsTeBUmyBt7FwuCD1gjYc0FtfZsjgwWaLZEAkZbL71nxdng36KUkgcbuJJ4lRu3rQJxy3eACjZTBb1qTXt61A6cEZjaCCMrq5zjwb/px/ROGoY0eqST2AeKmKmM7W28/mqihx6m+4z6KFuoeAVzqhm5o7wfqqzUcA0fwoLqeMXuQCBzjkNg3Kphu+4AA4DIBRM5ItlbqyRDtQdGZ2Q/K0eSlo2PFKzPC2M657ibBrWZ+ZsO1wVUrvgPgtWhYGyTMa5xYCTdwAJa1oLnEA77DLrIVGiLQcxo5WwffS8oiNUyF4cI2Br9WSQbOZcm7tgNr7Fm0iyNkbGB7ZJmEE4DjaxhBLruGTnOc4bLgNjbncldStoWwzTxF4ZMYZIonvcLGQuaAHOwgBzm4hiIA2bDmua70fmiF6h0NO7C5jY5Zm62QtN7Brb2yI9a17jikhm1hkeSA3cC5w7XBt/9oVdlJjCQDlsUxE7gPEIIAIsrRE7h5hPVO4eYQQgeA65zADv9pUqp15CbWxsYSL3zAsc1KmbhksQH2a5xaOoXtcpVMrXvJbsF2gk3JF/LsQUFVlWFQcoqshQKmVEoK0IQoGhCEEhsPYkIncElIzlUMMPRKYgedjT4KvXO4p8od0ioLH0sl/1b93sO4digaeT8N/uOUNaeJRrDxPigZhd0Xe6VJgsTiafAqOud0ne8VIVMnTf7zkEn4bGzTfssqCruVSfiP9931RyuT8R/vuQU3SV/KpOm/wB4pcpf0neJQQANhZGE8D4KwVT+N+3NPlbuPkgpseCMJV/LH8R4I5S48FRRZWRHNPWoL7oNMjlp0W52MYC0Pa9hjDiGhziHXbnxsBbrXPEnarnzARsLXHWh+O2FrWsw+rbiSTcnsRHqdHaRBqIKuZ7I2RSYedrC5zsJNxkblpLTd1rnIbFwRT1FO9zHl+BzueQS+GUWJxX2OuLEHbsK31UxqdZS6qGJ0WGSAxRxxY8Itgfb1i4PuHHO+3I5cnlrjEI3C5bzY5LlrwzfEeky5JAOwpumK45rADqUxULNdK6DYKhVyVh2N8SsrroCVWqjfZ7ibklj23vaxc0i/mrqgjc1rc3EYdrhiNnE8TZUUhGME8O22W1EjrADhs7OHxVQiVAlBKiSoAqBTJSRWltMFa2kak1yta9EJtC1TFCxTbIrWyBUZ+RRrHW0rRmw9rT8l1w5qLMO4IPNJL0hp4zuCgaKI7gpFefTZa+ezqXcOj4+CgdGsSDna5nRKRmbwPiugdGN4qJ0W3igwa5vDzUTMOC3nRQ6SR0V+8gwGXqS1nUt/wBlfvI+yj0gg5znXSXS+yXdIeCPsh3SCQc1C6f2O7pBH2M/pDwSDmXTuun9iv6Q8EfYrukPBIOewq21wf671sGhXdMeBUhoh/Tb4FBbLVML3TB8jZLTBsYjuee55bz72Fg4e6udWzl73OIsXuc+222Ik/NdFminb3t90/VXt0a3eQe5VHnsRTDjwK9KKBg4KQpGdSkV5m54HwTAPA+BXpuTt6kjE1IjgQ3BGR90qckbiTYG3ZbyXZLAoOsrBx9Q7gjUOXUcQq3OQc4wOSMJW4uUC5QZw5SD1nuniRWoSKQkWTEjGiNwlTEyw6xPWIN2uT1ywaxGtVG/XJ65YNYjWIN+uRrlg1iNYg365GuWDWI1iDoa5GvXP1iNYg6GvT5SudrU9ag6XKk+Vrma1GsQdPlafK1y9ajWoOnypHKVzNajWoOlylHKTxXN1qNag6XKjxRyorm61GtQdHlSRqVz9alrEG8zqBmWPWJaxBqMqiZFmxpY1BeXpY1RiRiRX//Z",
  },
  {
    name: "BMW M5",
    price: "₹28,000/day",
    image:
      "data:image/jpeg;base64,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"
    },
  {
    name: "Tesla Model S",
    price: "₹22,000/day",
    image:
      "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80",
  },
];


export default function UserExplore() {
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateCard = (tier: string) => {
    setActiveTier(tier);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.05, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  return (
    <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <Text style={styles.header}>Welcome to CarHub</Text>
      <Text style={styles.subHeader}>Your gateway to secure & luxury rides</Text>

      {/* TIERS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
        {tiers.map((tier) => (
          <TouchableOpacity key={tier.name} onPress={() => animateCard(tier.name)} activeOpacity={0.9}>
            <Animated.View
              style={[
                styles.tierWrap,
                activeTier === tier.name && {
                  transform: [{ scale: scaleAnim }],
                  shadowColor: tier.glow,
                  shadowOpacity: 0.9,
                  shadowRadius: 18,
                },
              ]}
            >
              <LinearGradient colors={tier.bg} style={styles.tierCard}>
                <Text style={styles.tierTitle}>{tier.name}</Text>
                <Text style={styles.tierDesc}>{tier.desc}</Text>
                <Text style={styles.badge}>✔ Security Verified</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* RECOMMENDED */}
      <Text style={styles.sectionTitle}>Recommended for You</Text>

      {cars.map((car) => (
        <View key={car.name} style={styles.carCard}>
          <Image source={{ uri: car.image }} style={styles.carImage} />

          <View style={{ flex: 1 }}>
            <Text style={styles.carName}>{car.name}</Text>

            <View style={styles.securityRow}>
              <Shield size={14} color="#22C55E" />
              <Text style={styles.secureText}>100% Secure & Tracked</Text>
            </View>

            <Text style={styles.price}>{car.price}</Text>
          </View>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, backgroundColor: "#0F0F10" },

  header: {
  color: "#fff",
  fontSize: 28,
  marginTop: 0,
  fontWeight: "800",        // Stronger bold
  textAlign: "center",
  letterSpacing: 0.5,      // Luxury spacing
},

subHeader: {
  color: "#e3e9f1",
  fontSize: 13,
  textAlign: "center",
  marginTop: 2,            // Reduced gap
  lineHeight: 18,
},


  tierWrap: {
    marginRight: 14,
    borderRadius: 22,
  },

  tierCard: {
    width: 250,
    height: 160,
    borderRadius: 22,
    padding: 16,
    justifyContent: "space-between",
  },

  tierTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  tierDesc: { color: "#E5E7EB", fontSize: 13 },
  badge: { color: "#22C55E", fontSize: 12 },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 18,
  },

  carCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    alignItems: "center",
  },

  carImage: {
    width: 90,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },

  carName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  secureText: {
    color: "#22C55E",
    fontSize: 12,
    marginLeft: 6,
  },

  price: {
    color: "#D4AF37",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 6,
  },
});
