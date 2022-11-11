export const productsGenerator = (quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({
      code: i,
      name: `Item name ${i}`,
      price: i + 10,
      category: "food",
      imageURL: "",
      datecreated: new Date(),
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
    });
  }
  return categories;
};