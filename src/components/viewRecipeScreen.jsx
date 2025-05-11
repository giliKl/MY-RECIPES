// ViewRecipeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, I18nManager } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getRecipeById } from './recipeService';
import { RecipeCategory } from '../models/recipe';
import splashIcon from '../../assets/foody.jpg';

const ViewRecipeScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const jsonValue = await getRecipeById(recipeId);
        if (jsonValue != null) {
          setRecipe(jsonValue);
        }
      } catch (error) {
        console.error('Error loading recipe', error);
      } finally {
        setLoading(false);
      }
    };
    loadRecipe();
  }, [recipeId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FFA500" />;
  }
  if (!recipe) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.text}>אין מידע על המתכון</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View animation="fadeInDown" duration={500} style={styles.imageContainer}>
        <Image
          source={splashIcon}
          style={styles.image}
          resizeMode="cover"
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" duration={800} style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.details}>זמן הכנה: {recipe.preparationTime} דקות</Text>

        <Text style={styles.sectionTitle}>קטגוריות:</Text>
        {recipe.categories.map((category, index) => {
          const hebrewName = RecipeCategory[category] || category;
          return (
            <Text key={index} style={styles.text}>
              {category} - {hebrewName}
            </Text>
          );
        })}
        <Text style={styles.sectionTitle}>מרכיבים:</Text>
        {recipe.ingredients.map((ing, index) => (
          <Text style={styles.text} key={index}>- {ing}</Text>
        ))}

        <Text style={styles.sectionTitle}>הוראות הכנה:</Text>
        <Text style={styles.text}>{recipe.instructions}</Text>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    padding: 20,
    alignItems: 'flex-end',               // יישור ימני ל־RTL
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#FFA500',               // מסגרת כתומה סביב התמונה
  },
  content: {
    alignItems: 'flex-end',
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: '#FFA500',
    marginBottom: 10,
    textAlign: 'right',
  },
  details: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFA500',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'right',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'right',
  },
});

export default ViewRecipeScreen;
