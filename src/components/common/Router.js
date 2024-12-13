import { BrowserRouter, Route, Routes } from "react-router";
import Strats from "../pages/Strats";
import NotFound from "../pages/NotFound";
import { Provider } from "react-redux";
import store from "../../redux/store";
import About from "../pages/About";
import { Analytics } from "@vercel/analytics/react"

export default function Router() {
    return(
        <>
            <Analytics /> {/* Installs Vercel Analytics */}
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Strats/>} />
                        <Route path="/strats" element={<Strats/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    )
}