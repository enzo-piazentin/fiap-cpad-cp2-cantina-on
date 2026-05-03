// Application constants

export const APP_COLORS = {
  primary: '#FF007F',
  secondary: '#4B163B',
  background: '#000000',
  cardBackground: '#0D0D0D',
  inputBackground: '#1A1A1A',
  border: '#424242',
  text: '#FFFFFF',
  textSecondary: '#BDBDBD',
  danger: '#FF4444',
  success: '#4CAF50',
};

export const PRODUCT_IMAGES = {
  'Sanduíche Natural': require('../../assets/imagemSanduicheNatural.png'),
  'Mini Pães de Queijo': require('../../assets/imagemMiniPaesDeQueijo.png'),
  'Mini Salgado Assado': require('../../assets/imagemSalgado.png'),
  'Coxinha': require('../../assets/imagemCoxinha.png'),
  'Bolo de Pote Cookies': require('../../assets/imagemBoloDePote.png'),
  'Barra de Chocolate': require('../../assets/imagemBarraDeChocolate.png'),
  'Água Mineral': require('../../assets/imagemAguaMineral.png'),
  'Café Expresso': require('../../assets/imagemCafe.png'),
  'Suco de Laranja': require('../../assets/imagemSucoDeLaranja.png'),
  'Energético': require('../../assets/imagemEnergetico.png'),
  'Coca-Cola': require('../../img/coca.png'),
};

export const STORAGE_KEYS = {
  USER_DATA: 'userData',
  IS_LOGGED_IN: 'isLoggedIn',
  CART_ITEMS: 'cartItems',
};

export const SCREEN_NAMES = {
  CADASTRO: '/auth/cadastro',
  LOGIN: '/auth/login',
  HOME: '/tabs/index',
  PRODUTOS: '/tabs/produtos',
  CARRINHO: '/tabs/carrinho',
  PERFIL: '/tabs/perfil',
  PAGAMENTO: '/pagamento',
};
