import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Header from "../common/Header";
import supabase from "../../clients/supabase";
import { useNavigate } from "react-router";
import React from "react";

export default function Login(props) {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (props.session) {
            navigate('/')
        }
    }, [props.session])

    return (
        <div className="bg-neutral-900 min-h-screen">
            <Header session={props.session} />
            <main className="min-h-full w-full place-items-center px-6 py-8 sm:py-8 lg:px-8">
                <div className="text-center">
                <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-sky-400 sm:text-5xl pb-4">
                    Log In
                </h1>
                <p className="text-white w-80 text-sm">
                    Logging in let you save maps, and return to them later in your library.
                    It also allows you to create permalinks to share maps with others.
                </p>
                <div className="w-80">
                    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} dark providers={[]} additionalData={'displayName'}/>
                </div>
                </div>
            </main>
        </div>
      )
}
