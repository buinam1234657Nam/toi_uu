import React, { FC } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonProps } from 'react-native';
const StyledButton = styled.TouchableOpacity<{ disabled?: boolean, backgroundCustom?: string, color?: string }>`
  background-color: ${({ disabled, backgroundCustom }) => (disabled ? '#57534e' : backgroundCustom ? backgroundCustom : 'black')};
  width: 100%;
  height: 44px;
  border: 1px solid black;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-size: 12px;
  text-transform: uppercase;
  outline: none;
  line-height: 10px;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  overflow: visible;
  cursor: ${({ disabled }) => (disabled ? 'pointer' : 'default')};
`;

const ButtonText = styled.Text<{ color?: string, fontSizeCustom?: string }>`
color:${({ color }) => (color ? color : "white")};
  font-size: ${({ fontSizeCustom }) => (fontSizeCustom ? fontSizeCustom : "16px")};
`;

interface Props extends ButtonProps {
  title: string;
  backgroundCustom?: string;
  color?: string;
  fontSize?: string;
  icon?: string
}

const CButton: FC<Props> = ({ fontSize, icon, title, color, backgroundCustom, disabled, onPress, ...props }) => {
  return (
    <StyledButton backgroundCustom={backgroundCustom} activeOpacity={0.8} onPress={onPress} disabled={disabled} {...props}>
      {icon && <Icon name={icon} size={20} style={{ marginRight: 8, paddingTop: 2 }} />}
      <ButtonText fontSizeCustom={fontSize} color={color}>{title}</ButtonText>
    </StyledButton>
  );
};

export default CButton;
