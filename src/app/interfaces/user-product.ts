import { User } from './user';
import { Product } from './product';
import { Review } from './review';
import { Category } from './category';
import { Post } from './post';

export interface UserProduct {
    user: User;
    product: Product;
    reviews: Review[];
    categories: Category[];
    posts?: Post[];
}
