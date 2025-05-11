
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import splashIcon from '../../assets/food1.jpg'; // תמונה של רקע מטושטש
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');


const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* כותרת עם רקע שחור */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>ברוכים הבאים לעולם של טעמים וריחות</Text>
            </View>
            {/* תיאור עם רקע תמונה מטושטשת */}
            <ImageBackground
                source={splashIcon}
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.3 }}
                blurRadius={3}
            >
                <Text style={styles.description}>
                    באפליקציית המתכונים שלנו 
                    תוכלו ליצור, לגלות ולשתף מתכונים משובחים!
                    בין אם אתם בשלנים מתחילים או שפים מנוסים – 
                    כאן תמצאו השראה ורעיונות.
                    הצטרפו לחוויה קולינרית שלא תשכחו!
                </Text>
            </ImageBackground>


            {/* כפתור הוספת מתכון */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddRecipe')}
            >
                <FontAwesome5 name="utensils" size={24} color="black" />
                <Text style={styles.buttonText}>הוספת מתכון חדש</Text>
            </TouchableOpacity>

            {/* כפתור צפייה במתכונים */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('RecipeList')}
            >
                <Ionicons name="book-outline" size={24} color="black" />
                <Text style={styles.buttonText}>צפייה בכל המתכונים</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    titleContainer: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFA500',
        textAlign: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: height * 0.35, // למשל 35% מגובה המסך
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 24,
        padding: 10,
        writingDirection: 'rtl',

    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#FFA500',
        borderRadius: 12,
        padding: 15,
        marginVertical: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Home;
