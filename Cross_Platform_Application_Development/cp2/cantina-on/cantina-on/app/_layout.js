import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout(){
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#FF007F', 
      tabBarInactiveTintColor: '#BDBDBD',
      tabBarStyle: { backgroundColor: '#0D0D0D', borderTopColor: '#424242' },
      headerStyle: { backgroundColor: '#0D0D0D' },
      headerTintColor: '#FFFFFF',
      headerShown: false 
    }}>
        <Tabs.Screen
          name="tabs/index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          }}
        />
        
        <Tabs.Screen
          name="tabs/produtos"
          options={{
            title: 'Produtos',
            tabBarIcon: ({ color }) => <Ionicons name="fast-food" size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="tabs/carrinho"
          options={{
            title: 'Carrinho',
            tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
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
        <Tabs.Screen
          name="auth/cadastro"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="auth/login"
          options={{
            href: null,
            headerShown: false,
          }}
          />
        <Tabs.Screen
          name="components/Button"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="components/Input"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      </Tabs>
  );
}