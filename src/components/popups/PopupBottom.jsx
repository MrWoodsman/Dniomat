import { useDatesContext } from "../../contexts/DatesContext";
import { useEffect, useRef } from "react";

export const PopupBottom = ({ setIsOpen }) => {
    const { datesArray, handleAddNewEvent } = useDatesContext();
    const popupRef = useRef(null);

    // Funkcja do aktualizacji wysokości popupu
    const updateHeight = () => {
        if (popupRef.current) {
            popupRef.current.style.height = `${window.innerHeight}px`;
        }
    };

    // Ustawienie wysokości popupu przy pierwszym załadowaniu i przy zmianie rozmiaru okna
    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    return (
        <div ref={popupRef} className="fixed left-0 bottom-0 z-50 w-full backdrop-blur-sm bg-black/50 text-black flex flex-col-reverse" onClick={() => handleClosePopup()}>
            <div className="content bg-white max-h-[50%] p-4 bottom-safe flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                <div className="title-wrap flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Event list</h1>
                    <div className="flex gap-4">
                        <button className="bg-black/5 aspect-square h-8 rounded-full flex items-center justify-center" onClick={() => handleAddNewEvent()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" fill="none">
                                <path d="M4.12061 17.32L4.12061 14.6801H14.6801L14.6801 4.12065H17.3199L17.3199 14.6801H27.8794L27.8794 17.32L17.3199 17.32V27.8794H14.6801V17.32L4.12061 17.32Z" fill="black" />
                            </svg>
                        </button>
                        <button className="bg-black/5 aspect-square h-8 rounded-full flex items-center justify-center" onClick={() => handleClosePopup()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 33" fill="none">
                                <path d="M8.53335 25.8334L6.66669 23.9667L14.1334 16.5L6.66669 9.03335L8.53335 7.16669L16 14.6334L23.4667 7.16669L25.3334 9.03335L17.8667 16.5L25.3334 23.9667L23.4667 25.8334L16 18.3667L8.53335 25.8334Z" fill="black" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="events-wrap flex flex-col gap-2 overflow-y-auto">
                    {
                        datesArray.map((item, index) => (
                            <EventCard key={index} name={item.name} date={item.date} eventId={item.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

// Komponent EventCard
const EventCard = ({ name, date, eventId }) => {
    const { handleUpdateDateInEvent, handleUpdateNameInEvent, handleDeleteEvent } = useDatesContext();

    const handleBlur = () => {
        window.scrollTo(0, 0);  // Zresetowanie pozycji scrolla po zamknięciu klawiatury
    };

    const handleFocus = (event) => {
        const input = event.target;
        setTimeout(() => {
            input.scrollIntoView({ behavior: 'smooth' });
        }, 300);  // Dajemy małe opóźnienie, aby klawiatura się w pełni otworzyła
    };

    return (
        <div className="event-card flex items-center justify-between py-2 px-4 bg-black/5 rounded-lg">
            <div className="left flex items-center gap-2">
                <input className="bg-transparent outline-none" type="text" value={name} onChange={(e) => handleUpdateNameInEvent({ newName: e.target.value, eventId: eventId })} onBlur={handleBlur}
                    onFocus={handleFocus} />
            </div>
            <div className="right flex items-center gap-2 font-medium">
                <input className="bg-transparent date-input" type="date" onChange={(e) => handleUpdateDateInEvent({ newDate: e.target.value, eventId: eventId })} value={date} onBlur={handleBlur}
                    onFocus={handleFocus} />
                <button onClick={() => handleDeleteEvent(eventId)}>X</button>
            </div>
        </div>
    );
};
