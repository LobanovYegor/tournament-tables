import './StyleGuide.css';

import React from 'react';

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
        </div>
      </section>

      <section>
        <h2>Buttons</h2>

        <div className="button-group">
          <button className="primary-button">Primary button</button>
          <button className="primary-button hover">Primary button</button>
          <button className="primary-button" disabled>
            Primary button
          </button>
        </div>

        <div className="button-group">
          <button className="secondary-button">Secondary button</button>
          <button className="secondary-button hover">Secondary button</button>
          <button className="secondary-button" disabled>
            Secondary button
          </button>
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
