import React, { createContext, useContext, useState } from 'react';

const SaldoContext = createContext();

export function SaldoProvider({ children }) {
  // Saldo inicial pode ser alterado conforme necessário
  const [saldo, setSaldo] = useState(45.5);

  const adicionarSaldo = (valor) => {
    setSaldo((prev) => prev + valor);
  };

  return (
    <SaldoContext.Provider value={{ saldo, adicionarSaldo }}>
      {children}
    </SaldoContext.Provider>
  );
}

export function useSaldo() {
  return useContext(SaldoContext);
}
