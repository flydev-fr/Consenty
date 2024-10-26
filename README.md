# Consenty

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/baumrock/Consenty.svg)](https://github.com/baumrock/Consenty/stargazers)

**A Lightweight Vanilla JavaScript Consent Management Library**

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Why Choose Consenty](#why-choose-consenty)
- [Installation](#installation)
  - [CDN](#cdn)
  - [NPM](#npm)
- [Usage](#usage)
  - [Automatic Initialization (CDN)](#automatic-initialization-cdn)
  - [Manual Initialization (NPM)](#manual-initialization-npm)
- [API Overview](#api-overview)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

---

## Introduction

**Consenty** is a lightweight JavaScript library for managing user consent, perfect for embedding media, managing cookies, and ensuring compliance with privacy regulations.

## Features

- **Lightweight & Dependency-Free**: Minimal footprint with no external dependencies.
- **User-Friendly API**: Easily allow or revoke consents.
- **Automatic CDN Initialization**: Simple setup for HTML files.
- **Compliance-Ready**: Designed to help meet GDPR and privacy standards.
- **Customizable**: Easily adaptable to fit your website's design.

## Why Choose Consenty

Ideal for handling privacy consent requirements without complex platforms or cookie banners. Consenty takes care of user consent management, including setting, revoking, and retrieving permissions.

## Installation

### CDN

Add Consenty directly in your HTML with a `<script>` tag:

```html
<script src="consenty.min.js"></script>
```

### NPM
Install Consenty via npm or yarn for use in module-based projects:

```bash
npm install @baumrock/consenty
# or
yarn add @baumrock/consenty
```

## Usage

### Automatic Initialization (CDN)

When loaded via CDN, Consenty automatically attaches to the global window object (window.consenty) and initializes on DOMContentLoaded.

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Consenty Example</title>
  <!-- Include Consenty via CDN -->
  <script src="consenty.min.js"></script>
</head>
<body>
  <!-- your code... -->
</body>
</html>
```
### Manual Initialization (NPM)

For npm-based projects, import and initialize Consenty manually:

```js
import { Consenty } from 'consenty';

const consenty = new Consenty();
consenty.init();

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', consenty.handleClick.bind(consenty));
  document.addEventListener('change', consenty.handleChange.bind(consenty));
});
```
## API Overview

### Key Methods

- `consenty.init()`: Initializes Consenty and reloads consent states.
- `consenty.allow(prop)`: Grants consent for a specified property.
- `consenty.revoke(prop)`: Revokes consent for a specified property.
- `consenty.isTrue(prop)`: Checks if consent is granted for a specified property.
- `consenty.load(prop)`: Loads content associated with a specified property.
- `consenty.handleClick(event)`: Manages click events related to consent actions.
- `consenty.handleChange(event)`: Manages change events for consent-related inputs.

### HTML Attributes

Use these attributes within your HTML elements to control consent functionality:

- `consenty-allow`: Grants consent when the element is clicked.
- `consenty-revoke`: Revokes consent when the element is clicked.
- `consenty-toggle`: Toggles consent when a checkbox is changed.
- `consenty-if`: Conditionally displays content based on consent status.
- `consenty-show`: Loads content when the element is clicked.

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

For comprehensive usage instructions, visit our [Documentation](https://baumrock.github.io/Consenty).

## Contributing

We welcome contributions! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

Have questions? Open an issue or reach out for support.

## Acknowledgments

Thank you for using Consenty! If you find it helpful, please consider giving us a star on GitHub.
