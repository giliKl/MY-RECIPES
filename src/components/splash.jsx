
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // ספריית אייקונים

const Splash = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <View style={styles.container}>
            <View style={styles.centerContent}>
                <Text style={styles.text}>MyRecipes</Text>
                <Text style={styles.text}>🧡🤍🧡</Text>
            </View>

            <View style={styles.iconContainer}>
                <Icon name="facebook" size={30} color="#fff" style={styles.icon} />
                <Icon name="instagram" size={30} color="#fff" style={styles.icon} />
                <Icon name="music" size={30} color="#fff" style={styles.icon} />
            </View> 

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        color: '#FFA500',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    icon: {
        marginHorizontal: 10,
    },
});

export default Splash;
