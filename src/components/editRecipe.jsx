
// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { RecipeCategory } from '../models/recipe';
// import { getRecipeById, updateRecipe } from './recipeService';

// const EditRecipeScreen = ({ route, navigation }) => {
//   const { recipeId } = route.params;

//   const [name, setName] = useState('');
//   const [time, setTime] = useState('');
//   const [instructions, setInstructions] = useState('');
//   const [ingredients, setIngredients] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const fetched = await getRecipeById(recipeId);
//       if (fetched) {
//         setName(fetched.name);
//         setTime(fetched.preparationTime.toString());
//         setInstructions(fetched.instructions);
//         setIngredients(fetched.ingredients.join(', '));
//         setSelectedCategories(fetched.categories);
//       }
//     };
//     fetchRecipe();
//   }, [recipeId]);

//   const handleToggleCategory = (key) => {
//     setSelectedCategories((prev) =>
//       prev.includes(key)
//         ? prev.filter((c) => c !== key)
//         : [...prev, key]
//     );
//   };

//   const handleSave = async () => {
//     if (!name || !time || !instructions || !ingredients || selectedCategories.length === 0) {
//       setError('אנא מלאי את כל השדות ובחרי לפחות קטגוריה אחת');
//       setTimeout(() => setError(''), 5000);
//       return;
//     }

//     const updated = {
//       id: recipeId,
//       name:name,
//       preparationTime: parseInt(time),
//       instructions:instructions,
//       ingredients: ingredients.split(',').map((i) => i.trim()),
//       categories: selectedCategories,
//     };

//     try {
//       await updateRecipe(recipeId, updated);
//       navigation.goBack();
//     } catch (e) {
//       console.error(e);
//       Alert.alert('שגיאה בשמירה', 'לא ניתן לשמור את השינויים');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Animatable.View animation="fadeInUp" duration={500} style={styles.form}>
//         <Text style={styles.label}>שם המתכון:</Text>
//         <TextInput style={styles.input} value={name} onChangeText={setName} textAlign="right" />

//         <Text style={styles.label}>זמן הכנה (בדקות):</Text>
//         <TextInput style={styles.input} value={time} onChangeText={setTime} keyboardType="numeric" textAlign="right" />

//         <Text style={styles.label}>מרכיבים (מופרדים בפסיקים):</Text>
//         <TextInput style={styles.input} value={ingredients} onChangeText={setIngredients} textAlign="right" />

//         <Text style={styles.label}>הוראות הכנה:</Text>
//         <TextInput
//           style={[styles.input, { height: 100 }]}
//           value={instructions}
//           onChangeText={setInstructions}
//           multiline
//           textAlign="right"
//         />

//         <Text style={styles.label}>קטגוריות:</Text>
//         <View style={styles.categoriesContainer}>
//           {Object.entries(RecipeCategory).map(([key, label]) => (
//             <TouchableOpacity
//               key={key}
//               style={[
//                 styles.checkbox,
//                 selectedCategories.includes(key) && styles.checkboxSelected,
//               ]}
//               onPress={() => handleToggleCategory(key)}
//             >
//               <Text style={styles.checkboxText}>{label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {error ? <Text style={styles.error}>{error}</Text> : null}

//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>שמור שינויים</Text>
//         </TouchableOpacity>
//       </Animatable.View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#000',
//     padding: 20,
//     alignItems: 'center',
//   },
//   form: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//   },
//   label: {
//     color: '#FFA500',
//     fontSize: 16,
//     marginBottom: 5,
//     textAlign: 'right',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#FFA500',
//     backgroundColor: '#fff',
//     color: '#000',
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   categoriesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-end',
//     marginBottom: 15,
//   },
//   checkbox: {
//     borderWidth: 1,
//     borderColor: '#FFA500',
//     borderRadius: 20,
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//     margin: 5,
//   },
//   checkboxSelected: {
//     backgroundColor: '#FFA500',
//   },
//   checkboxText: {
//     color: '#000',
//   },
//   saveButton: {
//     backgroundColor: '#FFA500',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
// });

// export default EditRecipeScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { RecipeCategory } from '../models/recipe';
import { getRecipeById, updateRecipe } from './recipeService';

const EditRecipeScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetched = await getRecipeById(recipeId);
      if (fetched) {
        setName(fetched.name || '');
        setTime(fetched.preparationTime?.toString() || '');
        setInstructions(fetched.instructions || '');
        setIngredients(fetched.ingredients?.join(', ') || '');
        setSelectedCategories(fetched.categories || []);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleToggleCategory = (key) => {
    setSelectedCategories((prev) =>
      prev.includes(key)
        ? prev.filter((c) => c !== key)
        : [...prev, key]
    );
  };

  const handleSave = async () => {
    if (!name || !time || !instructions || !ingredients || selectedCategories.length === 0) {
      setError('אנא מלאי את כל השדות ובחרי לפחות קטגוריה אחת');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const updated = {
      id: recipeId,
      name: name.trim(),
      preparationTime: parseInt(time),
      instructions: instructions.trim(),
      ingredients: ingredients.split(',').map((i) => i.trim()),
      categories: selectedCategories,
    };

    try {
      await updateRecipe(updated);
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert('שגיאה בשמירה', 'לא ניתן לשמור את השינויים');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View animation="fadeInUp" duration={500} style={styles.form}>
        <Text style={styles.label}>שם המתכון:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} textAlign="right" />

        <Text style={styles.label}>זמן הכנה (בדקות):</Text>
        <TextInput style={styles.input} value={time} onChangeText={setTime} keyboardType="numeric" textAlign="right" />

        <Text style={styles.label}>מרכיבים (מופרדים בפסיקים):</Text>
        <TextInput style={styles.input} value={ingredients} onChangeText={setIngredients} textAlign="right" />

        <Text style={styles.label}>הוראות הכנה:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={instructions}
          onChangeText={setInstructions}
          multiline
          textAlign="right"
        />

        <Text style={styles.label}>קטגוריות:</Text>
        <View style={styles.categoriesContainer}>
          {Object.entries(RecipeCategory).map(([key, label]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.checkbox,
                selectedCategories.includes(key) && styles.checkboxSelected,
              ]}
              onPress={() => handleToggleCategory(key)}
            >
              <Text style={styles.checkboxText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>שמור שינויים</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 20,
    height: 'auto',
    alignItems: 'center',
    direction: 'rtl',
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  label: {
    color: '#FFA500',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    margin: 5,
  },
  checkboxSelected: {
    backgroundColor: '#FFA500',
  },
  checkboxText: {
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default EditRecipeScreen;

