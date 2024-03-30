This repository contains code for practice work.

[Схема базы данных](./docs/database_scheme.md)

### Запуск

- Заполнить необходимые переменные окружения в файле `.env` в корне папки проекта, `DATABASE_URL` - URI для подключения к БД (в случае sqlite использовать `file:./dev.db`), `SECRET_JWT` -
ключ для генерации jwt токенов (любая строка)  
Пример:
```
DATABASE_URL="file:./dev.db"
SECRET_JWT="someRandomString"
```
- Установить зависимости необходимые для проекта
  `npm install`
- Выполнить миграции базы данных `npx prisma migrate dev`
- Запустить тестовый сервер с проектом доступный по `localhost:3000`, командой `npx next dev`
