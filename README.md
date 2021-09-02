# api-tests

### start

On development mode:

```bash
yarn start
```

On production mode:

```bash
NODE_ENV=production yarn start
```

### testing

#### Locally

```bash
yarn test
```

#### Externally

Start the server

```bash
NODE_ENV=production yarn start
```

Run test for the production URL defined on fixtures

```bash
NODE_ENV=production yarn test
```
