// Utility functions for validation

export const validateNome = (nome) => {
  if (!nome || !nome.trim()) return 'Nome é obrigatório!';
  if (nome.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres!';
  return null;
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email é obrigatório!';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.trim())) return 'Formato de email inválido!';
  return null;
};

export const validateSenha = (senha) => {
  if (!senha) return 'Senha é obrigatória!';
  if (senha.length < 6) return 'Senha deve ter pelo menos 6 caracteres!';
  return null;
};

export const validateConfirmarSenha = (confirmarSenha, senha) => {
  if (!confirmarSenha) return 'Confirmação de senha é obrigatória!';
  if (confirmarSenha !== senha) return 'As senhas não coincidem!';
  return null;
};

// Esse é o genérico para qualquer campo obrigatório (ex: addSaldo, pagamento)
export const validateRequired = (value, label = 'Campo') => {
  if (!value || !String(value).trim()) return `${label} é obrigatório!`;
  return null;
};