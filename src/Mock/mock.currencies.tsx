export const data:Record<string, string> = {
    USD: 'Доллар США',
    RUB: 'Русский Рубль',
    EUR: 'Евро',
    GBP : 'Фунт стерлингов',
    AUD : 'Австралийский доллар',
    AZN : 'Азербайджанский манат',
    AMD : 'Армянский драм',
    BYN : 'Белорусский рубль',
    BGN : 'Болгарский лев',
    BRL : 'Бразильский реал',
    HUF : 'Венгерский форинт',
    KRW : 'Вон Республики Корея',
    DKK : 'Датская крона',
    INR : 'Индийская рупия',
    KZT : 'Казахстанский тенге',
    CAD : 'Канадский доллар',
    KGS : 'Киргизский сом',
    CNY : 'Китайский юань',
    MDL : 'Молдавский лей',
    RON : 'Новый румынский лей',
    TMT : 'Новый туркменский манат',
    NOK : 'Норвежская крона',
    PLN : 'Польский злотый',
    SGD : 'Сингапурский доллар',
    TJS : 'Таджикский сомони',
    TRY : 'Турецкая лира',
    UZS : 'Узбекский сум',
    UAH : 'Украинская гривна',
    CZK : 'Чешская крона',
    SEK : 'Шведская крона',
    CHF : 'Швейцарский франк',
    ZAR : 'Южноафриканский рэнд',
    JPY : 'Японская иена'
}
let mockCurrencies:Array<[string, string]> = [];

for(let [key, value] of iterateObject(data) ) {
    mockCurrencies.push([key, value]);
}
function* iterateObject(obj: Record<string, string>)  {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            yield [key, obj[key]];
        }
    }
}
export default  mockCurrencies;