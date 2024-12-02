# FORAGER

## Keep your foraging spots safe!

Forager is a React Native (javascript) + Firebase app made as a final project for Haaga-Helia UAS [course on Mobile Programming](https://haagahelia.github.io/mobilecourse/).

Offline usage is important in this app. Foraging data is stored locally in React Native Async Storage.

### About structure

#### Screen vs Component

1. If a component imports only from React Native standard library and/or project specific, customised imports eg. just \<View>, \<TextInput> and \<MySpecialButton> that component is a screen. Its path is ``screens/Name.js``.
2. If a component uses classes from other libraries it is a component. Its path is ``components/ComponentName``.
3. Functions are separated to make unit testing easier. Functions' path is ``utils/description.js``.
