import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

interface CartDocument extends mongoose.Document, ICart { }

export interface ICart extends Document {
    user_id: string;
    products: {
        product_id: string;
        detail: {
            preview: {
                image: string;
                color: string;
                bgColor: string;
            };
            size: number;
            name: string;
            real_price: number;
            sale_price: number;
            quantity_import: number;
            quantity_sale: number;
        };
        quantity: number;
    }[];
}

const cartSchema: Schema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    products: [{
        product_id: {
            type: String,
            required: true
        },
        detail: {
            preview: {
                image: {
                    type: String,
                    required: true
                },
                color: {
                    type: String,
                    required: true
                },
                bgColor: {
                    type: String,
                    required: true
                }
            },
            size: {
                type: Number,
                required: true
            },
            real_price: {
                type: Number,
                required: true
            },
            sale_price: {
                type: Number,
                required: true
            },
            quantity_import: {
                type: Number,
                required: true
            },
            quantity_sale: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

cartSchema.plugin(paginate);

const Cart = mongoose.model<
    CartDocument,
    mongoose.PaginateModel<CartDocument>
>('Cart', cartSchema);

export default Cart;