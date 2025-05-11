import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RecipeCategory } from '../models/recipe';
import { addRecipe } from './recipeService';
import Toast from 'react-native-root-toast'; // ✅ ייבוא

export default function AddRecipeScreen({ navigation }) {
    const [newRecipe, setNewRecipe] = useState({
        id: Date.now().toString(),
        name: '',
        preparationTime: '',
        instructions: '',
        categories: []
    });
    const [ingredientList, setIngredientList] = useState(['']);
    const [toast, setToast] = useState(null); // ✅ לטוסט

    const categoryItems = Object.entries(RecipeCategory).map(([key, value]) => ({
        label: value,
        value: key,
    }));

    const showToast = (message) => {
        if (toast) {
            Toast.hide(toast);
        }
        const newToast = Toast.show(message, {
            duration: 3000, // 10 שניות
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: 'rgba(22, 21, 20, 0.99)',
            textColor: 'white',
            shadowColor: 'black',
        });
        setToast(newToast);
    };

    const handleIngredientChange = (index, value) => {
        const updatedList = [...ingredientList];
        updatedList[index] = value;
        setIngredientList(updatedList);
    };

    const addIngredientField = () => {
        setIngredientList([...ingredientList, '']);
    };

    const removeIngredientField = (index) => {
        const updatedList = ingredientList.filter((_, i) => i !== index);
        setIngredientList(updatedList);
    };

    const handleCategoryChange = (category) => {
        setNewRecipe(prevRecipe => {
            const updatedCategories = prevRecipe.categories.includes(category)
                ? prevRecipe.categories.filter(c => c !== category)
                : [...prevRecipe.categories, category];
            return { ...prevRecipe, categories: updatedCategories };
        });
    };

    const handleAddRecipe = () => {
        if (!newRecipe.name || !newRecipe.instructions || !newRecipe.preparationTime || ingredientList.some(i => !i)) {
            showToast('יש למלא את כל השדות');
            return;
        }
        if (newRecipe.categories.length === 0) {
            showToast('יש לבחור לפחות קטגוריה אחת');
            return;
        }

        addRecipe({ ...newRecipe, ingredients: ingredientList }).then(() => {
            setNewRecipe({
                id: Date.now().toString(),
                name: '',
                preparationTime: '',
                instructions: '',
                categories: []
            });
            navigation.navigate('Home');
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>הוספת מתכון חדש</Text>

            <TextInput
                style={styles.input}
                placeholder="שם המתכון"
                placeholderTextColor="#888"
                value={newRecipe.name}
                onChangeText={(text) => setNewRecipe({ ...newRecipe, name: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="זמן הכנה (בדקות)"
                keyboardType="numeric"
                value={newRecipe.preparationTime}
                onChangeText={(text) => setNewRecipe({ ...newRecipe, preparationTime: text })}
            />

            <Text style={styles.subTitle}>מרכיבים</Text>
            {ingredientList.map((ingredient, index) => (
                <View style={styles.ingredientContainer} key={index}>
                    <View style={styles.ingredientRow}>
                        <View style={styles.iconContainer}>
                            {index === ingredientList.length - 1 && (
                                <TouchableOpacity style={styles.plusButton} onPress={addIngredientField}>
                                    <MaterialIcons name="add" size={24} color="white" />
                                </TouchableOpacity>
                            )}
                            {index !== 0 && (
                                <TouchableOpacity style={styles.removeButton} onPress={() => removeIngredientField(index)}>
                                    <MaterialIcons name="delete" size={24} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="הכנס מרכיב"
                            placeholderTextColor="#888"
                            value={ingredient}
                            onChangeText={(text) => handleIngredientChange(index, text)}
                        />
                    </View>
                </View>
            ))}

            <Text style={styles.subTitle}>הוראות הכנה</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="כתוב את הוראות ההכנה כאן"
                multiline
                value={newRecipe.instructions}
                onChangeText={(text) => setNewRecipe({ ...newRecipe, instructions: text })}
            />

            <Text style={styles.subTitle}>קטגוריות</Text>
            {categoryItems.map((category) => (
                <View key={category.value} style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => handleCategoryChange(category.value)} style={styles.checkbox}>
                        <MaterialIcons
                            name={newRecipe.categories.includes(category.value) ? 'check-box' : 'check-box-outline-blank'}
                            size={24}
                            color={newRecipe.categories.includes(category.value) ? 'green' : 'gray'}
                        />
                        <Text style={styles.checkboxText}>{category.label}</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity style={styles.buttonAdd} onPress={handleAddRecipe}>
                <Text style={styles.buttonText}>הוסף מתכון</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 20,
        direction: 'rtl'
    },
    title: {
        fontSize: 24,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 18,
        color: '#333',
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 1.5,
        paddingHorizontal: 10,
        borderRadius: 6,
        margin: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    ingredientContainer: {
        marginBottom: 10,
    },
    ingredientRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        margin: 10,
        gap: 3,
    },
    plusButton: {
        backgroundColor: '#FFA500',
        padding: 8,
        borderRadius: 5,
        marginLeft: 3,
    },
    removeButton: {
        backgroundColor: '#FF4500',
        padding: 8,
        borderRadius: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8,
    },
    error: {
        color: 'red',
        marginVertical: 10,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
    },
    buttonAdd: {
        marginTop: 15,
        backgroundColor: '#FFA500',
        paddingTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
