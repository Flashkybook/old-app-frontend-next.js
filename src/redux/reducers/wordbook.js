import * as types from '../actions/types'

const initial_state = {
    cards: [],
    current: 0,
    session_study: false,
    type_of_session: null,
    cards_session: [], // son las cartas que seran envidas al backend para su setteo,
    error: null,
    commit: 5
}


const bookReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {
        case types.GET_BOOK_SUCCESS:
            return { ...state, cards: payload}
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
        case types.SET_WORD_STUDY:
            return { ...state }


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
            const ByDaily = cards.filter((valor)=> valor.next_review_date === today || valor.next_review_date === null )
        
            // last_review que no sea menor que hoy  
            const ByLastReview = cards.filter((valor)=> valor.last_review <= today)
        
            // por numero de repeticiones
            const ByRepetitions = cards.sort(compare);  

            const study_commit = state.commit // seteable por configuracion de usuario poximamente

            const list = []
            const type_of_session = ''
            if (ByDaily.length > 0){    
                list = ByDaily.slice(0, study_commit) 
                type_of_session = 'Daily'   
            }else if(ByLastReview.length > 0){
                list = ByLastReview.slice(0, study_commit)    
                type_of_session = 'Lately not reviewed'   
            }else{
                list = ByRepetitions  
                type_of_session = 'least reviewed'   
            }
            console.log(list)

            return { ...state, cards_session: list, session_study: true, current: 0, type_of_session : type_of_session }


        case types.SESSION_STUDY_END:
            return { ...state, cards_session: [], session_study: false, current: 0, type_of_session : null }

        default:
            return state;
    }
}

export default bookReducer