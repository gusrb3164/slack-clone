import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { Container, Header } from './styles';

const Channel = () => {
  const { channel } = useParams<{ channel: string }>();

  const [chat, onChangeChat] = useInput('');

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log('submit');
  }, []);

  return (
    <Container>
      <Header>{channel}</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
