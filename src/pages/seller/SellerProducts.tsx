import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    MoreVertical,
    Package,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dummyProducts } from "@/data/dummyData";

const SellerProducts = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter products for this seller (in real app, would be filtered by seller ID)
    const sellerProducts = dummyProducts.filter((p) => p.sellerId === "s1");

    const filteredProducts = sellerProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8 bg-muted/20">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                My Products
                            </h1>
                            <p className="text-muted-foreground">
                                Manage your product catalog
                            </p>
                        </div>
                        <Link to="/seller/products/new">
                            <Button variant="hero">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products List */}
                    <div className="space-y-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    className="hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex gap-6">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-xl font-semibold">
                                                                {product.name}
                                                            </h3>
                                                            <Badge>
                                                                {
                                                                    product.category
                                                                }
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                            {
                                                                product.description
                                                            }
                                                        </p>
                                                    </div>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            >
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                asChild
                                                            >
                                                                <Link
                                                                    to={`/seller/products/${product.id}`}
                                                                    className="flex items-center"
                                                                >
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                                <div className="grid grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-muted-foreground mb-1">
                                                            Price
                                                        </p>
                                                        <p className="font-bold text-primary text-lg">
                                                            Tk.
                                                            {product.basePrice}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground mb-1">
                                                            Stock
                                                        </p>
                                                        <p className="font-semibold">
                                                            {product.stock}{" "}
                                                            units
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground mb-1">
                                                            Rating
                                                        </p>
                                                        <p className="font-semibold">
                                                            {product.rating} ⭐
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground mb-1">
                                                            Reviews
                                                        </p>
                                                        <p className="font-semibold">
                                                            {
                                                                product.reviewCount
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">
                                        No products found
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        {searchQuery
                                            ? "Try adjusting your search"
                                            : "Get started by adding your first product"}
                                    </p>
                                    {!searchQuery && (
                                        <Link to="/seller/products/new">
                                            <Button variant="hero">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Your First Product
                                            </Button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SellerProducts;
