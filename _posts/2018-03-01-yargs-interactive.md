# Yargs Interactive: Create CLI tools for humans and non-humans

One of the most amazing things about Node.js is that you can use it to create a wide variety of applications, like powerful, real-time applications, but also simple command line interfaces (CLI) tools.

When creating CLI tools, the first challenge to solve is usability. In other words, **How can I help users to use this tool effectively?**. And for CLI tools, this usually means *what and how many configuration arguments it has*. 

These are the challenges I love to solve because, if you do it, right, your tool is definitely going to be a game changer in the open source community. Now, what I don’t like is to spend my time looking for the right library that will prepare the ground, but not solve, my business logic. This is usually a repetitive, annoying task that you need to do every time you start a new project, no matter which technology you use.

Fortunately, in the Node.js world, some de-facto tools help you with the setup of your CLI. [Yargs](https://www.npmjs.com/package/yargs) is one of them, in charge of parsing the arguments and generating a basic user interface with help and documentation. This simplifies the adoption of your tool for simple scenarios. 

But, as your CLI becomes more complex, more flags and commands will be added, making its use surprisingly difficult for humans. Not only that, *what happens when there are some values that you cannot set by default*, like passwords or any other sensitive information, and/or *when you need direct intervention from users*? [Inquirer](https://www.npmjs.com/package/inquirer) is a useful tool for these cases. It provides a helpful set of prompts to ask questions, like lists, checkboxes, confirms, etc.

In the world we live in, we usually need to automate tasks in CI tools (where *yarn* shines). But we also need useful tools for humans (what *inquirer* does best). **What can you when you need a combination of both worlds? (interactive & non-interactive CLIs).**

# Introducing yargs-interactive

![Yargs Interactive](https://raw.githubusercontent.com/nanovazquez/yargs-interactive/master/assets/yargs-interactive-logo.png)

[Yargs Interactive](https://www.npmjs.com/package/yargs-interactive) is a library that provides interactive (prompt), non-interactive and mixed-mode to CLI tools. It helps you to develop a CLI that can be consumed by users and automated tools (CIs, scripts, etc.).

## How to install it

In your terminal, run the following:

```
npm install -S yargs-interactive
```

Then, wrap your business logic with the following code:

```js
#!/usr/bin/env node
const yargsInteractive = require(‘yargs-interactive’);
const options = {
  name: { type: ‘input’, default: ‘nano’, describe: ‘Enter your name’ },
   likesPizza: { type: ‘confirm’, default: false, describe: ‘Do you like pizza?’ },
};
yargsInteractive()
  .usage(‘$0 <command> [args]’)
  .interactive(options)
  .then((result) => {
    // Your business logic goes here.
    // Get the arguments from the result
    // (e.g. result.name)
  });
```
## How to use it

Let’s say you want to create a CLI named *my-cli.js* and you need to get some information from users to execute it. For this, after wrapping your code with **yargs-interactive** run your CLI with the `--interactive` flag to tell the tool that it needs to prompt questions to the user.

![](https://github.com/nanovazquez/yargs-interactive/raw/master/assets/interactive-with-parameter.gif)

If you want to **use interactive mode always**, just set the `--interactive` parameter to `true` by default in your options.

```js
const options = {
  interactive: { default: true },
  ... /* other options */
};
```

And then call your CLI with no parameters.

```
➜ node my-cli.js
```

**What type of prompts are supported?** It provides all prompt types [Inquirer](https://github.com/SBoudrias/Inquirer.js/#prompt-types) has.

Now, to execute your CLI in automated environments, you only need to send the arguments to the CLI. Or, *pro tip*, use the default values.

```
➜ node my-cli.js --name=”Android 18" --likesPizza
```

If you have set the ` --interactive` argument to `true` by default, don't forget to set it to `false`, as follows:

```
➜ node my-cli.js --name=”Android 18" --likesPizza --no-interactive
```

![Basic usage](https://raw.githubusercontent.com/nanovazquez/yargs-interactive/master/assets/basic-usage.gif)

> **Note:** [there is an open issue in Yargs](https://github.com/yargs/yargs/issues/286#issuecomment-364217260) to include some level of interactive support in the tool. If you want to see this happening, and/or want to help with making it happen, please chime in.
