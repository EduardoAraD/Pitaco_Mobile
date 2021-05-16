import React from 'react';

import { TextTitle, TitleCard } from './styles';

interface Props {
  title: string;
}

export default function CardTitlePage({ title }: Props) {
  return (
    <TitleCard>
      <TextTitle>{title}</TextTitle>
    </TitleCard>
  );
}
