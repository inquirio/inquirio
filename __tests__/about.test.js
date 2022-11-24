import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0';
import About from '../pages/about-us';

describe('About page tests', () => {
  beforeEach(async () => {
    await act(async () => {
      await render(
        <UserProvider>
          <About />
        </UserProvider>
      );
    });
  });

  it('Renders the container element', () => {
    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();
  });

  it('Renders the main element', () => {
    const main = screen.getByTestId('main');
    expect(main).toBeInTheDocument();
  });

  it('Renders the headline', () => {
    const options = {
      name: 'The Inquirio Team',
      level: 1,
    };

    const headline = screen.getByRole('heading', options);
    expect(headline).toBeInTheDocument();
  });

  it('Renders the grid element', () => {
    const grid = screen.getByTestId('grid');
    expect(grid).toBeInTheDocument();
  });

  it('Renders the Branden\'s name', () => {
    const branden = screen.getByText(/Branden Ge/i);
    expect(branden).toBeInTheDocument();
  });

  it('Renders the Branden\'s image', () => {
    const brandenImg = screen.getByTestId('brandenImg');
    expect(brandenImg).toBeInTheDocument();
  });

  it('Renders the Branden\'s name', () => {
    const branden = screen.getByText(/Branden Ge/i);
    expect(branden).toBeInTheDocument();
  });

  it('Renders the Branden\'s image', () => {
    const brandenImg = screen.getByTestId('brandenImg');
    expect(brandenImg).toBeInTheDocument();
  });

  it('Renders the Branden\'s name', () => {
    const branden = screen.getByText(/Branden Ge/i);
    expect(branden).toBeInTheDocument();
  });

  it('Renders the Branden\'s image', () => {
    const brandenImg = screen.getByTestId('brandenImg');
    expect(brandenImg).toBeInTheDocument();
  });

  it('Renders the Brandon\'s name', () => {
    const brandon = screen.getByText(/Brandon Pitts/i);
    expect(brandon).toBeInTheDocument();
  });

  it('Renders the Brandon\'s image', () => {
    const brandonImg = screen.getByTestId('brandonImg');
    expect(brandonImg).toBeInTheDocument();
  });

  it('Renders the Daniel\'s name', () => {
    const daniel = screen.getByText(/Daniel Frey/i);
    expect(daniel).toBeInTheDocument();
  });

  it('Renders the Daniel\'s image', () => {
    const danielImg = screen.getByTestId('danielImg');
    expect(danielImg).toBeInTheDocument();
  });

  it('Renders the Keelen\'s name', () => {
    const keelen = screen.getByText(/Keelen Fisher/i);
    expect(keelen).toBeInTheDocument();
  });

  it('Renders the Keelen\'s image', () => {
    const keelenImg = screen.getByTestId('keelenImg');
    expect(keelenImg).toBeInTheDocument();
  });

  it('Renders the Stephanie\'s name', () => {
    const stephanie = screen.getByText(/Stephanie Hill/i);
    expect(stephanie).toBeInTheDocument();
  });

  it('Renders the Stephanie\'s image', () => {
    const stephanieImg = screen.getByTestId('stephanieImg');
    expect(stephanieImg).toBeInTheDocument();
  });

  it('Renders the Timothee\'s name', () => {
    const timothee = screen.getByText(/Timothee Odushina/i);
    expect(timothee).toBeInTheDocument();
  });

  it('Renders the Timothee\'s image', () => {
    const timotheeImg = screen.getByTestId('timotheeImg');
    expect(timotheeImg).toBeInTheDocument();
  });

  it('Renders the footer element', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
})
