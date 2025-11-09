import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin } from "lucide-react";

const Checkout = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Order placed:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-4 py-8">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Shipping Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">
                                        Street Address
                                    </Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">
                                            ZIP Code
                                        </Label>
                                        <Input
                                            id="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">
                                        Card Number
                                    </Label>
                                    <Input
                                        id="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryDate">
                                            Expiry Date
                                        </Label>
                                        <Input
                                            id="expiryDate"
                                            placeholder="MM/YY"
                                            value={formData.expiryDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input
                                            id="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span className="font-semibold">
                                        Tk.328
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Shipping
                                    </span>
                                    <span className="font-semibold">Tk.10</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-bold text-primary">
                                        Tk.338
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Button type="submit" size="lg" className="w-full">
                            Place Order
                        </Button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
