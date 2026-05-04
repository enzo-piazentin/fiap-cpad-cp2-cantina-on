import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function AjudaSuporte() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnVoltar}>
          <Text style={styles.btnVoltarText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ajuda e Suporte</Text>
        <Text style={styles.subtitle}>Como podemos te ajudar hoje?</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dúvidas Frequentes</Text>
        
        <View style={styles.faqCard}>
          <Text style={styles.faqQuestion}>Como peço reembolso?</Text>
          <Text style={styles.faqAnswer}>Vá até a aba de pedidos, selecione o pedido desejado e clique em "Solicitar Reembolso".</Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.faqQuestion}>Posso agendar uma retirada?</Text>
          <Text style={styles.faqAnswer}>Sim! Na tela de carrinho você pode escolher retirar o lanche no horário do seu intervalo.</Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.faqQuestion}>Minha recarga não caiu, e agora?</Text>
          <Text style={styles.faqAnswer}>Recargas via PIX podem levar até 5 minutos. Se demorar mais, entre em contato no botão abaixo.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ainda precisa de ajuda?</Text>
        
        <TouchableOpacity style={styles.contactBtnWhatsApp} onPress={() => router.push('/Desenvolvimento')}>
          <Text style={styles.contactBtnText}>💬 Falar no WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactBtnEmail} onPress={() => router.push('/Desenvolvimento')}>
          <Text style={styles.contactBtnTextEmail}>✉️ Enviar E-mail para a Cantina</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#0D0D0D',
    borderBottomWidth: 1,
    borderBottomColor: '#424242',
  },
  btnVoltar: {
    marginBottom: 15,
  },
  btnVoltarText: {
    fontSize: 16,
    color: '#FF007F',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#BDBDBD',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  faqCard: {
    backgroundColor: '#0D0D0D',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#424242',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#BDBDBD',
    lineHeight: 20,
  },
  contactBtnWhatsApp: {
    backgroundColor: '#25D366', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactBtnEmail: {
    backgroundColor: '#0D0D0D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF007F',
  },
  contactBtnTextEmail: {
    color: '#FF007F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});