import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { dummyProducts } from "@/data/dummyData";
import { Button } from "@/components/ui/button";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("relevance");
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [showFilters, setShowFilters] = useState(false);

    const categories = ["all", "Electronics", "Fashion", "Home & Living"];

    const filteredProducts = dummyProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesCategory =
            category === "all" || product.category === category;
        const matchesPrice =
            product.basePrice >= priceRange[0] &&
            product.basePrice <= priceRange[1];

        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.basePrice - b.basePrice;
            case "price-high":
                return b.basePrice - a.basePrice;
            case "rating":
                return b.rating - a.rating;
            case "newest":
                return 0;
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8">
                <div className="container mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">
                            Search Products
                        </h1>
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <Label htmlFor="search">Search</Label>
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="search"
                                        type="search"
                                        placeholder="Search for products..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="md:hidden"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <aside
                            className={`md:block ${
                                showFilters ? "block" : "hidden"
                            } space-y-6`}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Filters</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Category Filter */}
                                    <div className="space-y-2">
                                        <Label>Category</Label>
                                        <Select
                                            value={category}
                                            onValueChange={setCategory}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem
                                                        key={cat}
                                                        value={cat}
                                                    >
                                                        {cat === "all"
                                                            ? "All Categories"
                                                            : cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Price Range Filter */}
                                    <div className="space-y-2">
                                        <Label>Price Range</Label>
                                        <div className="pt-2">
                                            <Slider
                                                min={0}
                                                max={2000}
                                                step={50}
                                                value={priceRange}
                                                onValueChange={setPriceRange}
                                            />
                                            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                                <span>Tk.{priceRange[0]}</span>
                                                <span>Tk.{priceRange[1]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Sort Options */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sort By</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Select
                                        value={sortBy}
                                        onValueChange={setSortBy}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="relevance">
                                                Relevance
                                            </SelectItem>
                                            <SelectItem value="price-low">
                                                Price: Low to High
                                            </SelectItem>
                                            <SelectItem value="price-high">
                                                Price: High to Low
                                            </SelectItem>
                                            <SelectItem value="rating">
                                                Highest Rated
                                            </SelectItem>
                                            <SelectItem value="newest">
                                                Newest
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Products Grid */}
                        <div className="md:col-span-3">
                            <div className="mb-4">
                                <p className="text-muted-foreground">
                                    {sortedProducts.length} product
                                    {sortedProducts.length !== 1 ? "s" : ""}{" "}
                                    found
                                </p>
                            </div>

                            {sortedProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sortedProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">
                                        No products found
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your filters or search
                                        terms
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Search;
