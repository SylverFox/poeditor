# POEditor

A simple POEditor API wrapper for Node.js

## Installation

```
yarn add @SylverFox/poeditor
```

## Usage

```ts
import * as POEditor from 'poeditor'

POEditor.projects.list('<api_token>')
  .then({ projects } => console.log(projects))
```

For all available actions, see the [API reference](https://poeditor.com/docs/api)

## License
[MIT](https://choosealicense.com/licenses/mit/)