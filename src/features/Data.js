export const ProductsGenerator = (quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({
      code: i,
      name: `Lettuce ${i}`,
      price: i + 10,
      category: "food",
      imageURL:
        "https://images.eatthismuch.com/img/90334_Shamarie84_1494cd7c-dd59-487a-9e0b-719d0277359f.jpeg",
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
      imageURL:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg",
    });
  }
  return categories;
};

export const OrderGenerator = (quantity) => {
  const orders = [];
  for (let i = 0; i < quantity; i++) {
    orders.push({
      id: i,
      items: "",
      total: "",
      
    });
  }
  return orders;
};