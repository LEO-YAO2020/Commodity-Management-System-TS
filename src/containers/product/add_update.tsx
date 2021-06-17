import React from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams>{}
export default function Update(props: Props) {
  return (
    <div>
      Update
      <Button onClick={() => {props.history.goBack()}}>返回</Button>
    </div>
  );
}
