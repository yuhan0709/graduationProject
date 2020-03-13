import React from 'react';
import FormInput from '@/components/formInput';
import style from '../style.less';
import { Button } from 'antd';

const Demo = () => {
    return <div className={style.demo}>
        <FormInput value="demo" />
        <Button type="primary">提交</Button>
    </div>
};

export default Demo;