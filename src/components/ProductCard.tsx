import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Product } from "@/types";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    return (
        <Link to={`/product/${product.id}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted relative">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "absolute top-2 right-2 bg-background/80 hover:bg-background",
                            inWishlist && "text-primary"
                        )}
                        onClick={handleWishlistToggle}
                    >
                        <Heart
                            className={cn(
                                "h-5 w-5",
                                inWishlist && "fill-current"
                            )}
                        />
                    </Button>
                </div>

                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                        i < Math.floor(product.rating)
                                            ? "fill-primary text-primary"
                                            : "text-muted-foreground"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                            ({product.reviewCount})
                        </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                            Tk.{product.basePrice}
                        </span>
                        {/* {product.priceRange && (
                            <span className="text-sm text-muted-foreground">
                                Tk.{product.priceRange.min} - Tk.
                                {product.priceRange.max}
                            </span>
                        )} */}
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Button className="w-full" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};
