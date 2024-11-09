# [1.4.0](https://github.com/lzif/malas/compare/v1.3.0...v1.4.0) (2024-11-09)


### Bug Fixes

* **logger:** improve code formatting for logging ([11686f0](https://github.com/lzif/malas/commit/11686f03095c9c5e431b4d1dc4b8bd6b2c1ad662))
* **parser:** remove unnecessary regex replacements in parseText function ([7260e7b](https://github.com/lzif/malas/commit/7260e7b125626d1563f82a3be80673491fd98e1e))


### Features

* **commands/bikin.ts:** memperbaiki tampilan pesan error dan loading ([9e74768](https://github.com/lzif/malas/commit/9e74768048cfdf41d7be434e61b5b02ca2304c17))
* **commands/jelasin.ts:** menambahkan fitur penjelasan kode ([b8d8ff0](https://github.com/lzif/malas/commit/b8d8ff09d6c3d10503a0a572df94037b4baf3d6a))
* **commands:** add new commands for bikin-docs, jelasin, rapiin, and test ([5eee89c](https://github.com/lzif/malas/commit/5eee89c01ed8aa054fd9a70e4f809a681c8e3417))
* **index.ts:** Implement CLI with improved structure and validation ([57b9e46](https://github.com/lzif/malas/commit/57b9e46a64bae80d0bd093b1e8445cebfd76419a))

# [1.3.0](https://github.com/lzif/malas/compare/v1.2.0...v1.3.0) (2024-11-09)


### Bug Fixes

* **config.ts:** remove unnecessary object destructuring in config file ([397eba8](https://github.com/lzif/malas/commit/397eba876da671cd570854c6520625638e0bb2a3))
* **services/ai.ts:** handle errors from Google Generative AI API ([a4a8973](https://github.com/lzif/malas/commit/a4a89732443192aab5168cc5e0c5f65698950d40))
* **services/ai.ts:** improve error handling for AI generation ([fc5b4f3](https://github.com/lzif/malas/commit/fc5b4f30d1985e9c62f2bc04f3e69dd12af9b649))


### Features

* **commands/jelasin.ts:** add jelasin command ([e62c371](https://github.com/lzif/malas/commit/e62c3714dd024c7af8b8ff20016f1352cec3eada))
* **index.ts:** add support for filepath argument to commands ([ef4b285](https://github.com/lzif/malas/commit/ef4b285e6f6c191c531c5d39fc4ab2af032b266a))
* **package.json:** update build script to output both cjs and esm formats ([2f9d76e](https://github.com/lzif/malas/commit/2f9d76e30825566c762f162d295a6a108ee5dccc))
* **services/logger.ts:** add documentation to log function ([8361781](https://github.com/lzif/malas/commit/836178118b3b3d6c9b25d13e5872919abfcad8ad))
* **services/logger.ts:** add logCode function to display code snippets in the console ([a3b4193](https://github.com/lzif/malas/commit/a3b41935edec833081e91dc4456ad3b29c4df2bd))
* **services:** add parser service to parse text with markdown-style key-value pairs ([83e9a30](https://github.com/lzif/malas/commit/83e9a30255ba8a4399024282b3bf47b54c58746c))

# [1.2.0](https://github.com/lzif/malas/compare/v1.1.0...v1.2.0) (2024-11-05)


### Features

* **commands/bikin:** add confirmation prompt before saving file ([fa1f15d](https://github.com/lzif/malas/commit/fa1f15d826414aaba66f1fe019905650fabb3caf))

# [1.1.0](https://github.com/lzif/malas/compare/v1.0.0...v1.1.0) (2024-11-05)


### Features

* **commands:** add new commands for bikin, bikin-docs, jelasin, rapiin, and test ([6b114cf](https://github.com/lzif/malas/commit/6b114cfcf6afe444f70e9b274d545999d4d0966f))
* **package.json:** add vitest configuration and update test script to run vitest ([736b811](https://github.com/lzif/malas/commit/736b811cc2adea6613fb08ec8de6610c1633094c))
* **services:** add AI, file, and logger services ([afbf1bd](https://github.com/lzif/malas/commit/afbf1bd3937868ea9127caba24fa7b7ea148ea9f))
* **types.ts:** add UserPrompt interface and Command type ([1f35e33](https://github.com/lzif/malas/commit/1f35e334ccef286c8e931e649387c955c6a44bc7))

# 1.0.0 (2024-11-05)

### Features

- **config:** add config file for api key and generation settings ([221c325](https://github.com/lzif/malas/commit/221c325a6a6608c7f4229dea40ab4c5bb14c761b))
- **ConfigManager:** add ConfigManager to manage configuration ([c7b3431](https://github.com/lzif/malas/commit/c7b3431846667b068f37f1110e7c4cfb022a4dfa))
- **index.ts:** update code generation to use new AI result parser ([dc0a61f](https://github.com/lzif/malas/commit/dc0a61f7af2aa4628e9e43c3729b74a79b62cff5))
- **package.json:** add semantic-release for automated releases ([143668c](https://github.com/lzif/malas/commit/143668c79a4e492a93649253b598b4ba613642f2))
- **release:** add release configuration and bump version to 1.2.0 ([ea9bb4c](https://github.com/lzif/malas/commit/ea9bb4c73d4828df50cab10a94efc9ea548398e6))
