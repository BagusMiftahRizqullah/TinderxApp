import React from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { darkTheme, lightTheme } from './theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api'
import { RootNavigator } from './navigation/root-navigator'

export default function App() {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <RootNavigator />
            </QueryClientProvider>
          </RecoilRoot>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}

