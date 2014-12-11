# config_management_sample

## Directories

- `app` : Sample of server-side code.
- `public` : Sample of client-side code.
- `config` : Common configs.

## Usage

> **クライアントサイドJS・サーバサイド間の設定の共有について**  
> [http://qiita.com/axross/items/3bd266602dd0862ae42a](http://qiita.com/axross/items/3bd266602dd0862ae42a)

```
npm run build

node app/app

NODE_ENV=production npm run build

NODE_ENV=production node app/app
```
