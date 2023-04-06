# React Network Notifier 🌐🚫

A fun and witty React component that displays humorous messages and images when the internet connection is lost, keeping your users entertained while they wait for the connection to return. This component works with both React and Next.js applications and supports Server-Side Rendering (SSR).
![npm](https://img.shields.io/npm/v/react-network-notifier) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/J3rry320/react-network-notifier/CI) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-network-notifier)
![React Network Notifier Example](https://link-to-your-example-image.com)

## Features

- 🎭 Randomly selects a funny message and image from a pool.
- 🎨 Easily customizable with custom messages, ascii art's and styles.
- 📱 Responsive design.
- 🚀 Supports SSR for Next.js applications.
- 🎯 Lightweight and easy to integrate.

## Installation

```bash
npm install react-network-notifier
#or 
yarn add react-network-notifier
```
## Usage

Import the `NetworkNotifier` component and add it to your application:



```javascript
import NetworkNotifier from 'react-network-notifier';

function App() {
  return (
    <div>
      <NetworkNotifier />
      {/* Your app components */}
    </div>
  );
}

export default App;
``` 

### Custom Configuration

You can also provide custom messages, images, and styles to the `NetworkNotifier` component:



```javascript
import NetworkNotifier from 'react-network-notifier';

const customMessages = [
  'Your custom message 1',
  'Your custom message 2',
  // Add more custom messages
];

const customImages = [
 `
  ( ͡° ͜ʖ ͡°)
  `,
  
  // Add more custom images
];

const customStyles = {
  backgroundColor: '#fafafa',
  // Add more custom styles
};

function App() {
  return (
    <div>
      <NetworkNotifier messages={customMessages} images={customImages} styles={customStyles} />
      {/* Your app components */}
    </div>
  );
}

export default App;
``` 

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/J3rry320/react-network-notifier/issues).

## License

MIT License. See [LICENSE](https://github.com/J3rry320/react-network-notifier/blob/main/LICENSE) for more information.

## Hire Me! 💼

I'm available for freelance projects or full-time opportunities. If you like my work, feel free to reach out to me:

-   Email: [j3@nobunagadesinglabs.com](mailto:j3@nobunagadesinglabs.com)
-   LinkedIn: [jerrythejsguy](https://www.linkedin.com/in/jerrythejsguy/)