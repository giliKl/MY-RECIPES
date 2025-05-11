import { NavigationContainer } from '@react-navigation/native';
import RecipeList from './src/components/recipeList';
import Home from './src/components/home';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Splash from './src/components/splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import AddRecipe from './src/components/addRecipe';
import EditRecipeScreen from './src/components/editRecipe';
import { RootSiblingParent } from 'react-native-root-siblings';
import ViewRecipeScreen from './src/components/viewRecipeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  // העברת הפונקציה handleSplashFinish לתוך הקומפוננטה
  const handleSplashFinish = () => {
    setSplashVisible(false); // שימו לב שהפונקציה יכולה כעת לגשת לסטייט
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <RootSiblingParent>
        <NavigationContainer>
          {isSplashVisible ? (
            <Splash onFinish={handleSplashFinish} />
          ) : (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddRecipe" component={AddRecipe} />
            <Stack.Screen name="RecipeList" component={RecipeList} />
            <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
            <Stack.Screen name="RecipeDetails" component={ViewRecipeScreen} />

          </Stack.Navigator>
           )} 
        </NavigationContainer>
        </RootSiblingParent>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,  // גודל המילוי של המסך
    backgroundColor: '#fff',
    width: '100%',  // לוודא שהרוחב תופס את כל המסך
  },
});