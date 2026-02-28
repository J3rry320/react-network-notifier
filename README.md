# React Network Notifier

A highly optimized, zero-dependency React component that elegantly handles internet connection drops. It seamlessly displays witty offline messages and engaging visuals to keep your users entertained while they wait for their connection to return.

Supports both React and Next.js applications, fully compatible with Server-Side Rendering (SSR).

![npm](https://img.shields.io/npm/v/react-network-notifier)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/J3rry320/react-network-notifier/CI)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-network-notifier)

## Why We Built This

At Code Media Labs, we build applications that demand constant uptime and perfect user experiences. However, internet connectivity is often out of a developer's control. Rather than letting applications silently fail or freeze when users lose their connection, we built `react-network-notifier` to fail gracefully.

Instead of frustration, users are met with beautifully animated, witty "offline" states that improve retention and user satisfaction until their network returns. We open-sourced this to help teams everywhere implement enterprise-grade offline UX with zero boilerplate.

## What's New in v2.0.0

Version 2.0.0 was a complete rewrite from the ground up, built for modern React architectures.

- **Microbundle to Tsup**: Replaced the entire build system, aggressively minifying the bundle to under 5KB.
- **Multiple Variants**: Added configurable `toast`, `banner`, and `fullscreen` notification styles.
- **Native CSS Modules**: Extracted expensive React inline style objects into highly performant injected CSS modules.
- **Dark Mode Support**: Component now natively respects system dark mode preferences seamlessly.
- **Reconnect Handling**: Added automatic, customizable success messages ("Hooray, we're back online") when connection is restored before smoothly sliding away.
- **SVG / Icon Support**: Support for both retro ASCII art and modern SVG icons.

## Installation

```bash
npm install react-network-notifier
#or
yarn add react-network-notifier
```

## Usage

Import the `NetworkNotifier` component and add it to your root layout:

```javascript
import NetworkNotifier from "react-network-notifier";

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

### Custom Configuration (v2.0+)

The component is heavily modular. You can pass custom messages, custom reconnect states, specific SVG / ASCII configurations, variants (`toast` | `banner` | `fullscreen`), and dark mode preferences (`light` | `dark` | `system`).

```javascript
import NetworkNotifier from "react-network-notifier";

const customMessages = [
  "It looks like your router took a coffee break.",
  "Offline mode activated. Time to stretch your legs!",
];

const customReconnectMessages = [
  "We are back online! Commencing data sync.",
  "Connection restored. Welcome back to the grid.",
];

function App() {
  return (
    <div>
      <NetworkNotifier
        messages={customMessages}
        reconnectMessages={customReconnectMessages}
        variant="toast"
        theme="system"
        iconType="svg"
        closable={true}
      />
      {/* Your app components */}
    </div>
  );
}

export default App;
```

### Configuration Props

| Prop                | Type                                  | Default        | Description                                                   |
| :------------------ | :------------------------------------ | :------------- | :------------------------------------------------------------ |
| `messages`          | `string[]`                            | `[]`           | Array of strings displayed when the connection is lost.       |
| `reconnectMessages` | `string[]`                            | `[]`           | Array of strings displayed when the connection is restored.   |
| `images`            | `string[]`                            | `[]`           | Array of ASCII art strings shown during offline states.       |
| `styles`            | `React.CSSProperties`                 | `{}`           | Inline styles to override or extend default component CSS.    |
| `variant`           | `"toast" \| "banner" \| "fullscreen"` | `"fullscreen"` | Determines the visual layout and positioning.                 |
| `iconType`          | `"ascii" \| "svg"`                    | `"ascii"`      | Toggle between retro ASCII graphics or modern SVG icons.      |
| `theme`             | `"light" \| "dark" \| "system"`       | `"system"`     | Sets the UI color mode (Light, Dark, or Browser preference).  |
| `closable`          | `boolean`                             | `true`         | If `true`, allows users to manually dismiss the notification. |

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/J3rry320/react-network-notifier/issues).

## License

MIT License. See [LICENSE](https://github.com/J3rry320/react-network-notifier/blob/main/LICENSE) for more information.

## Work with Us

This project is maintained by **Code Media Labs**. We are an agency focused on building enterprise-grade, highly scalable software solutions.

If you like our work and are looking for a reliable technical partner for your next project, feel free to reach out to us:

- **Agency Website**: [codemedialabs.in](https://codemedialabs.in)
- **Our ERP Platform**: [synapse.codemedialabs.in](https://synapse.codemedialabs.in)
- **Email**: [rutuparna.satpathy01@gmail.com](mailto:rutuparna.satpathy01@gmail.com)
