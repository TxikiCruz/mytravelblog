import { render, screen } from "@testing-library/react"
import { logRoles } from "@testing-library/dom"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux/es/exports'
import { store } from './store/store'
import App from './App.tsx'

// test if there are h1 and h2
test("App contains correct headings", () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
  logRoles(container)
  const headingElement = screen.getByRole('heading', {level: 1})
  expect(headingElement).toBeInTheDocument()
  const subHeadingElements = screen.getAllByRole('heading', {level: 2})
  expect(subHeadingElements[0]).toBeInTheDocument()
})


// test if we are logged we can logout


// test if we can add a new experience