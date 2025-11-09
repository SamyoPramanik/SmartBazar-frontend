import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Eye } from "lucide-react";
import { dummyOrders } from "@/data/dummyData";

const Orders = () => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "delivered":
                return "bg-accent text-accent-foreground";
            case "shipped":
                return "bg-primary text-primary-foreground";
            case "processing":
                return "bg-secondary text-secondary-foreground";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8">
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                    <div className="space-y-4">
                        {dummyOrders.map((order) => (
                            <Card key={order.id}>
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Package className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    Order #{order.id}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Placed on{" "}
                                                    {new Date(
                                                        order.date
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Badge
                                                className={getStatusColor(
                                                    order.status
                                                )}
                                            >
                                                {order.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    order.status.slice(1)}
                                            </Badge>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Details
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {order.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-4 py-2 border-t"
                                            >
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Quantity:{" "}
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-semibold text-primary">
                                                    Tk.
                                                    {item.product.basePrice *
                                                        item.quantity}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Delivery Address
                                            </p>
                                            <p className="font-medium">
                                                {order.shippingAddress}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">
                                                Total Amount
                                            </p>
                                            <p className="text-2xl font-bold text-primary">
                                                Tk.{order.total}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Orders;
