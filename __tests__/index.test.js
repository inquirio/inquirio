import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0';
import Home from '../pages/index.js';

jest.mock('../Components/Search/Search', () => {
  return function DummySearch(props) {
    return (<p data-testid='search'>Dummy Search</p>);
  };
});

describe('Home page tests', () => {
  beforeEach(async () => {
    await act(async () => {
      await render(
        <UserProvider>
          <Home />
        </UserProvider>
      );
    });
  });

  it('Renders the box component', () => {
    const box = screen.getByTestId('box');
    expect(box).toBeInTheDocument();
  });

  it('Renders the main element', () => {
    const main = screen.getByTestId('main');
    expect(main).toBeInTheDocument();
  });

  it('Renders the search component', () => {
    const search = screen.getByTestId('search');
    expect(search).toBeInTheDocument();
  });

  it('Renders the headline', () => {
    const options = {
      name: 'Take Control of Your Career',
      level: 2,
    };

    const headline = screen.getByRole('heading', options);
    expect(headline).toBeInTheDocument();
  });

  it('Renders the signup component', () => {
    const signup = screen.getByText(/Start learning/i);
    expect(signup).toBeInTheDocument();
  });

  it('Renders the about card component', () => {
    const about = screen.getByText(/What is Inquirio/i);
    expect(about).toBeInTheDocument();
  });

  it('Renders the learn card component', () => {
    const learn = screen.getByText(/Grow and train/i);
    expect(learn).toBeInTheDocument();
  });

  it('Renders the Code Fellows logo image component', () => {
    const logo = screen.getByAltText(/Code Fellows Logo/i);
    expect(logo).toBeInTheDocument();
  });
})
