## Использование

1. Установить пакет

```
npm i @kazanexpress/erp-authorization@github:KazanExpress/erp-authorization
```

2. Подключить стили и установить плагин

```
import '@kazanexpress/erp-authorization/dist/ErpAuth.css';
import { ErpAuth } from "@kazanexpress/erp-authorization";
app.use(ErpAuth)
```

3. Пример использования [./src/app/main/ui/app.vue](https://github.com/KazanExpress/erp-authorization/blob/master/src/app/main/ui/app.vue)

### Props

|        | types                  | required | default         |
| ------ | ---------------------- | -------- | --------------- |
| locale | [EAuthLocales](#types) | false    | EAuthLocales.RU |
| gql    | boolean                | false    | false           |
| isProd | boolean                | false    | false           |

### Events

| name     | payload                   | description                           |
| -------- | ------------------------- | ------------------------------------- |
| on-login | [IAuthAccountDto](#types) | Вызывается после успешной авторизации |

### Types

```ts
export enum EAuthLocales {
  RU = "ru",
  UZ = "uz"
}

export interface IAuthAccountDto {
  accessToken: string;
  tokenType?: string;
  refreshToken: string;
  scope?: string;
  expiresIn?: number;
  userInfo: IAuthUserInfo;
}
```

## Разработка

### Для разработки

```
npm run install
npm run dev
```

#### Для публикации

```
npm run build-bundle
```

После надо закоммитить изменения и создать новый релиз в гитхабе
