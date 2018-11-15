# Botas

All heroes have sidekicks and as Dora the Explorer, Intelimetrica has its own sidekick Botas!

Botas is a javascript utilities library to be used in products across the firm.

<img src="https://s3-us-west-2.amazonaws.com/assets-general-im/Botas_azulmdpi3.svg" alt="Botas logo" width="150px">

### Installation
```bash
$ npm install --save botas
```

### Usage
```javascript
// To use utilities from Formatters, General, String or Time
const { separateThousands } = require('botas');

// or using ES6
import { separateThousands } from 'botas';

// then use it
separateThousands(12000); //=>'12,000'
separateThousands('1250000'); //=> '1,250,000'

// To use a random script
const { uploadToS3 } = require('botas/scripts');

// or using ES6
const { uploadToS3 } from 'botas/scripts';
```
### Documentation
Checkout the docs <a href="https://intelimetrica.github.io/botas/">here</a>

### How is the library organized?
Botas has utilities and random scripts

Utilities is divided in 4 areas. `Formatters`, `General`, `String`, `Time`.
- All utilities are exposed in the root of the library, so you don't need to know where a method belongs at the time of importing it.

Random scripts are just that, random scripts.
- This meaning that `Scripts` are not exposed in the root of the library

### Contributing
For bug fixes and extending the library, submit your `Pull Request` with a description of your change and adding the prefix `feature`, `fix` or `refactor` to the name of your branch.

Please, follow the library convention by addering to the following guides:
- Use *two spaces* for identation.
- All methods should have *unit tests*.
- All methods should have *docstrings* with the corresponding documentation.
- All methods are alphabethically ordered in their modules.

Worry about writing the documentation. Don't worry about updating `docs branch`
