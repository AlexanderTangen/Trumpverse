export interface EditedItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: File | null;
  stock: number; 
}
