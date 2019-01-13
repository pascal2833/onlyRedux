// ---------- Library code;
function createStore(reducer) {
    // The store should have 4 parts:
    // 1) The state
    // 2) Get the state
    // 3) Listen to changes on the state
    // 4) Update the state.

    let state
    let listeners = []

    const getState = () => state

    // For objectif 3): To keep track of listener functions that will be run whenever the state changes.
    // En fait : takes in functions that will be called when the state changes
    const suscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    /*dispatch() is called with an Action
    the reducer that was passed to createStore() is called with the current state tree and the action...this updates the state tree
    because the state has (potentially) changed, all listener functions that have been registered with the subscribe() method are called*/
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener()) // We call all listeners so all listeners functions created (ie: param / subscribe).
    }

    return {
        getState,
        suscribe,
        listeners,
        dispatch
    }
}

// ---------- App code: Reducer, cad: fonction qui prend state et action en param et qui retourne un new state.
// Chgment / state : f(action).
// App Code
function todos (state = [], action) {
    switch(action.type) {
        case 'ADD_TODO' :
            return state.concat([action.todo])
        case 'REMOVE_TODO' :
            return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO' :
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete })) // Object.assign to not change state directly.
        default :
            return state // we simply return the original state if the reducer receives an action type that it's not concerned with.
    }
}
function goals (state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL' :
            return state.concat([action.goal])
        case 'REMOVE_GOAL' :
            return state.filter((goal) => goal.id !== action.id)
        default :
            return state
    }
}

// --------- How to use in appli?

const store = createStore(todos)

store.suscribe(() => {
    console.log('The new state is: ', store.getState()) // = listener, call when state changes.
})

store.dispatch({ // To change the state.
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
})

/*We've finally finished creating the createStore function! Using the image above as a guide, let's break down what we've accomplished:

we created a function called createStore() that returns a store object
createStore() must be passed a "reducer" function when invoked
the store object has three methods on it:
    .getState() - used to get the current state from the store
    .subscribe() - used to provide a listener function the store will call when the state changes
    .dispatch() - used to make changes to the store's state
the store object's methods have access to the state of the store via closure*/

//////////////////////
// Exo / reducer: -> a part.
function appReducer (state = [{flavor: 'strawberry', count: 25}, {flavor: 'chocolate', count: 89}], action = {type: 'DELETE_FLAVOR', flavor: 'chocolate'}) {

    if (action.type === 'DELETE_FLAVOR') {
        return state.map(iceCream => {
            if (iceCream.flavor === action.flavor) {
                iceCream.count--
            }
            return iceCream
        })

    }
    return state
}

const tts = appReducer()
console.log(tts.length)