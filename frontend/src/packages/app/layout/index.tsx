
import { NavigationContainer } from '@react-navigation/native'
import { useMemo } from 'react'
import * as Linking from 'expo-linking'
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';

export function Layout({ children }: { children: React.ReactNode }) {
  return (

      <NavigationContainer
        linking={useMemo(
          () => ({
            prefixes: [Linking.createURL('/')],
            config: {
              initialRouteName: 'home',
              screens: {
                home: '',
                'user-detail': 'user/:id',
              },
            },
          }),
          []
        )}
      >
        {children}
      </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
