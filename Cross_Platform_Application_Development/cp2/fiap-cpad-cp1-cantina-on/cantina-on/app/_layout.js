import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SaldoProvider } from './SaldoContext';

export default function Layout(){
  return (
    <SaldoProvider>
      <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#FF007F', 
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarStyle: { backgroundColor: '#0D0D0D', borderTopColor: '#424242' },
        headerStyle: { backgroundColor: '#0D0D0D' },
        headerTintColor: '#FFFFFF',
        headerShown: false 
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          }}
        />
        
        <Tabs.Screen
          name="produtos"
          options={{
            title: 'Produtos',
            tabBarIcon: ({ color }) => <Ionicons name="fast-food" size={24} color={color} />,
          }}
        />
        
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="Desenvolvimento"
          options={{
            href: null, 
            headerShown: false
          }}
        />
              <Tabs.Screen
          name="ajuda"
          options={{
            href: null, 
            headerShown: false, 
          }}
        />

        <Tabs.Screen
          name="carrinho"
          options={{
            href: null,
            headerShown: false, 
          }}
        />

        <Tabs.Screen
          name="addSaldo"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="pagamento"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      </Tabs>
    </SaldoProvider>
  );
}