// CONTEXT
import { useDatesContext } from "../contexts/DatesContext"

export const HomePageNavigation = ({ actualPositon, setActualPosition, openPopup }) => {
    const { datesArray } = useDatesContext()

    const handleChangeValue = (num) => {
        if (actualPositon + num < 0) {
            return
        }
        if (actualPositon + num > datesArray.length - 1) {
            return
        }

        setActualPosition((prevCount) => prevCount + num)
    }

    return (
        <div className="flex items-center justify-between bottom-safe">
            {
                datesArray.length != 0 && (
                    <>
                        <button className="aspect-square font-medium p-2 flex items-center justify-center text-amber-600"
                            onClick={() => handleChangeValue(-1)}
                            disabled={actualPositon == 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={actualPositon != 0 ? "fill-amber-600" : "fill-transparent"}>
                                <path d="M10.572 14.572L18.1147 7.02933L20 8.91467L13.4 15.5147L20 22.1147L18.1147 24L10.572 16.4573C10.322 16.2073 10.1816 15.8682 10.1816 15.5147C10.1816 15.1611 10.322 14.822 10.572 14.572Z" />
                            </svg>
                        </button >
                        <h1 className="text-lg w-full h-full flex items-center justify-center font-bold text-amber-600 text-center" onClick={() => openPopup(true)}>{datesArray[actualPositon] && datesArray[actualPositon].name}</h1>
                        <button className="aspect-square font-medium p-2 flex items-center justify-center text-amber-600"
                            onClick={() => handleChangeValue(1)}
                            disabled={actualPositon == datesArray.length - 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={actualPositon != datesArray.length - 1 ? "fill-amber-600" : "fill-transparent"}>
                                <path d="M21.428 17.428L13.8853 24.9707L12 23.0853L18.6 16.4853L12 9.88533L13.8853 8L21.428 15.5427C21.678 15.7927 21.8184 16.1318 21.8184 16.4853C21.8184 16.8389 21.678 17.178 21.428 17.428Z" />
                            </svg>
                        </button>
                    </>
                )
            }
        </div >
    )
}