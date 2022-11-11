# Supermarket POS System

# Application Overview

The application is an experminetal React web project for an internship at Foothill. The owner of the supermarket is able to perform CRUD operations on a table of prodcuts and their categories for their business. In addition, his employees at the cashier select a variety of products into a shopping cart where taxes, discounts, and total fees are calculated.

`NOTE: Site is under construction. Please review the issues added to this repository for upcoming updates and features.`

[Demo](https://sumart.netlify.app/)

## Data model

The application contains the following models:

- User can have one of these roles:

  - `ADMIN` can:
    - view/create/edit/delete all products
    - search for a product by its code 
    - view/create/edit/delete all product categories
    - search for a category by its name 
  - `USER` can:
    - view/create/edit/delete a shopping cart
    - add products to the shopping cart from a list of products
    - filter a list of products by category
    - search a list of products by code

- Product: represents an item sold at the supermarket.

- Category: represents the classfication that a product must fall in.

- Shopping Cart: represents the list of products that are automatically calculated during checkout.

## Dependencies used

The application contains the following dependencies:

  - React Router DOM `6.4.3`
  - Bootstrap `2.5.0`
  - Formik `2.2.9`
  - Immer `9.0.16`
  - Prettier `2.7.1`

This project was made using React `18.2.0`.

## Code Architecture

Several design patterns have been researched and by far this project was mostly inspired by alan2207's [bulletproof-react](https://github.com/alan2207/bulletproof-react). I will copy the two most important design concepts I learned below.


# 🗄️ Project Structure

Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # all the global configuration, env variables etc. get exported from here and used in the app
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # re-exporting different libraries preconfigured for the application
|
+-- providers         # all of the application providers
|
+-- routes            # routes configuration
|
+-- stores            # global state stores
|
+-- test              # test utilities and mock server
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

In order to scale the application in the easiest and most maintainable way, keep most of the code inside the `features` folder, which should contain different feature-based things. Every `feature` folder should contain domain specific code for a given feature. This will allow you to keep functionalities scoped to a feature and not mix its declarations with shared things. This is much easier to maintain than a flat folder structure with many files.

A feature could have the following structure:

```sh
src/features/awesome-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- routes      # route components for a specific feature pages
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types for TS specific feature domain
|
+-- utils       # utility functions for a specific feature
|
+-- index.ts    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature
```

Everything from a feature should be exported from the `index.ts` file which behaves as the public API of the feature.

You should import stuff from other features only by using:

`import {AwesomeComponent} from "@/features/awesome-feature"`

and not

`import {AwesomeComponent} from "@/features/awesome-feature/components/AwesomeComponent`

This can also be configured in the ESLint configuration to disallow the later import by the following rule:

```js
{
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@/features/*/*'],
            },
        ],

    // ...rest of the configuration
}
```

This was inspired by how [NX](https://nx.dev/) handles libraries that are isolated but available to be used by the other modules. Think of a feature as a library or a module that is self-contained but can expose different parts to other features via its entry point.


# 🧱 Components And Styling

## Components Best Practices

#### Colocate things as close as possible to where it's being used

Keep components, functions, styles, state, etc. as close as possible to the component where it's being used. This will not only make your codebase more readable and easier to understand but it will also improve your application performance since it will reduce redundant re-renders on state updates.

#### Avoid large components with nested rendering functions

Do not add multiple rendering functions inside your application, this gets out of control pretty quickly. What you should do instead is if there is a piece of UI that can be considered as a unit, is to extract it in a separate component.

```javascript
// this is very difficult to maintain as soon as the component starts growing
function Component() {
  function renderItems() {
    return <ul>...</ul>;
  }
  return <div>{renderItems()}</div>;
}

// extract it in a separate component
function Items() {
  return <ul>...</ul>;
}

function Component() {
  return (
    <div>
      <Items />
    </div>
  );
}
```

#### Stay consistent

Keep your code style consistent. e.g If you name your components by using pascal case, do it everywhere. More on this can be found [here](./style-guide.md)

#### Limit the number of props a component is accepting as input

If your component is accepting too many props you might consider splitting it into multiple components or use the composition technique via children or slots.

[Composition Example Code](../src/components/Elements/ConfirmationDialog/ConfirmationDialog.tsx)

#### Abstract shared components into a component library

For larger projects, it is a good idea to build abstractions around all the shared components. It makes the application more consistent and easier to maintain. Identify repetitions before creating the components to avoid wrong abstractions.

[Component Library Example Code](../src/components/Elements/Button/Button.tsx)

It is a good idea to wrap 3rd party components as well in order to adapt them to the application's needs. It might be easier to make the underlying changes in the future without affecting the application's functionality.

[3rd Party Component Example Code](../src/components/Elements/Link/Link.tsx)

## Component libraries

Every project requires some UI components such as modals, tabs, sidebars, menus, etc. Instead of building those from scratch, you might want to use some of the existing, battle-tested component libraries.

#### Fully featured component libraries:

These component libraries come with their components fully styled.

- [Chakra UI](https://chakra-ui.com/) - great library with probably the best developer experience, allows very fast prototyping with decent design defaults. Plenty of components that are very customizable and flexible with accessibility already configured out of the box.

- [AntD](https://ant.design/) - another great component library that has a lot of different components. Best suitable for creating admin dashboards. However, it might be a bit difficult to change the styles in order to adapt them to a custom design.

- [MUI](https://mui.com/) - the most popular component library for React. Has a lot of different components. Can be used as a styled solution by implementing Material Design or as unstyled headless component library.

#### Headless component libraries:

These component libraries come with their components unstyled. If you have a specific design system to implement, it might be easier and better solution to go with headless components that come unstyled than to adapt a styled components library such as Material UI to your needs. Some good options are:

- [Reakit](https://reakit.io/)
- [Headless UI](https://headlessui.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [react-aria](https://react-spectrum.adobe.com/react-aria/)

## Styling Solutions

There are multiple ways to style a react application. Some good options are:

- [tailwind](https://tailwindcss.com/)
- [styled-components](https://styled-components.com/)
- [emotion](https://emotion.sh/docs/introduction)
- [stitches](https://stitches.dev/)
- [vanilla-extract](https://github.com/seek-oss/vanilla-extract)
- [CSS modules](https://github.com/css-modules/css-modules)
- [linaria](https://github.com/callstack/linaria)

## Good combinations

Some good combinations of component library + styling

- [Chakra UI](https://chakra-ui.com/) + [emotion](https://emotion.sh/docs/introduction) - The best choice for most applications
- [Headless UI](https://headlessui.dev/) + [tailwind](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) + [stitches](https://stitches.dev/)

## Storybook

[Storybook](https://storybook.js.org/) is a great tool for developing and testing components in isolation. Think of it as a catalogue of all the components your application is using. Very useful for developing and discoverability of components.

[Storybook Story Example Code](../src/components/Elements/Button/Button.stories.tsx)

