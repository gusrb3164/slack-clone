import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const Login = () => {
  const { data, error, revalidate } = useSWR('/api/users', fetcher);
  const [loginError, setLoginError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post('/api/users/login', { email, password }, { withCredentials: true })
        .then(() => {
          revalidate();
        })
        .catch((error) => {
          setLoginError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
