import { storage } from '../storage.js';

export const stageThree = {
  async exec({ from, message, client }) {
    storage[from].address = message;
    storage[from].stage = 4;

    await client.sendText(
      from,
      '💬 Agora, informe uma *DESCRIÇÃO* \n\n ' +
      '\n-----------------------------------\n*️⃣ - ```CANCELAR pedido```'
    );

    return '';
  },

  async after({ from, message, client }) {
    if (message === '*') {
      storage[from].stage = 0;
      return 'Pedido *CANCELADO* com sucesso. \n Volte Sempre!';
    }

    storage[from].description = message;
    storage[from].stage = 5;

    await client.sendText(
      from,
      `🔊 *Qual é o valor do pedido?*`
    );

    return '';
  },

  async before({ from, message, client }) {
    storage[from].payment = message;
    storage[from].stage = 6;
  
    const total = storage[from].itens.reduce((acc, item) => {
      const itemPrice = menu[item.id].price;
      return acc + itemPrice;
    }, 0);
  
    const deliveryFee = 5.00;
    const totalWithDeliveryFee = total + deliveryFee;
  
    let trocoMsg = '🔊 ```Informe o troco ou diga "Sem troco".```';
  
    if (message.toLowerCase() === 'sem troco') {
      trocoMsg = '🔊 Obrigado por informar.';
      storage[from].change = 0;
    }
  
    await client.sendText(
      from,
      `🗒️ *RESUMO DO PEDIDO*: \n\n🍺 Produtos: *${storage[from].itens.map(item => item.description).join(', ')}* \n🚚 Taxa de entrega: *R$${deliveryFee.toFixed(2)}*. \n📍 Endereço: *${storage[from].address}* \n💰 Valor Total: *R$${totalWithDeliveryFee.toFixed(2)}*. \n⏳ Tempo de entrega: *50 minutos*. \n\n${trocoMsg}`,
      from
    );
  
    return '';
  },
  
};
