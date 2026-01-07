# IgnorBob - DuckDice Chat Filter

A Firefox/Chrome browser extension that filters out messages from the user "bobstone" in the DuckDice webchat.

## Features

- 🚫 Automatically hides messages from user "bobstone"
- 🔄 Real-time monitoring for new messages
- 🌐 Works on all DuckDice.io pages
- 🦊 Compatible with Firefox and Chrome/Chromium browsers

## Installation

### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the extension folder and select the `manifest.json` file

For permanent installation, the extension would need to be signed by Mozilla.

### Chrome/Chromium/Edge

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top right
4. Click "Load unpacked"
5. Select the extension folder containing `manifest.json`

## Usage

1. Install the extension using the instructions above
2. Visit [DuckDice.io](https://duckdice.io)
3. Open the chat - messages from user "bobstone" will be automatically hidden
4. The extension works silently in the background

You can verify the extension is working by opening the browser console (F12) and looking for `[IgnorBob]` log messages.

## How It Works

The extension uses a content script that:
- Monitors the DuckDice chat for new messages
- Identifies messages from the user "bobstone"
- Hides those messages by setting their display style to `none`
- Continues to monitor for new messages using DOM observation and periodic checks

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main content script that filters messages
- `icons/` - Extension icons in various sizes

## Development

To modify the filtered username or add additional features:

1. Edit `content.js` to change the `BLOCKED_USERNAME` constant
2. Reload the extension in your browser
3. Test on DuckDice.io

## License

This is a simple utility extension. Feel free to modify and use as needed.
