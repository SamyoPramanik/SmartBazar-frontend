import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Star,
    ShoppingCart,
    Minus,
    Plus,
    Package,
    Shield,
    Truck,
    Heart,
} from "lucide-react";
import { dummyProducts, dummyReviews } from "@/data/dummyData";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

const ProductDetails = () => {
    const { id } = useParams();
    const product = dummyProducts.find((p) => p.id === id);
    const productReviews = dummyReviews.filter((r) => r.productId === id);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = product ? isInWishlist(product.id) : false;

    const handleWishlistToggle = () => {
        if (!product) return;
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Images */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                                            selectedImage === idx
                                                ? "border-primary"
                                                : "border-transparent"
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <Badge className="mb-2">
                                    {product.category}
                                </Badge>
                                <h1 className="text-3xl font-bold mb-2">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-5 w-5 ${
                                                        i <
                                                        Math.floor(
                                                            product.rating
                                                        )
                                                            ? "fill-primary text-primary"
                                                            : "text-muted-foreground"
                                                    }`}
                                                />
                                            )
                                        )}
                                        <span className="ml-2 text-sm text-muted-foreground">
                                            {product.rating} (
                                            {product.reviewCount} reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-bold text-primary">
                                        ${product.basePrice}
                                    </span>
                                    {product.priceRange && (
                                        <span className="text-lg text-muted-foreground">
                                            Range: Tk.{product.priceRange.min} -
                                            Tk.{product.priceRange.max}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Sold by:{" "}
                                    <span className="font-medium text-foreground">
                                        {product.sellerName}
                                    </span>
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="font-semibold mb-2">
                                    Description
                                </h3>
                                <p className="text-muted-foreground">
                                    {product.description}
                                </p>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold">
                                        Quantity:
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setQuantity(
                                                    Math.max(1, quantity - 1)
                                                )
                                            }
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-12 text-center font-semibold">
                                            {quantity}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setQuantity(
                                                    Math.min(
                                                        product.stock,
                                                        quantity + 1
                                                    )
                                                )
                                            }
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        ({product.stock} available)
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <Button size="lg" className="flex-1">
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Add to Cart
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={handleWishlistToggle}
                                        className={cn(
                                            inWishlist && "text-primary"
                                        )}
                                    >
                                        <Heart
                                            className={cn(
                                                "h-5 w-5",
                                                inWishlist && "fill-current"
                                            )}
                                        />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Truck className="h-6 w-6 text-primary" />
                                    <span className="text-sm">
                                        Free Shipping
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Shield className="h-6 w-6 text-primary" />
                                    <span className="text-sm">
                                        Secure Payment
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Package className="h-6 w-6 text-primary" />
                                    <span className="text-sm">
                                        Easy Returns
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">
                            Customer Reviews
                        </h2>
                        <div className="space-y-4">
                            {productReviews.length > 0 ? (
                                productReviews.map((review) => (
                                    <Card key={review.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-semibold">
                                                        {review.userName}
                                                    </p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {Array.from({
                                                            length: 5,
                                                        }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${
                                                                    i <
                                                                    review.rating
                                                                        ? "fill-primary text-primary"
                                                                        : "text-muted-foreground"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                    {review.date}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground">
                                                {review.comment}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-muted-foreground">
                                    No reviews yet. Be the first to review this
                                    product!
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetails;
