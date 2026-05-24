import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Profiles from "@/pages/Profiles";
import Home from "@/pages/Home";
import Episodes from "@/pages/Episodes";
import Timeline from "@/pages/Timeline";
import Letter from "@/pages/Letter";
import Gallery from "@/pages/Gallery";
import { isAuthenticated } from "@/lib/auth";
import { useEffect } from "react";
import { LangProvider } from "@/context/LangContext";
import { SettingsProvider } from "@/context/SettingsContext.tsx";
import { TudumIntro } from "@/components/TudumIntro";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MouseGlow } from "@/components/MouseGlow";
import { FilmGrain } from "@/components/FilmGrain";
import { SettingsModal } from "@/components/SettingsModal";

const queryClient = new QueryClient();

const ProtectedRoute = ({ component: Component }: { component: any }) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation("/signin");
    }
  }, [setLocation]);

  return isAuthenticated() ? <Component /> : null;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profiles" component={() => <ProtectedRoute component={Profiles} />} />
      <Route path="/home" component={() => <ProtectedRoute component={Home} />} />
      <Route path="/episodes" component={() => <ProtectedRoute component={Episodes} />} />
      <Route path="/timeline" component={() => <ProtectedRoute component={Timeline} />} />
      <Route path="/letter" component={() => <ProtectedRoute component={Letter} />} />
      <Route path="/gallery" component={() => <ProtectedRoute component={Gallery} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <SettingsProvider>
          <TooltipProvider>
            <TudumIntro />
            <FloatingHearts />
            <MouseGlow />
            <FilmGrain />
            <SettingsModal />
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </SettingsProvider>
      </LangProvider>
    </QueryClientProvider>
  );
}

export default App;
