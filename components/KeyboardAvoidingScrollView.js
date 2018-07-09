import React from "react";
import ReactNative from "react-native";

const { Keyboard, TextInput, ScrollView, findNodeHandle } = ReactNative;

// tab height + listitem bottom padding + textinput height
const ADDITIONAL_OFFSET = 35 + 90; // initially 50

class KeyboardAvoidingScrollView extends React.Component {
  componentWillMount() {
    this.subscriptions = [
      Keyboard.addListener("keyboardDidShow", this.keyboardDidShow),
      Keyboard.addListener("keyboardDidHide", this.keyboardDidHide),
      Keyboard.addListener("keyboardWillShow", this.keyboardDidShow),
      Keyboard.addListener("keyboardWillHide", this.keyboardDidHide)
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => sub.remove());
  }

  keyboardDidShow = () => {
    const currentlyFocusedField = TextInput.State.currentlyFocusedField();
    const scrollResponder = this.refs.keyboardAvoidingScrollView.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      findNodeHandle(currentlyFocusedField),
      ADDITIONAL_OFFSET,
      false
    );
  };
  keyboardDidHide = () => {
    // const currentlyFocusedField = TextInput.State.currentlyFocusedField();
    // //this.refs.keyboardAvoidingScrollView.scrollTo({x:50, y:50, animated: true});
    // const scrollResponder = this.refs.keyboardAvoidingScrollView.getScrollResponder();
    // scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
    //   findNodeHandle(currentlyFocusedField),
    //   -30,
    //   false
    // );
  };

  render() {
    const { children, ...props } = this.props;

    return (
      <ScrollView
        {...props}
        ref="keyboardAvoidingScrollView"
        keyboardDismissMode="none"
      >
        {children}
      </ScrollView>
    );
  }
}

KeyboardAvoidingScrollView.propTypes = {
  ...ScrollView.propTypes
};

export default KeyboardAvoidingScrollView;
