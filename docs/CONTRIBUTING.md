# Contributing to the Parse.ly plugin

Thank you for your interest in contributing to the Parse.ly plugin! We hope this document helps you get set up with everything you need to contribute, and we look forward to working with you!

## Reporting issues

Please search our [issues](https://github.com/Parsely/wp-parsely/issues) to see if your issue has been reported already and if so, comment on that issue instead of opening a new one. Please do not post private or sensitive information as the repository is public!

When creating a new issue, please add specific steps to reproduce the problem, upload any relevant screenshots, and describe what happened and what you expected would happen instead.

## Contributing code

You are welcome to contribute to the plugin by submitting PRs that fix issues or introduce new features to the Parse.ly plugin.

### Important branches

Ongoing development is being done against the `develop` branch. Release merges are performed against the `trunk` branch. More information about releases can be found in [RELEASING.md](RELEASING.md).

To contribute code to this project, fork the repo and open a PR against the `develop` branch. Alternatively, if you have direct access to our repo, create a feature branch and then open an intra-repo PR from that branch against `develop`.

### Coding standards

The Parse.ly plugin uses the `PHP_CodeSniffer` tool that is installed through `composer`. A [custom ruleset](https://github.com/Parsely/wp-parsely/blob/develop/.phpcs.xml.dist) is used.

The code implements strong types, so be sure to declare `strict_types=1` on new PHP files, and include type definitions for parameters and return types that are compatible with the minimum version of PHP that this plugin supports.

For JavaScript, we recommend installing ESLint. This plugin includes a [.eslintrc](https://github.com/Parsely/wp-parsely/blob/develop/.eslintrc) file that defines our coding standards.

Regarding inline documentation, we do our best to adhere to the [WordPress Inline Documentation Standards](https://developer.wordpress.org/coding-standards/inline-documentation-standards/).

### Code editor

You can use any code editor or IDE to work on the plugin. For VSCode users, we use its [Multi-root Workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) feature which sets up VSCode with some recommended extensions, settings, launch configurations etc. To open the project using the workspace, follow these steps:

1. Open the project in VSCode.
2. Navigate to `.vscode/wp-parsely.code-workspace`
3. Click on `Open Workspace` button that appears on the bottom right corner of VSCode UI. It should open the project in a new workspace window.

### Setting up a local development environment

This plugin uses `wp-env` (an [official WordPress package](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)) for local development and testing, that spins up a Docker-based WordPress environment for plugin development.

**Important Note:** If you want to develop for WordPress VIP sites, we recommend using [WordPress VIP dev-env](https://docs.wpvip.com/technical-references/vip-local-development-environment/) instead.

#### Minimum requirements

This section lists the minimum requirements for setting up a local development environment. However, it is recommended to use updated versions of these tools for the best possible development experience. If anything doesn't seem to work, please let us know.

##### Docker

Docker installation depends on your OS. [Please follow their official instructions](https://docs.docker.com/get-docker/). Please always use the latest possible version.

##### Node.js 16 (LTS)

Node.js is used in the build process of the Parse.ly plugin. If it's not already installed on your system, you can [visit the Node.js website and install the latest Long Term Support (LTS) version](https://nodejs.org/). If you use [nvm](https://github.com/nvm-sh/nvm) to manage node versions, you can run:

```
nvm install
nvm use
```

##### npm 7

Node 16 ships with npm version 7, so you don't need to update it manually. In case you don't have the latest version, you can run:

```
npm i -g npm
```

This is important to maintain the integrity of the `package-lock.json` file (we use [`lockfileVersion` 2](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json#lockfileversion)).

##### PHP 7.4

There are multiple ways to install PHP on your operating system. You can check out the [official installation instructions from the PHP project's website.](https://www.php.net/manual/en/install.php)

##### Composer 1

The Parse.ly plugin includes several packages that require Composer, the PHP package manager. You can view the [composer.json](https://github.com/Parsely/wp-parsely/blob/develop/composer.json) file for a full list of packages. You can install Composer through Homebrew on macOS: `brew install composer`. If you don't have access to Homebrew you can view instructions for how to install Composer on the [Composer website](https://getcomposer.org/download/).

##### WordPress 5.2

You don't need to install WordPress if you use the provided, Docker-based wp-env.

##### MySQL 5.7

To run [integration tests](TESTING.md#php-integration-tests), you will need a local MySQL installation. If you're using brew, this can be done with `brew install mysql`. Alternatively, you can visit the official [Installing and Upgrading MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html) documentation.

#### Installing dependencies

Once Node.js, PHP, and Composer are installed, you will need to install dependencies in the main plugin directory:

```
# Install PHP dependencies.
composer install

# Use the correct Node version.
nvm use

# Install JS dependencies.
npm install
```

### Developing locally

#### Starting and stopping the wp-env environment

While Docker is running, you have the following commands available:

```
# Start the environment.
npm run dev:start

# Stop the environment.
npm run dev:stop
```

`npm run dev:start` will start up an environment in `localhost:8888`, running in the background. If you have any issue running the above commands, we recommend checking that you are running an up-to-date version of Docker on your system and that you don't have any other services running on ports 8888 and 8889.

The credentials for entering wp-admin are `admin` and `password`.

#### Making commits

We're leveraging [husky](https://typicode.github.io/husky) to automate some code quality commands before commits are applied. You can browse the configured hooks in [this directory](../.husky/). For example, the [coding standards](#coding-standards) and [lint rules](#linting) are applied [prior to commit](../.husky/pre-commit). If violations are encountered, the commit is rejected. Please note that this quality assurance process introduces a delay before every commit.

If you're on Windows, you might get an error when trying to make commits. In this case refer to [WINDOWS.md](WINDOWS.md).

#### Modifying and rebuilding plugin assets

JavaScript files that are included in the released plugin are built with the [wp-scripts tool](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/).

By default, the plugin will use the production-built JavaScript and CSS assets in the `build/` folder. This is fine if you don't plan on modifying those files, but if you do, you can start a server that will compile your changes on the fly. Once your changes are complete, we ask you to rebuild the production-ready (compressed) ones. Here's the process of modifying and rebuilding the assets:

1. Install the dependencies:

	```
	npm i
	```

2. Start the build tool:

	```
	npm run start
	```

3. Make and test your changes (assets are rebuilt automatically)
4. When you have completed your changes, stop the `start` script and build the production assets:

	```
	npm run build
	```

When submitting a PR which contains asset modifications, please make sure that it includes any applicable changes to:
- Source files (in the `src` directory)
- Build tooling (including an updated `package-lock.json` if you've altered dependencies)
- Built files (in the `build` directory)

#### Linting

To lint PHP code:

```
composer lint
```

To check PHP code with our coding standards:

```
composer cs
```

To auto-fix PHP code based on our coding standards:

```
composer cbf
```

To perform static analysis on PHP code using PHPStan:

```
composer static-analysis
```

To lint JS code:

```
npm run lint:js

# Fix auto-fixable issues.
npm run lint:js -- --fix
```

To lint package.json:

```
npm run lint:pkg-json
```

To lint CSS code:

```
npm run lint:css

# Fix auto-fixable issues.
npm run lint:css -- --fix
```

#### Testing

For testing instructions, please consult [TESTING.md](TESTING.md).
