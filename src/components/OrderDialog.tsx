// components/OrderDialog.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Loader2,
  Package,
  User,
  MapPin,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { State, City } from "country-state-city";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

interface ProductRecord {
  slug: string;
  name: string;
  price: string;
  image: string;
  category: string;
  shortDescription: string;
}

interface OrderFormData {
  productName: string;
  productPrice: string;
  productCategory: string;
  customerName: string;
  phone: string;
  email: string;
  houseNo: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  quantity: number;
  notes: string;
}

interface OrderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProduct: ProductRecord | null;
}

const OrderDialog = ({ isOpen, onOpenChange, selectedProduct }: OrderDialogProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableStates, setAvailableStates] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [availableCities, setAvailableCities] = useState<{ name: string }[]>(
    [],
  );
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [lastPincodeLookup, setLastPincodeLookup] = useState("");
  const [formData, setFormData] = useState<OrderFormData>({
    productName: "",
    productPrice: "",
    productCategory: "",
    customerName: "",
    phone: "",
    email: "",
    houseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 1,
    notes: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        productCategory: selectedProduct.category,
      }));
    }
  }, [selectedProduct]);

  const loadIndianStates = () => {
    const indiaStates = State.getStatesOfCountry("IN") || [];
    setAvailableStates(
      indiaStates.map((state) => ({
        name: state.name,
        isoCode: state.isoCode,
      })),
    );
  };

  const loadCities = async (stateCode: string): Promise<string[]> => {
    setIsCityLoading(true);
    const cities = City.getCitiesOfState("IN", stateCode) || [];
    const cityNames = cities.map((city) => city.name);
    setAvailableCities(cityNames.map((name) => ({ name })));
    setIsCityLoading(false);
    return cityNames;
  };

  useEffect(() => {
    loadIndianStates();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      void handlePincodeChange(value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      quantity: parseInt(value) || 1,
    }));
  };

  const handleStateChange = async (stateCode: string, stateName: string) => {
    setSelectedStateCode(stateCode);
    const cities = await loadCities(stateCode);
    setFormData((prev) => ({
      ...prev,
      state: stateName,
      city: "",
    }));
    return cities;
  };

  const handleCityChange = (cityName: string) => {
    setFormData((prev) => ({
      ...prev,
      city: cityName,
    }));
  };

  const handlePincodeChange = async (value: string) => {
    setFormData((prev) => ({
      ...prev,
      pincode: value,
    }));

    if (value.length === 0) {
      setSelectedStateCode("");
      setAvailableCities([]);
      setLastPincodeLookup("");
      setFormData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
      return;
    }

    if (value.length === 6 && value !== lastPincodeLookup) {
      setLastPincodeLookup(value);
      setIsPincodeLoading(true);

      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${value}`,
        );
        const result = await response.json();

        if (Array.isArray(result) && result[0]?.PostOffice?.length > 0) {
          const postOffice = result[0].PostOffice[0];
          const stateName = postOffice.State;
          const districtName = postOffice.District;

          const matchingState = availableStates.find(
            (state) => state.name.toLowerCase() === stateName.toLowerCase(),
          );

          if (matchingState) {
            const cities = await handleStateChange(
              matchingState.isoCode,
              matchingState.name,
            );
            const matchedCity = cities.find(
              (cityName) =>
                cityName.toLowerCase() === districtName.toLowerCase(),
            );

            setFormData((prev) => ({
              ...prev,
              city: matchedCity ?? districtName,
              state: matchingState.name,
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              state: stateName,
              city: districtName,
            }));
          }
        }
      } catch (error) {
        console.error("Pincode lookup failed", error);
      } finally {
        setIsPincodeLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    debugger;
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderPayload = {
        productName: formData.productName,
        productPrice: formData.productPrice,
        productCategory: formData.productCategory,
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        houseNo: formData.houseNo,
        street: formData.street,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        quantity: formData.quantity,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(
        "https://vaidyamhealthcare.app.n8n.cloud/webhook/save-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        },
      );

      if (response.ok) {
        toast({
          title: "Order Placed Successfully!",
          description: "We will contact you shortly to confirm your order.",
          variant: "default",
        });
        onOpenChange(false);
        setFormData({
          productName: "",
          productPrice: "",
          productCategory: "",
          customerName: "",
          phone: "",
          email: "",
          houseNo: "",
          street: "",
          landmark: "",
          city: "",
          state: "",
          pincode: "",
          quantity: 1,
          notes: "",
        });
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          isMobile
            ? "max-w-full h-screen max-h-screen rounded-none p-0 overflow-hidden shadow-2xl"
            : "max-w-[95vw] w-[1400px] h-[95vh] max-h-[95vh] rounded-2xl p-0 overflow-hidden shadow-2xl"
        }
      >
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/10 p-2 hover:bg-black/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div
          className={
            isMobile
              ? "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-4 border-b flex-shrink-0 sticky top-0 z-40 bg-white"
              : "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-4 border-b flex-shrink-0"
          }
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Package className="h-6 w-6 text-primary" />
              Place Your Order
            </DialogTitle>
            <DialogDescription className="text-base mt-1">
              Complete your order for{" "}
              <span className="font-semibold text-primary">
                {selectedProduct?.name}
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className={isMobile ? "p-4 pb-32" : "p-8"}
          >
            <div className="grid gap-5">
              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-4 border border-primary/10">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Product
                  </Label>
                  <div className="text-base font-semibold mt-1">
                    {formData.productName}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Price
                  </Label>
                  <div className="text-lg font-bold text-primary mt-1">
                    {formData.productPrice}
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <User className="h-4 w-4 text-primary" />
                  Personal Information
                </Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="customerName" className="text-sm">
                      Full Name *
                    </Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-11"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Delivery Address
                </Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="houseNo" className="text-sm">
                      House/Apt No *
                    </Label>
                    <Input
                      id="houseNo"
                      name="houseNo"
                      value={formData.houseNo}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                      placeholder="House/Apt No"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="street" className="text-sm">
                      Street/Road *
                    </Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                      placeholder="Street/Road"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="landmark" className="text-sm">
                      Landmark
                    </Label>
                    <Input
                      id="landmark"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="h-11"
                      placeholder="Nearby landmark"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-sm">
                      State *
                    </Label>
                    <Select
                      value={selectedStateCode}
                      onValueChange={(value) => {
                        const selectedState = availableStates.find(
                          (state) => state.isoCode === value,
                        );
                        if (selectedState) {
                          handleStateChange(
                            selectedState.isoCode,
                            selectedState.name,
                          );
                        }
                      }}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        className="max-h-60 overflow-y-auto"
                      >
                        {availableStates.map((state) => (
                          <SelectItem key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-sm">
                      City *
                    </Label>
                    <Select
                      value={formData.city}
                      onValueChange={handleCityChange}
                      disabled={!selectedStateCode || isCityLoading}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue
                          placeholder={
                            isCityLoading ? "Loading cities..." : "Select city"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        className="max-h-60 overflow-y-auto"
                      >
                        {availableCities.length > 0 ? (
                          availableCities.map((city) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-city-available" disabled>
                            {selectedStateCode
                              ? "No cities found"
                              : "Select a state first"}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pincode" className="text-sm">
                      Pincode *
                    </Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      maxLength={6}
                      className="h-11"
                      placeholder="Pincode"
                    />
                  </div>
                </div>
              </div>

              {/* Quantity and Notes */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="quantity" className="text-sm font-semibold">
                    Quantity *
                  </Label>
                  <Select
                    value={formData.quantity.toString()}
                    onValueChange={handleQuantityChange}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="notes" className="text-sm font-semibold">
                    Order Notes
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Special instructions"
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className={
                isMobile
                  ? "mt-8 pt-6 border-t border-primary/10 fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t shadow-lg"
                  : "mt-8 pt-6 border-t border-primary/10"
              }
            >
              <DialogFooter className="sm:justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className={isMobile ? "flex-1 h-11" : "min-w-[100px] h-11"}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    isMobile
                      ? "flex-1 h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
                      : "min-w-[160px] h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Placing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Confirm Order
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;