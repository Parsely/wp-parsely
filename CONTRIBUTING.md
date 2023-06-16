# Contributing to the Parse.ly plugin

Thank you for your interest in contributing to the Parse.ly plugin! We hope this document helps you get set up with everything you need to contribute, and we look forward to working with you!

## Reporting issues

Please search the [repo's issues](https://github.com/Parsely/wp-parsely/issues) to see if your issue has been reported already and if so, comment on that issue instead of opening a new one.

When creating a new issue, please add specific steps to reproduce the problem, upload any relevant screenshots, and describe what happened and what you expected would happen instead.

## Contributing code

You are welcome to contribute to the plugin by submitting Pull Requests that fix issues or introduce new features to the Parse.ly plugin.

### Important branches

Ongoing development is being done in the `develop` branch. Merges are performed against the `trunk` branch once considered stable.

To contribute code to this project, fork the repo and open a PR to the `develop` branch. Alternatively, if you have push access to this repo, create a feature branch and then open an intra-repo PR from that branch to `develop`.

### Coding standards

The Parse.ly plugin uses the PHP_CodeSniffer tool that is installed through Composer. This plugin uses a [custom ruleset](https://github.com/Parsely/wp-parsely/blob/develop/.phpcs.xml.dist).

The plugin uses strong types, so be sure to declare `strict_types=1` on new files, and include type definitions for parameters and return types that are compatible with the minimum version of PHP that this plugin supports.

For JavaScript we recommend installing ESLint. This plugin includes a [.eslintrc](https://github.com/Parsely/wp-parsely/blob/develop/.eslintrc) file that defines our coding standards.

### Setting up your IDE / Code Editor

#### VSCode

This plugin uses the [Multi-root Workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) feature provided by VSCode which setup the editor with recommended extensions, settings, launch configurations etc. To open the project using workspace follow these steps:

1. Open project in VSCode.
2. Navigate to `.vscode/wp-parsely.code-workspace`
3. Click on `Open Workspace` button that appears on the bottom right corner of VSCode UI. It should open the plugin in a new workspace window.

### Setting up your local development environment

This plugin uses the `wp-env` package (an [official WP.org package](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)) for local development and testing, that spins up a Docker-based WordPress environment for plugin development.

**Important Note:** If you want to develop for WordPress VIP sites, we recommend using [WordPress VIP dev-env](https://docs.wpvip.com/technical-references/vip-local-development-environment/) instead.

#### Minimum requirements and dependency versions

- Node.js - 16 (LTS)

  Node.js is used in the build process of the Parse.ly plugin. If it's not already installed on your system, you can [visit the Node.js website and install the latest Long Term Support (LTS) version.](https://nodejs.org/).

  If you use [nvm](https://github.com/nvm-sh/nvm) to manage node versions, you can run:

  ```
  nvm install
  nvm use
  ```

- npm - 7

  Node 16 ships with npm version 7, so you don't need to update it manually. In case you don't have the latest version, you can run:

  ```
  npm i -g npm
  ```

  This is important to maintain the integrity of the `package-lock.json` file (we use [`lockfileVersion` 2](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json#lockfileversion)).

- PHP - 7.2–8.2

  There are multiple ways to install PHP on your operating system. You can check out the [official installation instructions from the PHP project's website.](https://www.php.net/manual/en/install.php)

- Composer - 1.x (but 2.x recommended).

  The Parse.ly plugin includes several packages that require Composer, the PHP package manager. You can view the [composer.json](https://github.com/Parsely/wp-parsely/blob/develop/composer.json) file for a full list of packages. You can install Composer through Homebrew on macOS: `brew install composer`. If you don't have access to Homebrew you can view instructions for how to install Composer on the [Composer website](https://getcomposer.org/download/).

- WordPress - 5.0

  You don't need to explicitly install WordPress if you use the provided, Docker-based wp-env.

- Docker 

  Docker installation depends on your OS. [Please follow their official instructions](https://docs.docker.com/get-docker/).

- MySQL

  To run integration tests, you will need a local MySQL installation. If you're using brew, this can be done with `brew install mysql`. Alternatively, you can visit the official [Installing and Upgrading MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html) documentation.

#### Installing dependencies

Once you have Node.js, PHP, and Composer installed locally, you will need to install dependencies in the main plugin directory.

```
cd wp-parsely

# Install PHP dependencies
composer install

# Use the correct Node version
nvm use

# Install JS dependencies
npm install
```

#### Installing integration tests

In order to run integration tests, an installation script must be executed beforehand. For this to succeed, you will need to:

- Have the `svn` command installed into your system. If you don't have it, you can install subversion to get it (`brew install subversion` if you're using brew).
- Create a new dedicated test database in your local MySQL installation. Here we will assume that the database is named `wp_tests` with a username of `root` and an empty (`""`) password.
- If you're on Windows, please also refer to [WINDOWS.md](WINDOWS.md).

To run the installation script:

1. Navigate to the main plugin directory.
2. Run the script:

	```
	./bin/install-wp-tests.sh wp_tests root "" localhost latest true
	```

	If you are using different credentials/settings, the structure of the command is as follows:

	```
	./bin/install-wp-tests.sh <db-name> <db-user> <db-pass> [db-host] [wp-version] [skip-database-creation]"
	```

**Important Notes:**
- It is recommended to always use `latest` as the value for the `wp-version` argument.
- The installation takes place into a temporary directory, which means that the related files will get deleted in a day or so. The way to remediate this is just to re-run the installation script whenever needed.
- The database will be completely overwritten every time integration tests are executed.

#### Installing pcov

To be able to run coverage commands, you'll need to install `pcov`:

```
pecl install pcov
```

Some times, `pcov` does not work out of the box if `PHP` has been installed using Homebrew. Here are some possible troubleshooting steps (version strings should be updated to the ones you're using).

```
# If missing, create a symlink to pcre2.h.
ln -s /opt/homebrew/Cellar/pcre2/10.42/include/pcre2.h /opt/homebrew/Cellar/php@7.4/7.4.33_1/include/php/ext/pcre/pcre2.h

# If the /opt/homebrew/Cellar/php@7.4/7.4.33_1/pecl symlink points to a directory that does not exist, create the directory.
mkdir /opt/homebrew/lib/php/pecl
```

### Developing locally

#### Starting and stopping the built-in wp-env environment

While Docker is running, you have the following commands available:

```
# Start the environment
npm run dev:start

# Stop the environment
npm run dev:stop
```

`npm run dev:start` will start up an environment in `localhost:8888`, running in the background. If you have any issue running the above commands, we recommend checking that you are running an up-to-date version of Docker on your system and that you don't have any other services running on ports 8888 and 8889.

The credentials for entering wp-admin are `admin` and `password`.

#### Making commits

We're leveraging [husky](https://typicode.github.io/husky) to automate some tasks around things like code and commit message quality. You can browse the configured hooks in [this directory](.husky/).

For example, the [coding standards](#coding-standards) and [lint rules](#linting) are applied [prior to commit](.husky/pre-commit). If violations are encountered, the commit is rejected. Please note that this quality assurance process introduces a delay before every commit.

If you're on Windows, you might get an error when trying to make commits. In this case refer to [WINDOWS.md](WINDOWS.md).

#### Modifying and rebuilding plugin assets

JavaScript files that are included in the released plugin are built with the [wp-scripts tool](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/).

By default, the plugin will use the production-built JavaScript and CSS assets in the `build/` folder. This is fine if you don't plan on modifying those files, but if you do, you can start a Node server that will compile your changes on the fly. Once your changes are complete, we ask you to rebuild the production-ready (compressed) ones. Here's the process of modifying and rebuilding the assets:

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

If you haven't installed Composer, you will need to do that first.

To lint your JS code:

```
npm run lint:js

# Fix automatically fixable issues
npm run lint:js -- --fix
```

To lint your CSS code:

```
npm run lint:css

# Fix automatically fixable issues
npm run lint:css -- --fix
```

To lint package.json:

```
npm run lint:pkg-json
```

To lint your PHP code:

```
composer lint
```

To check your code with our code standards:

```
composer cs
```

To fix automatically fixable code based on our coding standards:

```
composer cbf
```

#### Testing

Here are some of the commands that you can use for running tests. You can find a full list of supported commands within [composer.json](composer.json) in the `scripts` and `scripts-descriptions` sections.

##### Unit tests:

```
# Run all single-site unit tests
composer test

# Run all multisite unit tests
composer test-ms
```

##### Integration tests:

```
# Run all single-site integration tests
composer testwp

# You can use double dashes to add PHPUnit parameters
# (this will only run the SettingsPage test):
composer testwp -- --filter SettingsPageTest

# Run all multisite integration tests
composer testwp-ms
```

**Troubleshooting:**
- If you encounter any `require` (class not found) issues, you can fix them by running `composer dump-autoload`.
- If you're getting an error like `ERROR: The WordPress native unit test bootstrap file could not be found. Please set either the WP_TESTS_DIR or the WP_DEVELOP_DIR environment variable, either in your OS or in a custom phpunit.xml file.`, then most probably you need to re-run the integration tests installation script, as the related files get regularly deleted.

##### Code coverage:

```
composer coverage
```

Additional commands can be found within [composer.json](composer.json) in the `scripts` and `scripts-descriptions` sections.

##### JavaScript tests:

```
# Run front-end tests
npm run test
```

Additional commands can be found within [composer.json](composer.json) in the `scripts` and `scripts-descriptions` sections.

##### End-to-end tests:

To run end-to-end tests, [please refer to their separate instructions](tests/e2e/README.md).

### Releasing a new version

To release a new version of the plugin, a GitHub issue with the name of the release (for instance, _Release 3.9.0_) has to be created using the _Release_ template.

After creating the issue, all the steps laid down in that template must be completed. Every time a step is completed, please mark it using the checkbox. Once all steps are done, the issue can be closed.
