import { createContext, useContext, useEffect, useState } from 'react'

const DatesContext = createContext()

export const DatesProvider = ({ children }) => {
    const [datesArray, setDatesArray] = useState(() => {
        // Inicjalizacja ze sprawdzeniem, czy są dane w localStorage
        const savedDates = localStorage.getItem('datesArray')
        return savedDates ? JSON.parse(savedDates) : [{ id: Date.now(), name: 'Kliknij aby dodać', date: '2023-04-21' }]
    })


    // Zapisuj tablicę w localStorage, kiedy datesArray się zmienia
    useEffect(() => {
        localStorage.setItem('datesArray', JSON.stringify(datesArray))
    }, [datesArray]) // Zapisuj przy każdej zmianie datesArray

    const handleUpdateDateInEvent = ({ newDate, eventId }) => {
        console.log(eventId + ' Aktualizacja daty na ' + newDate)

        // Aktualizowanie daty w wybranym wydarzeniu
        const updatedDatesArray = datesArray.map(event => {
            if (event.id === eventId) {
                return { ...event, date: newDate } // Zaktualizowana data
            }
            return event // Bez zmian dla pozostałych wydarzeń
        })

        setDatesArray(updatedDatesArray) // Zaktualizowana tablica
    }


    const handleUpdateNameInEvent = ({ newName, eventId }) => {
        console.log(eventId + ' Aktualizacja nazwy na ' + newName)

        // Aktualizowanie daty w wybranym wydarzeniu
        const updatedDatesArray = datesArray.map(event => {
            if (event.id === eventId) {
                return { ...event, name: newName } // Zaktualizowana data
            }
            return event // Bez zmian dla pozostałych wydarzeń
        })

        setDatesArray(updatedDatesArray) // Zaktualizowana tablica
    }

    const handleAddNewEvent = () => {
        // Dodajemy nowe wydarzenie z obecną datą i pustą nazwą
        const newEvent = {
            id: Date.now(), // Prosty sposób na generowanie unikalnych ID
            name: 'Brak nazwy', // Domyślna nazwa
            date: new Date().toISOString().split('T')[0] // Obecna data w formacie YYYY-MM-DD
        }

        setDatesArray(prevDatesArray => [...prevDatesArray, newEvent])
    }

    const handleDeleteEvent = (eventId) => {
        // Usuwamy wydarzenie o danym id
        const updatedDatesArray = datesArray.filter(event => event.id !== eventId)
        setDatesArray(updatedDatesArray) // Aktualizujemy stan tablicy
    }

    return (
        <DatesContext.Provider value={{ datesArray, setDatesArray, handleUpdateDateInEvent, handleUpdateNameInEvent, handleAddNewEvent, handleDeleteEvent }}>
            {children}
        </DatesContext.Provider>
    )
}

export const useDatesContext = () => {
    const context = useContext(DatesContext)

    if (!context) {
        throw new Error('useDatesContext must be used with a DatesProvider')
    }

    return context
}