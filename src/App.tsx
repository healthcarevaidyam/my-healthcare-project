import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import VisitorTracker from "./components/VisitorTracker";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Consultation = lazy(() => import("./pages/Consultation"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Store = lazy(() => import("./pages/Store"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminDoctorPad = lazy(() => import("./pages/AdminDoctorPad"));
const AdminInquiries = lazy(() => import("./pages/AdminInquiries"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/AdminOrders"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AiDoctor = lazy(() => import("./pages/ai/AiDoctor"));
const Policies = lazy(() => import("./pages/Policies"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route element={<Layout />}>
//             <Route path="/" element={<Index />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/services/:slug" element={<ServiceDetail />} />
//             <Route path="/consultation" element={<Consultation />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/store" element={<Store />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/ai-doctor" element={<AiDoctor />} />
//             <Route path="/aidoctor" element={<Index />} />
//           </Route>
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/admin/doctorpad" element={<AdminDoctorPad />} />
//           <Route path="/admin/inquiries" element={<AdminInquiries />} />
//           <Route path="/admin/products" element={<AdminProducts />} />
//           <Route path="/admin/orders" element={<AdminOrders />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <VisitorTracker />

        <Suspense fallback={<div className="min-h-[50vh]" aria-label="Loading page" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/:slug" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ai-doctor" element={<AiDoctor />} />
            <Route path="/aidoctor" element={<Index />} />
            <Route path="/privacy-policy" element={<Policies type="privacy" />} />
            <Route path="/terms-and-conditions" element={<Policies type="terms" />} />
            <Route path="/refund-cancellation-policy" element={<Policies type="refund" />} />
            <Route path="/shipping-policy" element={<Policies type="shipping" />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/doctorpad" element={<AdminDoctorPad />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
