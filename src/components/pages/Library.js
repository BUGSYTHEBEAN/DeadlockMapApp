import Header from "../common/Header";
import { useNavigate } from "react-router";
import React from "react";
import MapPreview from "../common/MapPreview";
import { getMapsForUser } from "../../tables/maps";

export default function Library(props) {
    const navigate = useNavigate()
    const [maps, setMaps] = React.useState([])

    React.useEffect(() => {
        if (props.session?.user?.id) {
            getMapsForUser(props.session?.user?.id).then((maps) => {
                setMaps(maps)
            })
        }
    }, [])

    return (
        <div className="bg-neutral-900 min-h-screen">
            <Header session={props.session} />
            <main className="min-h-full w-full place-items-center px-6 lg:px-8">
                <div className="text-center">
                <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-sky-400 sm:text-5xl pb-4">
                    Your Maps
                </h1>
                {
                    props?.session 
                        ? <div>
                            {
                                maps.length === 0 ? <p className="text-white">It looks like you don't have any maps, go to the home page to start creating!</p>
                                : <p className="text-white p-1">Note: For now this will only show your first 6 maps, working on pages!</p>
                            }
                            <div className="grid grid-cols-3 gap-4">
                                {maps.map((m, i) => <MapPreview map={m} key={i}/>)}
                            </div>
                        </div>
                        : <p className="text-white w-80 text-sm mb-4">
                            <a href="/login" className="text-sky-500" onClick={(e) => {
                                e.preventDefault()
                                navigate('/login')
                            }}>Logging in </a> 
                            lets you save maps, and return to them later in your library.
                            It also allows you to create permalinks to share maps with others.
                        </p>
                }
                </div>
            </main>
        </div>
      )
}
