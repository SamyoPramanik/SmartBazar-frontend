import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    TrendingUp,
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    Star,
    Car,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Analytics = () => {
    const salesData = [
        { month: "Jan", sales: 12000, orders: 45 },
        { month: "Feb", sales: 15000, orders: 52 },
        { month: "Mar", sales: 18000, orders: 68 },
        { month: "Apr", sales: 22000, orders: 78 },
        { month: "May", sales: 25000, orders: 85 },
        { month: "Jun", sales: 28000, orders: 92 },
    ];

    const topProducts = [
        { name: "Premium Wireless Headphones", sales: 45, revenue: 13455 },
        { name: "Professional Camera Kit", sales: 12, revenue: 15588 },
        { name: "Gaming Mechanical Keyboard", sales: 38, revenue: 5662 },
    ];

    const [progressValue, setProgressValue] = useState(0);
    const [trendSearch, setTrendSearch] = useState("");
    const [trendSearchButtonDisabled, setTrendSearchButtonDisabled] =
        useState(false);
    const [reviews, setReviews] = useState([]);

    const findProductTrendScore = () => {
        setTrendSearchButtonDisabled(true);
        const findProductTrendScore = async () => {
            if (!trendSearch.trim()) {
                setProgressValue(0);
                return;
            }

            try {
                const encoded = encodeURIComponent(trendSearch.trim());
                const url = `https://robinhood19-product-trend-analysis.hf.space/analyze-product/?product_name=${encoded}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();

                const score = Number(data.normalized_score) * 100;

                setProgressValue(score);
                setReviews(data.reviews || []);
                setTrendSearchButtonDisabled(false);
            } catch (error) {
                console.error("Failed to fetch trend score:", error);
                setProgressValue(0);
                setTrendSearchButtonDisabled(false);
            }
        };
        findProductTrendScore();
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8 bg-muted/20">
                <div className="container mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">
                            Analytics Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Track your performance and insights
                        </p>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="products">Products</TabsTrigger>
                            <TabsTrigger value="customers">
                                Customers
                            </TabsTrigger>
                            <TabsTrigger value="trending">
                                Product Trend
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 rounded-lg bg-primary/10">
                                                <DollarSign className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-accent">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>+15.3%</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">
                                            Tk.28,450
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Total Revenue (30d)
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 rounded-lg bg-primary/10">
                                                <ShoppingCart className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-accent">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>+8.2%</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">
                                            342
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Orders (30d)
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 rounded-lg bg-primary/10">
                                                <Users className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-accent">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>+12.5%</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">
                                            1,248
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Customers
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 rounded-lg bg-primary/10">
                                                <Star className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-accent">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>+0.3</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">
                                            4.6
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Avg Rating
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sales Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Sales Trend (Last 6 Months)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-80 flex items-end justify-between gap-4">
                                        {salesData.map((data) => (
                                            <div
                                                key={data.month}
                                                className="flex-1 flex flex-col items-center gap-2"
                                            >
                                                <div
                                                    className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg"
                                                    style={{
                                                        height: `${
                                                            (data.sales /
                                                                30000) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                                <span className="text-sm font-medium">
                                                    {data.month}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Tk.
                                                    {(
                                                        data.sales / 1000
                                                    ).toFixed(0)}
                                                    k
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Top Products */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Top Performing Products
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {topProducts.map((product, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-4 rounded-lg border"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Package className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {product.sales}{" "}
                                                            units sold
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">
                                                        Tk.
                                                        {product.revenue.toLocaleString()}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Revenue
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="sales">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sales Analytics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Detailed sales analytics coming soon...
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="products">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Performance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Product-specific analytics coming
                                        soon...
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="customers">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Customer Insights</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Customer analytics coming soon...
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent
                            value="trending"
                            className="flex w-full flex-col gap-4"
                        >
                            <div className="flex-col w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Product Trend</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex gap-3 items-center">
                                            <Input
                                                placeholder="Search Product..."
                                                value={trendSearch}
                                                onChange={(e) =>
                                                    setTrendSearch(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(
                                                    e: React.KeyboardEvent<HTMLInputElement>
                                                ) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        if (
                                                            !trendSearchButtonDisabled
                                                        )
                                                            findProductTrendScore();
                                                    }
                                                }}
                                            />
                                            <button
                                                className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
                                                disabled={
                                                    trendSearchButtonDisabled
                                                }
                                                onClick={findProductTrendScore}
                                            >
                                                {trendSearchButtonDisabled
                                                    ? "Searching..."
                                                    : "Search"}
                                            </button>
                                        </div>
                                        <div>
                                            <label>
                                                Positivity Score:{" "}
                                                {progressValue / 100}
                                            </label>
                                            <Progress
                                                value={progressValue}
                                                className="mt-2 h-1"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="w-full">
                                <Card className="w-full">
                                    <CardHeader>
                                        <CardTitle>Reviews</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4">
                                        {reviews.length === 0 ? (
                                            <p className="text-muted-foreground">
                                                No reviews available.
                                            </p>
                                        ) : (
                                            reviews.map((review, index) => (
                                                <Card
                                                    key={index}
                                                    className="flex flex-col border"
                                                >
                                                    <CardHeader className="flex-row gap-2 items-center">
                                                        <CardTitle className="flex font-semibold text-sm">
                                                            {review.title}
                                                        </CardTitle>
                                                        <Badge
                                                            className={`flex ${
                                                                review.sentiment ===
                                                                "positive"
                                                                    ? "bg-green-600"
                                                                    : review.sentiment ===
                                                                      "negative"
                                                                    ? "bg-orange-500"
                                                                    : "bg-gray-500"
                                                            } w-fit items-center`}
                                                        >
                                                            {review.sentiment}
                                                        </Badge>
                                                    </CardHeader>
                                                    <CardContent className="text-xs">
                                                        {review.snippet}
                                                    </CardContent>
                                                </Card>
                                            ))
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Analytics;
