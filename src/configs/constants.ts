export const HEADER_HEIGHT = '56px';

export const appEvent = {
   exit: 'exit',
   hide: 'hide',
   show: 'show',
   setting: 'setting',
   updateSetting: 'updateSetting',
};

export const clipboardEvent = {
   get: 'get-clipboard',
   clear: 'clear-clipboard',
   copyItem: 'copy-clipboard-item',
   removeItem: 'remove-clipboard-item',
   updateItem: 'update-clipboard-item',
};

export const DEFAULT_SETTING: Setting = {
   maxItem: 10,
   shortcut: '',
};

export const emptyClipboardMessages = [
   'Oops! Your clipboard is as empty as my weekend plans. 😅',
   'Clipboard says: Nothing to paste here, buddy! 🤖',
   'Looks like your clipboard went on vacation. 🏖️',
   "No copy, no paste — that's the rule! 📋❌",
   'Clipboard is feeling empty... just like my coffee cup! ☕😜',
   'Nothing here! Try copying something first. 📋👈',
   'Your clipboard is emptier than my fridge. 🧊😂',
];

export const emptySearchMessages = [
   'No matching items found. Try something else! 🔍',
   'Looks like your search came up empty. 🙈',
   'Nothing fits your search, please double-check. 🧐',
   'No luck! Try a different keyword. 💡',
   'Your search is as empty as my weekend schedule. 📅😴',
];

export const emptyIdleSearchMessages = [
   'Type something to start searching! ✍️',
   'Looking for something? Enter a keyword above. 🔎',
   'Start typing to explore your clipboard! 🚀',
   'Your search journey begins with a word. 💡',
   'Nothing to search yet, give it a try! 🎯',
];
