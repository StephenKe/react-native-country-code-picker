# react-native-country-code-picker

A react native country-code-picker plugin

### Installation

`npm install react-native-country-code-picker --save` or
`yarn add react-native-country-code-picker --save`

### Example

![image](https://github.com/StephenKe/react-native-country-code-picker/blob/master/image/rnccpDemo.gif)

```javascript
import React, { Component } from 'react';
import CountryCodePicker from 'react-native-country-code-picker';

export default class Example extends Component {
  render() {
    return (
      <CountryCodePicker isShow={true} />
    );
  }
}
```

### API

| Property | Type | Default | Description |
|-------------|----------|--------------|----------------------------------------------------------------|
| isShow | `Boolean` | `false` | Whether show or not |
| onPick   | `Function` |  | callback function after picked |
| animationType | `String` | `slide` | animation when show and hide |

### License

[MIT](LICENSE)
