import { menu } from '../menu.js';
import { storage } from '../storage.js';

export const stageTwo = {
  exec({ from, message }) {
    const order =
      '\n-----------------------------------\n#️⃣ - ```FINALIZAR pedido``` \n*️⃣ - ```CANCELAR pedido```';
    if (message === '*') {
      storage[from].stage = 0;
      storage[from].itens = [];

      return '🔴 Pedido *CANCELADO* com sucesso. \n\n ```Volte Sempre!```';
    } else if (message === '#') {
      storage[from].stage = 3;

      return (
        '🗺️ Por favor, informe o *ENDEREÇO*. \n ( ```Rua, Número, Bairro``` ) \n\n ' +
        '\n-----------------------------------\n*️⃣ - ```CANCELAR pedido```'
      );
    } else {
      if (!menu[message]) {
        return `❌ *Código inválido, digite novamente!* \n\n ${order}`;
      }
    }

    storage[from].itens.push(menu[message]);

    const itemsAvailable = Object.keys(menu).map(key => {
      return `${key} - ${menu[key].description} (R$ ${menu[key].price.toFixed(2)})`;
    }).join('\n');

    return (
      `✅ *${menu[message].description}* adicionado ao pedido com sucesso! \n\n` +
      '🛒 *Itens no carrinho:* \n\n' + 
      '\n-----------------------------------\n'
      `${storage[from].itens.map(item => `- ${item.description} (R$ ${item.price.toFixed(2)})`).join('\n')}\n\n` +
      '🍺 *Produtos Disponíveis*: \n\n' +
      `${itemsAvailable}\n\n` + 
      '\n-----------------------------------\n' +
      '```Digite outro código ou escolha uma das opções abaixo:``` \n\n' +
      order
    );
  },
};
