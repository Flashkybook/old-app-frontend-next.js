import * as types from '../actions/types'

const initial_state = {
    cards: [],
    current: 0,
    session_study: false,
    type_of_session: null,
    session_cards: [], // son las cartas que seran envidas al backend para su setteo,
    session_cards_completed: [], // son las cartas que seran envidas al backend para su setteo,
    error: null,
    commit: 2
}


const bookReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {

        // GET USER BOOK

        case types.GET_BOOK_SUCCESS:
            return { ...state, cards: payload }

        case types.GET_BOOK_FAIL:
            return { ...state }

        // SET CURRENT
        case types.RESET_CURRENT:
            return { ...state, current: 0 }

        case types.NEXT_CURRENT:
            return { ...state, current: state.current + payload }

        case types.PREVIOUS_CURRENT:
            return state.current > 0 ? { ...state, current: state.current + payload } : { ...state }

        case types.SET_CURRENT_FAIL:
            return { ...state }

    
        // SESSION
        case types.CORRECT_WORD_STUDY:
            // manda al final la palabra pero ya aprobada
            state.session_cards.shift() 

            // add score of fails if exist
            
            

            return { ...state, session_cards_completed : [...state.session_cards_completed, payload] }

        case types.FAIL_WORD_STUDY:
            state.session_cards.shift() // elimina el elemento actual del principio

            if(payload.fails ){
                payload.fails +=1  
            }else{
                payload.fails = 1  
            }
            return { ...state, session_cards : [...state.session_cards, payload] }

        case types.NEW_STUDY_SESSION:
            // ordena por easiness mayor
            function compare(a, b) {
                if (a.repetitions < b.repetitions) {
                    return -1;
                }
                if (a.repetitions > b.repetitions) {
                    return 1;
                }
                return 0;
            }

            const today = new Date().toLocaleDateString()
            const cards = state.cards

            // next_review_date is less that today
            const ByDaily = cards.filter((valor) => valor.next_review_date === today || valor.next_review_date === null)

            // last_review que no sea menor que hoy  
            const ByLastReview = cards.filter((valor) => valor.last_review <= today)

            // por numero de repeticiones
            const ByRepetitions = cards.sort(compare);

            const study_commit = state.commit // seteable por configuracion de usuario poximamente

            const list = []
            const type_of_session = ''
            if (ByDaily.length > 0) {
                list = ByDaily.slice(0, study_commit)
                type_of_session = 'Daily'
            } else if (ByLastReview.length > 0) {
                list = ByLastReview.slice(0, study_commit)
                type_of_session = 'Lately not reviewed'
            } else {
                list = ByRepetitions.slice(0, study_commit)
                type_of_session = 'least reviewed'
            }
            console.log(study_commit)

            console.log(list)
            return { ...state, session_cards: list, session_cards_completed: [], session_study: true, current: 0, type_of_session: type_of_session }

        case types.SESSION_STUDY_END:
            return { ...state }
            
        case types.SESSION_STUDY_RESET:
            return { ...state, session_cards: [], session_study: false, current: 0, type_of_session: null }
            
        

        // Add Word 
        case types.WORD_BOOK_ADD_FAIL:
            return { ...state, error: payload }

        default:
            return state;
    }
}

export default bookReducer