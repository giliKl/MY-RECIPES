
import { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated,
    Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getRecipesByCategory, getRecipes, deleteRecipe } from './recipeService';
import { RecipeCategory } from '../models/recipe';
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';

const RecipeList = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [sortOption, setSortOption] = useState('DEFAULT');

    const fetchRecipes = async () => {
        let result = selectedCategory === 'ALL'
            ? await getRecipes()
            : await getRecipesByCategory(selectedCategory);

        if (sortOption === 'ALPHA') {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        }

        setRecipes(result);
    };

    useEffect(() => {
        fetchRecipes();
    }, [selectedCategory, sortOption]);

    useFocusEffect(
        useCallback(() => {
            fetchRecipes();
        }, [selectedCategory, sortOption])
    );

    const handleDelete = async (id) => {
        await deleteRecipe(id);
        fetchRecipes();
    };

    const categoryItems = [
        { label: 'הצג את כל המתכונים', value: 'ALL' },
        ...Object.entries(RecipeCategory).map(([key, value]) => ({
            label: value,
            value: key,
        })),
    ];

    const sortOptions = [
        { label: 'סדר ברירת מחדל', value: 'DEFAULT' },
        { label: 'סדר א-ב', value: 'ALPHA' },
    ];

    const renderItem = ({ item }) => {
        const scaleAnim = new Animated.Value(1);

        const onPressIn = () => {
            Animated.spring(scaleAnim, {
                toValue: 0.97,
                useNativeDriver: true,
            }).start();
        };

        const onPressOut = () => {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }).start();
        };

        return (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Pressable
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.id })}
                    style={styles.recipeCard}
                >
                    <View style={styles.recipeRowContainer}>
                        {/* תוכן טקסט - בצד ימין */}
                        <View style={styles.recipeContent}>
                            <Text style={styles.recipeName}>{item.name}</Text>
                            <View style={styles.recipeRow}>
                                <MaterialIcons name="schedule" size={20} color="#000" />
                                <Text style={styles.recipeText}> {item.preparationTime} דקות</Text>
                            </View>
                            <Text style={styles.recipeCategories}>
                                {item.categories?.map((key) => RecipeCategory[key]).join(', ')}
                            </Text>
                        </View>

                        {/* אייקונים - בצד שמאל */}
                        <View style={styles.iconColumn}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditRecipe', { recipeId: item.id })}
                                style={styles.iconButton}
                            >
                                <MaterialIcons name="edit" size={22} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
                                <MaterialIcons name="delete" size={22} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>רשימת מתכונים</Text>

            <Dropdown
                style={styles.dropdown}
                data={categoryItems}
                labelField="label"
                valueField="value"
                placeholder="בחר קטגוריה"
                value={selectedCategory}
                onChange={(item) => setSelectedCategory(item.value)}
            />

            <Dropdown
                style={styles.dropdown}
                data={sortOptions}
                labelField="label"
                valueField="value"
                placeholder="בחר סדר הצגה"
                value={sortOption}
                onChange={(item) => setSortOption(item.value)}
            />

            {recipes.length === 0 ? (
                <Text style={styles.emptyText}>לא נמצאו מתכונים</Text>
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        direction: 'rtl', 
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    dropdown: {
        height: 50,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    recipeCard: {
        padding: 15,
        borderRadius: 16,
        marginBottom: 14,
        backgroundColor: '#FFA500',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    recipeRowContainer: {
        flexDirection: 'row-reverse', // טקסט ימין, אייקונים שמאל
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recipeContent: {
        flex: 1,
    },
    recipeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 6,
        textAlign: 'right',
    },
    recipeText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'right',
    },
    recipeRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 4,
    },
    recipeCategories: {
        marginTop: 4,
        color: '#000',
        fontSize: 14,
        textAlign: 'right',
    },
    iconColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        gap: 10,
    },
    iconButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#FFA500',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});

export default RecipeList;
