import "./App.css";
import "primeicons/primeicons.css";

import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./lib/redux-toolkit";
import { Provider } from "react-redux";

function App() {
    const queryClient = new QueryClient();
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
