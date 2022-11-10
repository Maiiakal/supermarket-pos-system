# Supermarket POS System

# Application Overview

The application is an experminetal React web project for an internshipa at Foothill. The owner of the supermarket is able to perform CRUD operations on a table of prodcuts and their categories for his business. His employees at the cashier select a variety of products into a shopping cart where taxes, discounts, and total fees are calculated.

`NOTE: Site is under construction. Please review the issues added to this repository for upcoming updates and features.`

[Demo](https://sumart.netlify.app/)

## Data model

The application contains the following models:

- User - can have one of these roles:

  - `ADMIN` can:
    - view/create/edit/delete all products
    - search for a product by its code 
    - view/create/edit/delete all product categories
    - search for a category by its name 
  - `USER` - can:
    - view/create/edit/delete a shopping cart
    - add products to the shopping cart from a list of products
    - filter a list of products by category
    - search a list of products by code

- Product: represents an item sold at the supermarket.

- Category: represents the classfication that a product must fall in.

- Shopping Cart: represents the list of products that are automatically calculated during checkout.

