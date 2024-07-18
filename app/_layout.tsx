import { Stack } from 'expo-router'
import { DataContextProvider } from '../context/DataContext'

export default function Layout() {
    
    return(
        <DataContextProvider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                    />
                <Stack.Screen
                    name="macros"
                    options={{
                        presentation: 'modal',
                    }} />
            </Stack>
        </DataContextProvider>
    )
}