import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

interface ProductDocument extends mongoose.Document, IProduct { }

export interface IProduct extends Document {
    name: string;
    real_price: number;
    sale_price?: number;
    import_price: number;
    code: string;
    quantity_imported: number;
    quantity_sales?: number;
    describe: string;
    type: number;
    material: string;
    origin: string;
    size: number[];
    color: string[];
    preview: {
        image: string;
        color?: string;
        bgColor?: string;
    }[];
    cs1?: {
        cs1_quantity_imported: number;
        cs1_quantity_sales: number;
    };
    cs2?: {
        cs2_quantity_imported: number;
        cs2_quantity_sales: number;
    };
    cs3?: {
        cs3_quantity_imported: number;
        cs3_quantity_sales: number;
    };
}
const productSchema: Schema = new Schema({
    name: { type: String, required: true },
    real_price: { type: Number, required: true },
    sale_price: { type: Number },
    code: { type: String, required: true, unique: true },
    quantity_imported: { type: Number, default: 0 },
    quantity_sales: { type: Number, default: 0 },
    describe: { type: String },
    type: { type: Number },
    material: { type: String },
    origin: { type: String },
    size: [{ type: Number }],
    color: [{ type: String }],
    preview: [{
        image: { type: String },
        color: { type: String },
        bgColor: { type: String },
    }],
    cs1: {
        cs1_quantity_imported: { type: Number, default: 0 },
        cs1_quantity_sales: { type: Number, default: 0 }
    },
    cs2: {
        cs2_quantity_imported: { type: Number, default: 0 },
        cs2_quantity_sales: { type: Number, default: 0 }
    },
    cs3: {
        cs3_quantity_imported: { type: Number, default: 0 },
        cs3_quantity_sales: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

productSchema.plugin(paginate);

const Product = mongoose.model<
    ProductDocument,
    mongoose.PaginateModel<ProductDocument>
>('Products', productSchema);
export default Product;