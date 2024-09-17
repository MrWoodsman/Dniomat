// REACT
import { useState, useEffect } from "react"
// UTILS
import { setThemeColor } from "../utils/changeThemeColor"
// CONTEXT
import { useDatesContext } from "../contexts/DatesContext"
// COMPONENTS
import { HomePageNavigation } from "../components/HomePageNavigation"
import { PopupBottom } from "../components/popups/popupBottom"

export const HomePage = () => {
    const { datesArray } = useDatesContext()
    const [days, setDays] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [navigationPosition, setNavigationPosition] = useState(0)

    const today = new Date()
    // const backDate = new Date(datesArray[navigationPosition].date, today.getHours(), today.getMinutes(), today.getSeconds())
    const backDate = new Date(datesArray[navigationPosition].date)
    backDate.setHours(today.getHours())
    backDate.setMinutes(today.getMinutes())
    backDate.setSeconds(today.getSeconds())

    const RoundToTwoDigit = (number) => {
        return String(number).padStart(2, '0')
    }

    // Liczenie ile mineło w miliscekundach
    const difrentInDates = today.getTime() - backDate.getTime()

    // Przeliczanie milisekund na dni
    const daysFromDate = difrentInDates / 1000 / 60 / 60 / 24
    // Zaokrąglanie do pełnych dni i dodawanie spacji co 3 cyfry
    const backDateFormated = `${RoundToTwoDigit(backDate.getDate())}.${RoundToTwoDigit(backDate.getMonth() + 1)}.${RoundToTwoDigit(backDate.getFullYear())}`

    useEffect(() => {
        const calculate = () => {
            setDays(Math.floor(daysFromDate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        }

        calculate();
        const intervalId = setInterval(calculate, 1000);

        return () => clearInterval(intervalId);  // Czyszczenie interwału po unmountowaniu komponentu
    }, [daysFromDate])

    useEffect(() => {
        setThemeColor('#F59E0B')
    }, [])

    return (
        <>
            <div className="page-layout bg-amber-400 gradient-home-page">
                <div className="content flex flex-col justify-center items-center">
                    <h1 className="text-6xl font-black text-amber-600 flex items-end">{`${days} `}<span className="text-3xl">Days</span></h1>
                    <h2 className="text-1xl font-bold text-amber-600">{backDateFormated}</h2>
                </div>
                <HomePageNavigation actualPositon={navigationPosition} setActualPosition={setNavigationPosition} openPopup={setIsOpen} />
            </div>
            {
                isOpen && (
                    <PopupBottom setIsOpen={setIsOpen} />
                )
            }
        </>
    )
}

{/* <div className="home-page bg-amber-400 gradient-home-page h-[100dvh] flex flex-col overflow-hidden left-0 top-0 w-full ">
<div className="flex flex-col items-center justify-center h-full overflow-y-auto">
    <h1 className="text-6xl font-black text-red-600 flex items-end">{`${days} `}<span className="text-3xl">Days</span></h1>
    <h2 className="text-1xl font-bold text-amber-600">{backDateFormated}</h2>
</div>
<HomePageNavigation actualPositon={navigationPosition} setActualPosition={setNavigationPosition} openPopup={setIsOpen} />
</div>
{
isOpen && (
    <PopupBottom setIsOpen={setIsOpen} />
)
} */}