# Consenty

[![npm version](https://img.shields.io/npm/v/consenty.svg)](https://www.npmjs.com/package/consenty)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/baumrock/Consenty.svg)](https://github.com/baumrock/Consenty/stargazers)

**A Lightweight Vanilla JavaScript Consent Management Library**

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Why Choose Consenty](#why-choose-consenty)
- [Installation](#installation)
- [Usage](#usage)
  - [Including via CDN](#including-via-cdn)
  - [Installing via NPM](#installing-via-npm)
- [Initialization](#initialization)
  - [Automatic Initialization (CDN)](#automatic-initialization-cdn)
  - [Manual Initialization](#manual-initialization)
- [API Overview](#api-overview)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

---

## Introduction

Welcome to **Consenty**, a sleek and straightforward JavaScript library designed to simplify consent management on your website. Whether you're looking to embed YouTube videos, manage cookies, or handle any other type of user consent, Consenty is here to help.

## Features

- **Lightweight & Dependency-Free**: Minimal footprint without external dependencies.
- **Easy Integration**: Simple API for quick setup and customization.
- **User-Friendly**: Allows users to easily grant or revoke consents.
- **Automatic Initialization**: Seamless setup when included via CDN.
- **Compliance Assistance**: Helps you meet GDPR and other privacy regulations.
- **Customizable**: Adaptable to your website's style and requirements.

## Why Choose Consenty

Managing user consent is essential, especially in regions with strict privacy regulations like the EU. If you've ever thought, "All I want to do is embed a YouTube video on my site. How hard can it be?" you'll appreciate Consenty's simplicity.

Consenty offers a lightweight, easy-to-implement solution for managing user consents without the need for bulky platforms or intrusive cookie banners. We handle the complexities such as interfacing with local storage and providing users with the ability to revoke permissions at any time.

## Installation

Choose the method that best suits your project setup.

### Including via CDN

Include Consenty directly in your HTML file using a `<script>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/consenty/dist/consenty.iife.js"></script>
```

### Installing via NPM
Install Consenty via npm or yarn for use in module-based projects:

- npm
```bash
npm install @baumrock/consenty
```
- yarn
```bash
yarn add @baumrock/consenty
```

## Usage

### Including via CDN

When you include Consenty via a <script> tag from a CDN, it automatically initializes itself on DOMContentLoaded. The Consenty class is attached to the global window object as window.Consenty, and the instance is available as window.consenty.

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Consenty Example</title>
  <!-- Include Consenty via CDN -->
  <script src="https://cdn.jsdelivr.net/npm/consenty/dist/consenty.iife.js"></script>
</head>
<body>
  <!-- Your HTML content with Consenty attributes -->
</body>
</html>
```

Note: No additional initialization code is required when using the CDN version.

### Installing via NPM

After installing via npm, you can import and initialize Consenty in your JavaScript file:

```js
// Import the Consenty class
import Consenty from '@baumrock/consenty';

// Instantiate and initialize Consenty
document.addEventListener('DOMContentLoaded', () => {
  const consenty = new Consenty();
  consenty.init();

  // Bind event listeners
  document.addEventListener('click', consenty.handleClick.bind(consenty));
  document.addEventListener('change', consenty.handleChange.bind(consenty));
});
```

## Initialization

### Automatic Initialization (CDN)

When Consenty is included via a <script> tag from a CDN, it automatically:

- Attaches the Consenty class to window.Consenty.
- Creates an instance and initializes it on DOMContentLoaded.
- Binds necessary event listeners.

#### Accessing the Consenty Instance

If you need to interact with the Consenty instance, it's available globally as window.consenty.

```html
<script>
  // Access the consenty instance if needed
  window.consenty.allow('youtube');
</script>
```

### Manual Initialization
If you prefer to initialize Consenty manually (e.g., when using module imports), you have full control over the initialization process.

Example:
```js
import Consenty from '@baumrock/consenty';

// Instantiate Consenty
const consenty = new Consenty();

// Initialize Consenty
consenty.init();

// Bind event listeners
document.addEventListener('click', consenty.handleClick.bind(consenty));
document.addEventListener('change', consenty.handleChange.bind(consenty));
```

## API Overview

Here are some of the main methods available in the `Consenty` class:

- **`consenty.init()`**: Initializes Consenty and reloads consent states.
- **`consenty.allow(prop)`**: Grants consent for a specific property.
- **`consenty.revoke(prop)`**: Revokes consent for a specific property.
- **`consenty.isTrue(prop)`**: Checks if consent is granted for a property.
- **`consenty.load(prop)`**: Loads content associated with a property.
- **`consenty.handleClick(event)`**: Handles click events for consent-related elements.
- **`consenty.handleChange(event)`**: Handles change events for consent-related inputs.

### Consenty Attributes

Consenty interacts with HTML elements using specific attributes:

- **`consenty-allow`**: Grants consent when the element is clicked.
- **`consenty-revoke`**: Revokes consent when the element is clicked.
- **`consenty-toggle`**: Toggles consent when a checkbox is changed.
- **`consenty-if`**: Conditionally displays content based on consent.
- **`consenty-show`**: Loads content when the element is clicked.


```html
<!-- Button to allow YouTube consent -->
<button consenty-allow="youtube">Allow YouTube Videos</button>

<!-- Checkbox to toggle Google Analytics consent -->
<label>
  <input type="checkbox" consenty-toggle="google_analytics"> Enable Analytics
</label>

<!-- Conditional content based on consent -->
<template consenty-if="youtube">
  <!-- Embedded YouTube video -->
</template>
```

## Documentation

For detailed usage instructions, configuration options, and examples, please visit our [Documentation](https://baumrock.github.io/Consenty).

## Contributing

We welcome contributions from the community!

- **Bug Reports & Feature Requests**: Please use the [issue tracker](https://github.com/baumrock/Consenty/issues).
- **Pull Requests**: Fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

If you have any questions or need assistance, feel free to open an issue or contact us directly.

## Acknowledgments

Thank you for choosing Consenty! If you find it useful, please consider giving us a star on GitHub. Your support helps us continue to improve.

*It's proven to increase your karma and bring eternal happiness (results may vary).*
