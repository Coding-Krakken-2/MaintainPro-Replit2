import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import WorkOrders from "./pages/WorkOrders";
import Equipment from "./pages/Equipment";
import Inventory from "./pages/Inventory";
import PreventiveMaintenance from "./pages/PreventiveMaintenance";
import Vendors from "./pages/Vendors";
import Auth from "./pages/Auth";
import NotFound from "@/pages/not-found";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading MaintainPro...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // In a real app, check authentication status here
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/login" component={Auth} />
      <Route path="/">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/work-orders">
        <ProtectedRoute>
          <WorkOrders />
        </ProtectedRoute>
      </Route>
      <Route path="/equipment">
        <ProtectedRoute>
          <Equipment />
        </ProtectedRoute>
      </Route>
      <Route path="/inventory">
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>
      </Route>
      <Route path="/preventive">
        <ProtectedRoute>
          <PreventiveMaintenance />
        </ProtectedRoute>
      </Route>
      <Route path="/vendors">
        <ProtectedRoute>
          <Vendors />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
          <SpeedInsights />
          <Analytics />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
