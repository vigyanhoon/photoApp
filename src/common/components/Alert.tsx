import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { useState } from 'react';

interface Props {
  show: boolean;
}

const Alert = ({ show }: Props): JSX.Element => {
  const [visible, setVisible] = useState(show);
  const hide = () => {
    setVisible(false);
  };
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hide}>
          <Dialog.Title>Permission denied</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Storage permission denied, app will not work without it
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hide}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Alert;
