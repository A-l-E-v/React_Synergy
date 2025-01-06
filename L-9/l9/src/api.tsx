// API ключ храним в .env
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchExchangeRate = async (inCur: string, outCur: string) => {

  // console.log('API call!');

  // let jsonResponse: string;
  // мок-дейта респонза API, т.к. у АПИ ограничение 100 запросов в месяц USD-EUR, USD-RUB
  //      if ((inCur === 'USD') && (outCur === 'RUB')) {
  //        jsonResponse = '{"success":true,"terms":"https://ya.ru","privacy":"https://habr.com","timestamp":1735962436,"source":"USD","quotes":{"USDRUB":110.429105}}';
  //    } else if ((inCur === 'USD') && (outCur === 'EUR')) {
  //     jsonResponse = '{"success":true,"terms":"https://ya.ru","privacy":"https://habr.com","timestamp":1735962436,"source":"USD","quotes":{"USDEUR":0.909090909}}';
  // }
  //    else if (inCur === 'EUR') {
  //        jsonResponse = '{"success":true,"terms":"https://ya.ru","privacy":"https://habr.com","timestamp":1735962436,"source":"EUR","quotes":{"EURUSD":1.1}}'; // Пример для EUR
  //    } else if (inCur === 'GBP') {
  //        jsonResponse = '{"success":true,"terms":"https://ya.ru","privacy":"https://habr.com","timestamp":1735962436,"source":"GBP","quotes":{"GBPUSD":1.3}}'; // Пример для GBP
  //    } else {
  //     jsonResponse = '{"success":true,"terms":"https://ya.ru","privacy":"https://habr.com","timestamp":1735962436,"source":"RUB","quotes":{"RUBUSD":0.009055584}}';
  //   }

  //    const data = JSON.parse(jsonResponse);

  try {
    // это используем после готовности всего остального, в продакшене
    const response = await
      fetch(`http://api.exchangerate.host/live?access_key=${API_KEY}&source=${inCur}&currencies=${outCur}&format=1`);
    const data = await response.json();

    if (!data.success) throw new Error('Ошибка получения курса');
    return data.quotes[`${inCur}${outCur}`];
  } catch (err) {
    throw new Error(`Ошибка получения обменного курса: ${err}`);
  }
};