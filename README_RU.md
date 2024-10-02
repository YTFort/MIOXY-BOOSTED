![Header](/IMG/logo.png)
<a href="https://github.com/YTFort/MIOXY-BOOSTED/stargazers"><img src="https://badgen.net/github/stars/YTFort/MIOXY-BOOSTED" alt="GitHub stars"/></a>
<a href="https://github.com/YTFort/MIOXY-BOOSTED"><img src="https://badgen.net/github/forks/YTFort/MIOXY-BOOSTED" alt="GitHub forks"/></a>
<a href="https://github.com/YTFort/MIOXY-BOOSTED/releases"><img src="https://badgen.net/github/assets-dl/YTFort/MIOXY-BOOSTED" alt="GitHub download"/></a>
# MIOXY BOOSTED
`MIOXY BOOSTED - Прокси-сервер Minecraft, который позволяет вам заходить на один и тот же сервер с одним и тем же ником, но из разных игровых сессий`

## Контакты создателя
- [Discord](https://discord.gg/bjgpVAxgyE)
- [Youtube](https://youtube.com/c/fortcote)
- [Telegram](https://t.me/FortcoteTG)

## Переводы
| <sub>EN</sub> [English](README.md) | <sub>RU</sub> [Русский](README_RU.md) |
|-------------------------|----------------------------|

## Дисклеймер
> Эта программа создана в образовательных целях и не поощряет вас к ее использованию!

## Основатели
- Оригинал: https://github.com/quickyyy/MIOXY
- Основано на: https://github.com/dest4590/MIOXY

## Поддерживаемые ОС
 * Windows ✅
 * Linux ✅
 * Mac ✅

## Функции
 * Поддерживает Minecraft 1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19 и 1.20
 * Красивый интерфейс
 * Работает на пиратских и лицензионных серверах
 * Если вы добавите сервер в список серверов, он будет выглядеть как оригинал, к которому вы присоединяетесь
 * [Скоро...](https://github.com/YTFort/MIOXY-BOOSTED/discussions/2)

## Видеообзор и руководство по программе
 * [Youtube](https://www.youtube.com/watch?v=_FqpR6GQqsM)

# Установка
* Скачайте последнюю версию [Node.js](https://nodejs.dev)
* Скачайте последний [Release](https://github.com/YTFort/MIOXY-BOOSTED/releases) или `git clone https://github.com/YTFort/MIOXY-BOOSTED.git`
* `cd MIOXY-BOOSTED`
* `npm install`
* Отредактируйте config.json
* `node main.js` или запустите Start.bat

# Использование
 * Отредактируйте config.json
```json
{
  "accountname": "Steve", // - Ник, под которым вы будете играть
  "password": "", // - Если вы играете с лицензией, вы можете войти в свой аккаунт minecraft здесь, если на пиратском сервере, то оставьте это поле пустым
  "host": "mc.hypixel.net", // - Сервер, на который вы будете заходить
  "port": 25565, // - Порт сервера
  "proxyhost": "127.1.1.1", // - Хост прокси-сервера, который будет открыт на локальном хосте
  "proxyport": 25565, // - Порт прокси-сервера
  "version": "1.16.5" // - Версия игры, на которой вы будете играть
}
```
* `node main.js` или запустите Start.bat
* Заходим в первую игровую сессию и присоединяемся к "127.1.1.1:25565" (как вы указали в конфигурации)
* (Если вы добавите сервер в список серверов, он будет выглядеть как оригинал, к которому вы присоединяетесь)
* Переходим на прокси-сервер со второй игровой сессии
* Выходим с первой игровой сессии
* Чтобы вернуться к первой игровой сессии, повторите шаги в обратном порядке
#### Поздравляем, вы узнали, как изменять игровые сессии Minecraft, не покидая сервер

# Консольный интерфейс
* Консольный интерфейс программы выглядит следующим образом:
![Main](/IMG/main.png)

# Поддержите меня
### Пожалуйста, поставьте ⭐ и сделайте форк, если эта программа интересна и информативна для вас
