/**
 * Copyright (c) 2018, Artinict, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

import React, { Component } from "react";
import {
    Text
} from "native-base";
import styles from "./styles";

export class UserHandle extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        let { userId, userHandle } = this.props;
        this.props.navigation.navigate('ViewProfile', { userId, userHandle });
    }

    render() {
        return <Text onPress={this.handlePress} style={styles.handle}>
            { this.props.userHandle }
        </Text>;
    }
}
export default UserHandle;
