//here types are saved

//Search mobile types
export type FormValues = {
  search: string;
};

//Product Models
export type Product = {
  _id: string;
  name: string;
  featured: boolean;
  slug: string;
  description: string;
  category: Category;
  subCategories: SubCategory[];
  brand: Brand;
  content: string;
  details: Detail[];
  questions: Question[];
  reviews: Review[];
  subProducts: SubProduct[];
};

export type Detail = {
  name: string;
  value: string;
};

export type Page = {
  _id: string;
  name: string;
  link: string;
  subPage: SubPage[];
  createdAt: Date;
};

export type SubPage = {
  _id: string;
  name: string;
  link: string;
  slug: string;
  parent: string;
  createdAt: Date;
};

export type Question = {
  name: string;
  value: string;
};

export type Review = {
  _id?: string;
  reviewBy?: User;
  rating: number;
  review: string;
  likes: string[];
  createdAt: Date;
  updatedAt?: Date;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  role: string;
  createdAt?: Date;
  address: Address[];
  // TODO:Complete user
};

export type SubProduct = {
  sku: string;
  style: Style;
  options: Option[];
};

export type Style = {
  name: string;
  color: string;
  image: string;
};

export type Option = {
  qty: number;
  price: number;
  sold: number;
  option: string;
  images: string[];
  discount: number;
};

export type Category = {
  _id: string;
  name: string;
  link: string;
  slug: string;
  image: string;
  createdAt?: Date;
  submenu?: SubCategory[];
};

export type SubCategory = {
  _id: string;
  name: string;
  link: string;
  slug: string;
  parent?: string;
  createdAt?: Date;
};

export type Brand = {
  _id: string;
  name: string;
  link: string;
  slug: string;
  image: string;
  createdAt?: Date;
};

export type CartItem = {
  product: string;
  name: string;
  description: string;
  optionBefore: number;
  option: string;
  slug: string;
  sku: string;
  shipping: string;
  images: string[];
  style: Style;
  price: number;
  priceBefore: number;
  qty: number;
  stock: number;
  brand: string;
  likes: string[];
  _uid: string;
};

export type Order = {
  _id: string;
  user: User;
  products: ProductOrder[];
  paymentMethod: string;
  total: number;
  shippingPrice: number;
  taxPrice: number;
  isPaid: boolean;
  status: string;
  totalBeforeDiscount: number;
  couponApplied: Coupon;
  shippingStatus: string;
  shippingAddress: Address;
  paymentResult: string;
  shippingTimes: string;
  shipping: Address;
  createdAt: Date;
};

export type ProductOrder = {
  _id: string;
  product: string;
  name: string;
  images: string;
  option: string;
  qty: number;
  style: Style;
  price: number;
};
export type Coupon = {
  id: string;
  coupon: string;
  startDate: Date;
  endDate: Date;
  discount: number;
};
export type Address = {
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  zipCode: string;
  address: string;
  phoneNumber: string;
  state: string;
};

export type Slide = {
  _id: string;
  name: string;
  link: string;
  btn: string;
  title: string;
  subtitle: string;
  slug: string;
  image: string;
  textColor: string;
  createdAt?: Date;
};

export type Cart = {
  cartItems: CartItem[];
  cartTotal: number;
  products: Product[];
};

export type Delivery = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  times: string;
  price: number;
};

export type Payment = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  slug: string;
};

export type sendEmailTypes = {
  subject: string;
  email: string;
  message: string;
};
