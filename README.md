# Supermarket POS System

# Application Overview

The application is an experminetal React web project for an internship at Foothill. The owner of the supermarket is able to perform CRUD operations on a table of prodcuts and their categories for their business. In addition, his employees at the cashier select a variety of products into a shopping cart where taxes, discounts, and total fees are calculated.

`NOTE: Site is under construction. Please review the issues added to this repository for upcoming updates and features.`

[Demo Link](https://sumart.netlify.app/)

## Data Model

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

## Dependencies

The application contains the following dependencies:

  - React Router DOM `6.4.3`
  - Bootstrap `5.2.2`
  - Formik `2.2.9`
  - Immer `9.0.16`
  - Prettier `2.7.1`
  - Redux: `4.2.0`
  - React-redux: `8.0.5`

This project was made using React `18.2.0`.

## Code Architecture

Several design patterns have been researched and by far this project was mostly inspired by alan2207's [bulletproof-react](https://github.com/alan2207/bulletproof-react). I will copy the key design concepts I tried implementing below:


- [⚙️ Project Configuration](docs/project-configuration.md)
- [👁️ Style Guide](docs/style-guide.md)
- [🗄️ Project Structure](docs/project-structure.md)
- [🧱 Components And Styling](docs/components-and-styling.md)
- [🗃️ State Management](docs/state-management.md)
- [🧪 Testing](docs/testing.md)
- [🚄 Performance](docs/performance.md)
- [🌐 Deployment](docs/deployment.md)
