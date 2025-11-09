import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { dummyProducts } from "@/data/dummyData";

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const existingProduct = id ? dummyProducts.find((p) => p.id === id) : null;

    const [formData, setFormData] = useState({
        name: existingProduct?.name || "",
        description: existingProduct?.description || "",
        basePrice: existingProduct?.basePrice || 0,
        priceMin: existingProduct?.priceRange?.min || 0,
        priceMax: existingProduct?.priceRange?.max || 0,
        category: existingProduct?.category || "",
        stock: existingProduct?.stock || 0,
    });

    const [images, setImages] = useState<string[]>(
        existingProduct?.images || []
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Product data:", formData, images);
        navigate("/seller/products");
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value =
            e.target.type === "number"
                ? parseFloat(e.target.value)
                : e.target.value;
        setFormData({
            ...formData,
            [e.target.id]: value,
        });
    };

    const handleImageAdd = () => {
        setImages([...images, "/placeholder.svg"]);
    };

    const handleImageRemove = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8 bg-muted/20">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8">
                        {isEditing ? "Edit Product" : "Add New Product"}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                category: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Electronics">
                                                Electronics
                                            </SelectItem>
                                            <SelectItem value="Fashion">
                                                Fashion
                                            </SelectItem>
                                            <SelectItem value="Home & Living">
                                                Home & Living
                                            </SelectItem>
                                            <SelectItem value="Sports">
                                                Sports
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing & Inventory</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="basePrice">
                                            Base Price (Tk.)
                                        </Label>
                                        <Input
                                            id="basePrice"
                                            type="number"
                                            value={formData.basePrice}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="priceMin">
                                            Min Price (Tk.)
                                        </Label>
                                        <Input
                                            id="priceMin"
                                            type="number"
                                            value={formData.priceMin}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="priceMax">
                                            Max Price (Tk.)
                                        </Label>
                                        <Input
                                            id="priceMax"
                                            type="number"
                                            value={formData.priceMax}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stock">
                                        Stock Quantity
                                    </Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Product Images</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    {images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="relative aspect-square rounded-lg overflow-hidden border"
                                        >
                                            <img
                                                src={img}
                                                alt={`Product ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleImageRemove(idx)
                                                }
                                                className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleImageAdd}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Add Image
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="flex gap-4">
                            <Button type="submit" size="lg" className="flex-1">
                                {isEditing ? "Update Product" : "Add Product"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => navigate("/seller/products")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductForm;
