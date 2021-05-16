import React from 'react';
import { Link } from '@react-navigation/native';

import {
  CardButtonText,
  CardView,
  CardButtonTouch,
  CardText,
  CardTitleView,
} from './styles';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function CardTitle({ title, children }: Props) {
  return (
    <CardView>
      <CardTitleView>
        <CardText>{title}</CardText>
        <Link to="/Championship">
          <CardButtonTouch>
            <CardButtonText>Ver Mais</CardButtonText>
          </CardButtonTouch>
        </Link>
      </CardTitleView>
      {children}
    </CardView>
  );
}
