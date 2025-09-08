import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ProjectDetail from "@/pages/project-detail";
import StandardizedTestAnalysisPage from "@/pages/standardized-test-analysis";
import FoodHubOrdersPage from "@/pages/foodhub-orders";
import StockMarketSentimentPage from "@/pages/stock-market-sentiment";
import SubredditClassificationPage from "@/pages/subreddit-classification";
import GraphsNetworksPage from "@/pages/graphs-networks";
import PlantSeedlingClassificationPage from "@/pages/plant-seedling-classification";
import CreditCardChurnPredictionPage from "@/pages/credit-card-churn-prediction";
import BankCustomerChurnPredictionPage from "@/pages/bank-customer-churn-prediction";
import PersonalLoanCampaignPage from "@/pages/personal-loan-campaign";
import AdminPage from "@/pages/admin";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/standardized-test-analysis" component={StandardizedTestAnalysisPage} />
      <Route path="/foodhub-orders" component={FoodHubOrdersPage} />
      <Route path="/stock-market-sentiment" component={StockMarketSentimentPage} />
      <Route path="/subreddit-classification" component={SubredditClassificationPage} />
      <Route path="/graphs-networks" component={GraphsNetworksPage} />
      <Route path="/plant-seedling-classification" component={PlantSeedlingClassificationPage} />
      <Route path="/credit-card-churn-prediction" component={CreditCardChurnPredictionPage} />
      <Route path="/bank-customer-churn-prediction" component={BankCustomerChurnPredictionPage} />
      <Route path="/personal-loan-campaign" component={PersonalLoanCampaignPage} />
      <Route path="/portfolio-manager" component={AdminPage} />
      <Route path="/photo-studio" component={LoginPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
