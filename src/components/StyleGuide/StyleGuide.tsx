import './StyleGuide.css';

import cn from 'clsx';

import { Button } from '../Button/Button';

const ColorShades = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

const ColorGroups = {
  primary: {
    50: 'bg-primary-50',
    100: 'bg-primary-100',
    200: 'bg-primary-200',
    300: 'bg-primary-300',
    400: 'bg-primary-400',
    500: 'bg-primary-500',
    600: 'bg-primary-600',
    700: 'bg-primary-700',
    800: 'bg-primary-800',
    900: 'bg-primary-900',
    950: 'bg-primary-950',
  },
  secondary: {
    50: 'bg-secondary-50',
    100: 'bg-secondary-100',
    200: 'bg-secondary-200',
    300: 'bg-secondary-300',
    400: 'bg-secondary-400',
    500: 'bg-secondary-500',
    600: 'bg-secondary-600',
    700: 'bg-secondary-700',
    800: 'bg-secondary-800',
    900: 'bg-secondary-900',
    950: 'bg-secondary-950',
  },
};

export default function StyleGuide() {
  return (
    <div className="style-guide">
      <h1>Style Guide</h1>

      <section>
        <h2>Colors</h2>

        <div className="color-groups">
          <div className="color-group">
            Primary Colors
            {ColorShades.map((shade) => (
              <div
                key={shade}
                className={`primary-color-${shade} color-swatch`}
              >
                <span className="text-black">{shade}</span>
                <span className="text-white">{shade}</span>
              </div>
            ))}
          </div>

          <div className="color-group">
            Grayscale Colors
            {ColorShades.map((shade) => (
              <div
                key={shade}
                className={`grayscale-color-${shade} color-swatch`}
              >
                <span className="text-black">{shade}</span>
                <span className="text-white">{shade}</span>
              </div>
            ))}
          </div>

          <div className="color-group">
            Primary Colors
            {Object.entries(ColorGroups.primary).map(([key, value]) => (
              <div key={key} className={cn(value, 'color-swatch')}>
                <span className="text-black">{key}</span>
                <span className="text-white">{key}</span>
              </div>
            ))}
          </div>

          <div className="color-group">
            Secondary Colors
            {Object.entries(ColorGroups.secondary).map(([key, value]) => (
              <div key={key} className={cn(value, 'color-swatch')}>
                <span className="text-black">{key}</span>
                <span className="text-white">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2>Buttons</h2>

        <div className="button-group mb-2">
          <button className="primary-button">Primary button</button>
          <button className="primary-button hover">Primary button</button>
          <button className="primary-button" disabled>
            Primary button
          </button>
        </div>

        <div className="button-group mb-2">
          <button className="secondary-button">Secondary button</button>
          <button className="secondary-button hover">Secondary button</button>
          <button className="secondary-button" disabled>
            Secondary button
          </button>
        </div>

        <div className="grid grid-cols-6 gap-4 mb-2">
          <div className="w-2/12">
            <Button size="sm" intent="solid" color="primary">
              Small
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="solid" color="primary">
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="solid" color="primary" disabled>
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="solid" color="primary" loading>
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="lg" intent="solid" color="primary">
              Large
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 mb-2">
          <div className="w-2/12">
            <Button size="sm" intent="outline" color="primary">
              Small
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="outline" color="primary">
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="outline" color="primary" disabled>
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="outline" color="primary" loading>
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="lg" intent="outline" color="primary">
              Large
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 mb-2">
          <div className="w-2/12">
            <Button size="sm" intent="ghost" color="primary">
              Small
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="ghost" color="primary">
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="ghost" color="primary" disabled>
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="md" intent="ghost" color="primary" loading>
              Medium
            </Button>
          </div>
          <div className="w-2/12">
            <Button size="lg" intent="ghost" color="primary">
              Large
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2>Typography</h2>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <p>Paragraph text</p>
      </section>

      <section>
        <h2>Colors</h2>
        <div className="color-swatch primary-color">Primary Color</div>
        <div className="color-swatch secondary-color">Secondary Color</div>
      </section>
    </div>
  );
}
