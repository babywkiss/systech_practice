This repository contains code for practice work.

[Схема базы данных](./docs/database_scheme.md)

### Запуск

- Установить зависимости необходимые для проекта
  `npm install`
- Выполнить миграции базы данных `npx prisma migrate dev`
- Заполнить базу данных тестовыми данными `npx prisma db seed`
- Запустить тестовый сервер с проектом доступный по `localhost:3000`, командой `npx next dev`
