import { storage } from '../storage.js';
import { menu } from '../menu.js';

export const stageFour = {
  exec({ from, message }) {
    const address = storage[from].address;
    const phone = from.split('@');

    storage[from].stage = 5;

    let desserts = '';
    let total = 0;
    const items = storage[from].items;
    items.forEach((item, index) => {
      const itemPrice = menu[item.id].price;
      total += itemPrice;
      if (index == items.length - 1) {
        desserts += item.description + '.';
      } else {
        desserts += item.description + ', ';
      }
    });

    const deliveryFee = 5;
    const totalWithFee = total + deliveryFee;

    return `🔔 *NOVO PEDIDO* 🔔: \n\n📞 Cliente: +${
      phone[0]
    } \n 🗒️ *RESUMO DO PEDIDO*: \n\n🍺 Produtos: *${desserts}* \n🚚 Taxa de entrega: *R$${deliveryFee}*. \n📍 Endereço: *${address}* \n💰 Valor Total: *R$${totalWithFee.toFixed(
      2
    )}*. \n⏳ Tempo de entrega: *50 minutos*. \n🛑 Detalhes: *${message}*`;
  },
};
