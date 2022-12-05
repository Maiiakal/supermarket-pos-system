export const ProductsGenerator = (quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({
      code: i,
      name: `Lettuce ${i}`,
      price: i + 10,
      category: "Food",
      imageURL:
        "https://images.eatthismuch.com/img/90334_Shamarie84_1494cd7c-dd59-487a-9e0b-719d0277359f.jpeg",
      quantity: 1,
    });
  }
  return items;
};

export const CategoryGenerator = (quantity) => {
  const categories = [];
  for (let i = 0; i < quantity; i++) {
    categories.push({
      id: i,
      name: `Category ${i}`,
      createdAt: new Date(),
    });
  }
  return categories;
};

export const CartGenerator = (quantity) => {
  const carts = [];
  for (let i = 0; i < quantity; i++) {
    carts.push({
      id: i,
      items: ProductsGenerator(10),
    });
  }
  return carts;
};
