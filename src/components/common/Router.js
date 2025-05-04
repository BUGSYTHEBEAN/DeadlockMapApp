import { BrowserRouter, Route, Routes } from "react-router";
import { useState, useEffect } from 'react'
import Strats from "../pages/Strats";
import NotFound from "../pages/NotFound";
import { Provider } from "react-redux";
import store from "../../redux/store";
import About from "../pages/About";
import Login from "../pages/Login";
import { Analytics } from "@vercel/analytics/react"
import supabase from "../../clients/supabase"


export default function Router() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, [])

    return(
        <>
            <Analytics /> {/* Installs Vercel Analytics */}
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Strats session={session} />} />
                        <Route path="/strats" element={<Strats session={session} />} />
                        <Route path="/about" element={<About session={session} />} />
                        <Route path="/login" element={<Login session={session} />} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    )
}