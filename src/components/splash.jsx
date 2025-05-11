import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Splash = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}> MyRecipes  </Text>
            <Text style={styles.text}>  🧡🤍🧡 </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFA500',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default Splash;
