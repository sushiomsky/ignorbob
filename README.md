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

### Testing Locally

For testing without visiting DuckDice:

1. Install the extension
2. Open `test.html` in your browser
3. Messages from "bobstone" should be automatically hidden
4. Use the buttons to add new messages and verify the filtering works in real-time
5. Check the browser console for `[IgnorBob]` debug messages

**Note for Chrome users:** You may need to enable "Allow access to file URLs" in the extension settings to test with the local HTML file.

## How It Works

The extension uses a content script that:
- Monitors the DuckDice chat for new messages
- Identifies messages from the user "bobstone"
- Hides those messages by setting their display style to `none`
- Continues to monitor for new messages using DOM observation and periodic checks

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main content script that filters messages
- `icons/` - Extension icons in various sizes (16x16, 48x48, 128x128)
- `test.html` - Local test page for testing the extension without visiting DuckDice
- `.gitignore` - Git ignore rules for build artifacts and temporary files

## Development

To modify the filtered username or add additional features:

1. Edit `content.js` to change the `BLOCKED_USERNAME` constant
2. Reload the extension in your browser
3. Test on DuckDice.io

## License

This is a simple utility extension. Feel free to modify and use as needed.
