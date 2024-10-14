import coffeeBeans from '../product-images/coffeebeans.jpeg';
import espressoBeans from '../product-images/espressobeans.jpeg';
import milk from '../product-images/milk.jpeg';
import almondmilk from '../product-images/almondmilk.jpeg';
import syrup from '../product-images/syrup.jpeg';
import sugar from '../product-images/sugar.jpeg';
import coffeefilters from '../product-images/coffeefilters.jpeg';
import cups from '../product-images/cups.jpeg';
import stirrers from '../product-images/stirrers.jpeg';
import { Product } from '../models/products-interface';

export const products: Product[] = [
  {
    product_image: coffeeBeans,
    name: 'Arabica Coffee Beans',
    description: 'Premium Arabica beans with a rich flavor',
    quantity: '25 lbs in stock',
    price: '$30.00',
    cost_price: '$25.00',
  },
  {
    product_image: espressoBeans,
    name: 'Espresso Roast Beans',
    description: 'Dark roasted beans for strong espresso',
    quantity: '20 lbs in stock',
    price: '$28.00',
    cost_price: '$22.00',
  },
  {
    product_image: milk,
    name: 'Whole Milk',
    description: 'Fresh whole milk for lattes and cappuccinos',
    quantity: '50 gallons in stock',
    price: '$3.00 per gallon',
    cost_price: '$2.50 per gallon',
  },
  {
    product_image: almondmilk,
    name: 'Almond Milk',
    description: 'Non-dairy almond milk alternative',
    quantity: '30 cartons in stock',
    price: '$4.00 per carton',
    cost_price: '$3.50 per carton',
  },
  {
    product_image: syrup,
    name: 'Vanilla Syrup',
    description: 'Sweet vanilla syrup for flavored drinks',
    quantity: '10 bottles in stock',
    price: '$8.00',
    cost_price: '$6.00',
  },
  {
    product_image: syrup,
    name: 'Caramel Syrup',
    description: 'Rich caramel syrup for lattes and frappes',
    quantity: '15 bottles in stock',
    price: '$8.50',
    cost_price: '$6.50',
  },
  {
    product_image: sugar,
    name: 'Granulated Sugar',
    description: 'Fine sugar for sweetening beverages',
    quantity: '100 lbs in stock',
    price: '$20.00',
    cost_price: '$15.00',
  },
  {
    product_image: cups,
    name: 'Paper Cups 12oz',
    description: 'Disposable cups for coffee servings',
    quantity: '2000 units in stock',
    price: '$150.00',
    cost_price: '$120.00',
  },
  {
    product_image: stirrers,
    name: 'Wooden Stirrers',
    description: 'Eco-friendly stirrers for coffee',
    quantity: '5000 units in stock',
    price: '$30.00',
    cost_price: '$25.00',
  },
  {
    product_image: coffeefilters,
    name: 'Coffee Filters',
    description: 'Filters for brewing coffee',
    quantity: '1000 units in stock',
    price: '$20.00',
    cost_price: '$15.00',
  },
];
