import { render } from "@testing-library/react-native"
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../../src/redux"
import { Provider } from 'react-redux';

export function renderWithRedux(renderComponent:any) {
    const store = createStore(rootReducer, {}, applyMiddleware(thunk))
    return render(
        <Provider store={store}>
            {renderComponent}
        </Provider>
    )
}
