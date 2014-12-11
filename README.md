# config_management_sample

## Directories

- `app` : Sample of server-side code.
- `public` : Sample of client-side code.
- `config` : Common configs.

## Usage

> **クライアントサイドJS・サーバサイド間の設定の共有について**
> [http://]()

```
npm run build

node app/app

NODE_ENV=production npm run build

NODE_ENV=production node app/app
```
