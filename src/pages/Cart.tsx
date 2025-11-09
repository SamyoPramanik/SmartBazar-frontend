import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { dummyProducts } from "@/data/dummyData";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { product: dummyProducts[0], quantity: 1 },
        { product: dummyProducts[2], quantity: 2 },
    ]);

    const updateQuantity = (productId: string, change: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (productId: string) => {
        setCartItems((items) =>
            items.filter((item) => item.product.id !== productId)
        );
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.basePrice * item.quantity,
        0
    );
    const shipping = 10;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center px-4">
                    <div className="text-center">
                        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Add some products to get started
                        </p>
                        <Link to="/search">
                            <Button size="lg">Browse Products</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.product.id}>
                                    <CardContent className="p-6">
                                        <div className="flex gap-4">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <Link
                                                            to={`/product/${item.product.id}`}
                                                        >
                                                            <h3 className="font-semibold hover:text-primary transition-colors">
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </h3>
                                                        </Link>
                                                        <p className="text-sm text-muted-foreground">
                                                            Sold by{" "}
                                                            {
                                                                item.product
                                                                    .sellerName
                                                            }
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeItem(
                                                                item.product.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                <div className="flex justify-between items-end">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.product
                                                                        .id,
                                                                    -1
                                                                )
                                                            }
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-8 text-center font-semibold">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.product
                                                                        .id,
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    <p className="text-xl font-bold text-primary">
                                                        Tk.
                                                        {item.product
                                                            .basePrice *
                                                            item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">
                                        Order Summary
                                    </h3>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                Subtotal
                                            </span>
                                            <span className="font-semibold">
                                                Tk.{subtotal}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                Shipping
                                            </span>
                                            <span className="font-semibold">
                                                Tk.{shipping}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between text-lg">
                                            <span className="font-semibold">
                                                Total
                                            </span>
                                            <span className="font-bold text-primary">
                                                Tk.{total}
                                            </span>
                                        </div>
                                    </div>

                                    <Link to="/checkout">
                                        <Button size="lg" className="w-full">
                                            Proceed to Checkout
                                        </Button>
                                    </Link>

                                    <Link to="/search">
                                        <Button
                                            variant="ghost"
                                            className="w-full mt-2"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
