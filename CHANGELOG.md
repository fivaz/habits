## [1.9.0](https://github.com/fivaz/habits/compare/v1.8.0...v1.9.0) (2026-01-24)

### ✨ Features

* add dark mode to habit form ([eb189c5](https://github.com/fivaz/habits/commit/eb189c58733099901df936e4bebbc62358a8645f))
* add dark mode to habit page ([ecf4e5a](https://github.com/fivaz/habits/commit/ecf4e5a376b7ade5a36493d0d3e6540afc2bd783))
* add dark mode to onboarding ([14c45cb](https://github.com/fivaz/habits/commit/14c45cb4eccfbe709ab820f0f63dfd29b5324714))
* change light background to gray-100 ([acc0e5a](https://github.com/fivaz/habits/commit/acc0e5a18e2598d24c40140eba5741f5091c1ae9))
* improve design of anchor library ([d176638](https://github.com/fivaz/habits/commit/d1766385c780f3d9285a8ed835cc38e0ccead617))
* redesign rehearsal form ([3a276d8](https://github.com/fivaz/habits/commit/3a276d86de506ed31cefb1f42ffc4059e8578fc5))

### 🐛 Bug Fixes

* fix bug of drawer of habit form becoming smaller and smaller in each step ([339d97b](https://github.com/fivaz/habits/commit/339d97bd05fc85abb96b441fef677680bc30310e))
* fix dialog scroll ([915afa5](https://github.com/fivaz/habits/commit/915afa5f72150dcea740f66829e69fc606739c58))
* fix rehearsal form not updating ([283b43a](https://github.com/fivaz/habits/commit/283b43a7e06b7de4d9212e1c1bec1cea3e135f2e))

### 🧹 Chores

* add lint-staged to format files before commit ([f4bcff5](https://github.com/fivaz/habits/commit/f4bcff5789a3d7b83e0b33a1d0e161514d83bd29))
* wip - fix bug of drawer of habit form becoming smaller and smaller in each step ([27c0549](https://github.com/fivaz/habits/commit/27c0549f04a97ae723d28ad5bf0b25eff1f88d9d))

## [1.8.0](https://github.com/fivaz/habits/compare/v1.7.0...v1.8.0) (2026-01-20)

### ✨ Features

* add settings page ([a3e465d](https://github.com/fivaz/habits/commit/a3e465d07d2342a963bdfaa460e900a42072bd89))
* change default colors ([c2ea65a](https://github.com/fivaz/habits/commit/c2ea65a49c5f8abaf8412d4c98d86f1a33719f2e))

## [1.7.0](https://github.com/fivaz/habits/compare/v1.6.0...v1.7.0) (2026-01-20)

### ✨ Features

* make habit form be a drawer on mobile ([215ec10](https://github.com/fivaz/habits/commit/215ec10897fccc6db630529265e2a6daa73f0c64))
* store user's timezone when he register and login ([6d84365](https://github.com/fivaz/habits/commit/6d843657ec1336d90223ee641d5df070f1f33b9a))

### 🐛 Bug Fixes

* show missing rehearsal badge only when it's actually missing ([f44694d](https://github.com/fivaz/habits/commit/f44694dd8ae2c05a934e7a3a8f7f2cd6b80479f0))

## [1.6.0](https://github.com/fivaz/habits/compare/v1.5.0...v1.6.0) (2026-01-20)

### ✨ Features

* add habit log being timezone aware ([c4deb31](https://github.com/fivaz/habits/commit/c4deb31ba8178f4fd218f35c99d6ab84b7b6ac9f))
* add version page ([8b405da](https://github.com/fivaz/habits/commit/8b405da3e4251faf5876fa2584f5e28b752f27cd))
* change name of button at every rehearsal ([b627c99](https://github.com/fivaz/habits/commit/b627c99a621a4649a5759be7cfcb58e8d22948f9))
* implement add rehearsal on existing habits ([ca7e42c](https://github.com/fivaz/habits/commit/ca7e42c172c80dfe66f0c9dd47d793e157028132))
* improve animation of brain when rehearsing ([1bd0356](https://github.com/fivaz/habits/commit/1bd03566e48a83951aacba54242b6c1735fc070a))

### 🧹 Chores

* add rehearsalCount to habit in db ([7447817](https://github.com/fivaz/habits/commit/74478173eaf3877041ba1281bd002047f3f6d272))
* add timezone to user, and unique constraint to daily_log ([1e8f115](https://github.com/fivaz/habits/commit/1e8f11519258332b9395e83519e5a0a4ba95fcd6))
* separate habit creation from habit rehearsal ([9561570](https://github.com/fivaz/habits/commit/95615702b79d0bedcef1912998787b242601db94))

### 🔨 Code Refactoring

* remove unnecessary imports ([257644a](https://github.com/fivaz/habits/commit/257644aa45c2f7340a08f686552d8f2dca809191))

## [1.5.0](https://github.com/fivaz/habits/compare/v1.4.0...v1.5.0) (2026-01-20)

### ✨ Features

* add logo ([aa16caf](https://github.com/fivaz/habits/commit/aa16cafad98db7cf6877379cff4742f1d1c94e9e))
* add the celebration message upon completing a habit ([87dfa21](https://github.com/fivaz/habits/commit/87dfa219453086b266424e783317b8cb6a0ca5f5))
* implement mark habit as done ([e009818](https://github.com/fivaz/habits/commit/e0098180ea10d00a231846e1abbb65cc5d85727f))

### 🐛 Bug Fixes

* fix bug with totalCompletion increasing when undoing a habit ([361a0cd](https://github.com/fivaz/habits/commit/361a0cd3979f378ec083cb12502b414b83826ca0))
* normalize storing the values without their prefix in the db ([63b8546](https://github.com/fivaz/habits/commit/63b8546578834418d3943c31dc533ad4f37a3bb2))
* selected anchor wasn't being highlighted because of prefix ([5a1d0c3](https://github.com/fivaz/habits/commit/5a1d0c3d1de29540744f44b1be7ab45bd4b41639))

### 🚀 Performance Improvements

* remove unnecessary data being sent to the client ([2b69956](https://github.com/fivaz/habits/commit/2b69956b422204cd2197aa2ac346e3a356e1ca9f))

### 🧹 Chores

* add celebration upon completion ([5e54495](https://github.com/fivaz/habits/commit/5e544959668ec0bef322dcc5a1607595fc200aeb))
* add today's log to fetched habits ([46d3eb9](https://github.com/fivaz/habits/commit/46d3eb9abee5de4ce4034fc5286902822bb4f731))

### 🔨 Code Refactoring

* remove old files ([046b410](https://github.com/fivaz/habits/commit/046b410b32e8ead298f40a8ca3d785d48841a9cb))
* remove unnecessary props ([9922a1f](https://github.com/fivaz/habits/commit/9922a1f7d878225f59cc7ec5c02f4b74577af9ee))

## [1.4.0](https://github.com/fivaz/habits/compare/v1.3.0...v1.4.0) (2026-01-20)

### ✨ Features

* add the 3 steps in the habit-card ([be6c0ed](https://github.com/fivaz/habits/commit/be6c0edc0f42e7b603d0d34f842bd5b1de9e5a04))
* implement delete habit ([e3a915b](https://github.com/fivaz/habits/commit/e3a915b95a55ec386901aa22e28848e771c03311))
* implement update habit ([c2973d1](https://github.com/fivaz/habits/commit/c2973d1148c76f50539f6f66233f49d39c1834bb))

### 🧹 Chores

* add habits to seed ([61ee3fe](https://github.com/fivaz/habits/commit/61ee3fe50eef29d4c7ab224fa8c68897dda49e07))
* make enums in db lowercase ([b10a3ce](https://github.com/fivaz/habits/commit/b10a3ced680e45783494738b7ca592a73be30592))

### 💄 Styles

* move files' structure ([b9301c4](https://github.com/fivaz/habits/commit/b9301c4d23c3c36f777829a6e37d64cbc6f2ceb5))

## [1.3.0](https://github.com/fivaz/habits/compare/v1.2.0...v1.3.0) (2026-01-20)

### ✨ Features

* implement add habit ([59db770](https://github.com/fivaz/habits/commit/59db7705b0363d7248c65fc7b5f9fe2d3f0e4504))

### 🧹 Chores

* add 4 steps of create habit form ([634b29d](https://github.com/fivaz/habits/commit/634b29de2fbffc1987294017432b10e4b4eaea42))
* add rehearsal form ([43715b1](https://github.com/fivaz/habits/commit/43715b10b540c6434223d52bfcd46cb758d37be7))
* update field names ([d0ce871](https://github.com/fivaz/habits/commit/d0ce871697681622970326b821c5ff6bef1231f8))

### 🔨 Code Refactoring

* add types and lint files ([8056c86](https://github.com/fivaz/habits/commit/8056c86e3eb731303700c5f6fd51ee47b6d3c4e6))
* refactor habit form ([900b898](https://github.com/fivaz/habits/commit/900b898345f9cf450104f82219a4a3a054705243))

## [1.2.0](https://github.com/fivaz/habits/compare/v1.1.0...v1.2.0) (2026-01-20)

### ✨ Features

* add home page ([6d02e79](https://github.com/fivaz/habits/commit/6d02e796207e31ac143969c008fa9524f14248c9))

### 🧹 Chores

* add habit_recipe and daily_log tables ([cb061b7](https://github.com/fivaz/habits/commit/cb061b76744b88356932b07fd3a52b167b69cfa5))
* add template designs ([a50b372](https://github.com/fivaz/habits/commit/a50b372ea750b2bd6167d98a3b82b947cf512428))
* implement components ([384ce4d](https://github.com/fivaz/habits/commit/384ce4d0ab68dd8760d129abf66806aeaf355250))

## [1.1.0](https://github.com/fivaz/habits/compare/v1.0.0...v1.1.0) (2026-01-20)

### ✨ Features

* add an original green/brown green color palette ([9970833](https://github.com/fivaz/habits/commit/99708330cacf560625b9f27404721fe994d65d83))
* replace icons ([c93021b](https://github.com/fivaz/habits/commit/c93021b5524350965e087f4af0fda6d11070cedd))

### 🧹 Chores

* add a shadcn green color palette ([4a1f8f8](https://github.com/fivaz/habits/commit/4a1f8f88df18c65f747bf147e3d6479b69aee0e5))
* rename app ([33262c5](https://github.com/fivaz/habits/commit/33262c57d6a16f777b6029bfa6226814353b05cf))

## 1.0.0 (2026-01-20)

### 🧹 Chores

* add boilerplate from github.com/fivaz/boilerplate ([efbd815](https://github.com/fivaz/habits/commit/efbd815b2b6fe84264ca076e70d028413fdd1ecb))

## [1.0.1](https://github.com/fivaz/boilerplate/compare/v1.0.0...v1.0.1) (2026-01-19)

### 🧹 Chores

* rename the code to boilerplate ([0ffb81b](https://github.com/fivaz/boilerplate/commit/0ffb81b40b1841535c14c2919ae5e650431720e2))

### 📝 Documentation

* add README ([9fb22b6](https://github.com/fivaz/boilerplate/commit/9fb22b6b751a63ba5d67f992fdf67911521200e6))
* explain how to use the custom hook ([b0aea94](https://github.com/fivaz/boilerplate/commit/b0aea9484ce4a572e1e3363ddc13ab98c99c603b))

### 🔧 Continuous Integration

* add docs commit as a release trigger ([b161a0c](https://github.com/fivaz/boilerplate/commit/b161a0cb895ffe7c84ed99806988dd5b1feddd21))

## 1.0.0 (2026-01-19)

### 🧹 Chores

* first commit ([c299c5e](https://github.com/fivaz/boilerplate/commit/c299c5e8a118ba0bf9b0b3859f09805a4c62d3a0))
