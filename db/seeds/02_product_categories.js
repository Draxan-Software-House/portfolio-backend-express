const gadgetCategories = [
  "Smartphones",
  "Laptops",
  "Tablets",
  "Smartwatches",
  "Audio Devices",
  "Cameras",
  "Drones",
  "Gaming Consoles",
  "PC Accessories",
  "Smart Home Devices",
  "Wearable Tech",
  "Networking Devices",
  "Storage Devices",
  "Computer Components",
  "Monitors",
  "Printers & Scanners",
];

export async function seed(knex) {
  await knex("categories").del();
  const cats = [];
  gadgetCategories.forEach(c => {
    cats.push({
      name: c
    });
  });
  await knex("categories").insert(cats);
}

