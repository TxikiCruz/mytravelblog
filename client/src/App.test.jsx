import { render, screen } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux/es/exports'
import { store } from './store/store'
import App from './App.tsx'

test("App contains correct heading", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
  const headingElement = screen.getByText('ScoreTravelsBlog')
  expect(headingElement).toBeInTheDocument()
})
