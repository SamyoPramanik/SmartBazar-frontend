import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Package,
    DollarSign,
    TrendingUp,
    ShoppingCart,
    ArrowRight,
    BarChart3,
    Star,
} from "lucide-react";
import { dummySeller } from "@/data/dummyData";

const SellerDashboard = () => {
    const stats = [
        {
            title: "Total Sales",
            value: `Tk.${dummySeller.totalSales.toLocaleString()}`,
            icon: DollarSign,
            trend: "+12.5%",
            trendUp: true,
        },
        {
            title: "Active Products",
            value: dummySeller.productCount,
            icon: Package,
            trend: "+3",
            trendUp: true,
        },
        {
            title: "Total Orders",
            value: "1,247",
            icon: ShoppingCart,
            trend: "+8.2%",
            trendUp: true,
        },
        {
            title: "Average Rating",
            value: "4.6",
            icon: Star,
            trend: "+0.2",
            trendUp: true,
        },
    ];

    const recentOrders = [
        {
            id: "#12345",
            customer: "John Doe",
            product: "Premium Wireless Headphones",
            amount: 299,
            status: "Delivered",
        },
        {
            id: "#12344",
            customer: "Jane Smith",
            product: "Professional Camera Kit",
            amount: 1299,
            status: "Shipped",
        },
        {
            id: "#12343",
            customer: "Mike Johnson",
            product: "Premium Wireless Headphones",
            amount: 299,
            status: "Processing",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8 bg-muted/20">
                <div className="container mx-auto">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome back, {dummySeller.companyName}!
                        </h1>
                        <p className="text-muted-foreground">
                            Here's what's happening with your store today.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-4 mb-8 flex-wrap">
                        <Link to="/seller/products/new">
                            <Button variant="hero">
                                <Package className="mr-2 h-4 w-4" />
                                Add New Product
                            </Button>
                        </Link>
                        <Link to="/seller/products">
                            <Button variant="outline">Manage Products</Button>
                        </Link>
                        <Link to="/seller/analytics">
                            <Button variant="outline">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Analytics
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <Card key={stat.title}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className={`p-3 rounded-lg bg-primary/10`}
                                        >
                                            <stat.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 text-sm ${
                                                stat.trendUp
                                                    ? "text-accent"
                                                    : "text-destructive"
                                            }`}
                                        >
                                            <TrendingUp className="h-4 w-4" />
                                            <span className="font-medium">
                                                {stat.trend}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1">
                                        {stat.value}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recent Orders */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Orders</CardTitle>
                            <Button variant="ghost" size="sm">
                                View All
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <p className="font-semibold">
                                                        {order.id}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {order.customer}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-sm mt-1">
                                                {order.product}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary mb-1">
                                                Tk.{order.amount}
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${
                                                    order.status === "Delivered"
                                                        ? "bg-accent/10 text-accent"
                                                        : order.status ===
                                                          "Shipped"
                                                        ? "bg-primary/10 text-primary"
                                                        : "bg-secondary text-secondary-foreground"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SellerDashboard;
