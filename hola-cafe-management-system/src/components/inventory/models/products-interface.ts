export interface Product {
    product_image: string;
    product_name: string;
    variants?: string;       
    category: string;
    product_type: string;
    stock: string;
    stock_status: 'low' | 'in stock' | 'out of stock';  
    retail_price: string;
    wholesale_price: string;
  }
  